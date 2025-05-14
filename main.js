const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
  clipboard,
  dialog,
  shell,
} = require("electron");
const { exec } = require("child_process");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');

let win;
let dialogWindow;
let getAssetPath;

function createWindow() {
  // 获取主屏幕的工作区域大小
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "assets");

  getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  // 创建浏览器窗口
  win = new BrowserWindow({
    width: width, // 设置窗口宽度为屏幕宽度
    height: height, // 设置窗口高度为屏幕高度
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // 设置 preload 文件
      nodeIntegration: false, // 允许在渲染进程中使用 Node.js API
      contextIsolation: true, // 禁用上下文隔离，确保 Next.js 和 Electron 能正常交互
      enableRemoteModule: false, // 关闭远程模块
      webSecurity: false, // 禁用 webSecurity，可以使用 file:// 协议来加载静态文件和访问https跳转地址，开发环境开启
    },
  });

  // 这是 Next.js 开发服务器的默认端口
  let webUrl = "http://localhost:3000";
  if (app.isPackaged) {
    webUrl = "https://nextvoice.cn";
  }

  // 加载 Next.js 应用
  win.loadURL(webUrl);

  // 打开开发工具（仅在开发环境中）
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

function simulateInit(Event) {
  const isBoolean = typeof Event === "boolean";
  const check = isBoolean ? Event : false;

  return new Promise((resolve) => {
    // **1. 模拟 Ctrl+C，判定是否有操作权限 **
    if (process.platform === "darwin") {
      // **macOS（Command + C）**
      exec(
        'osascript -e "tell application \\"System Events\\"" ' +
          '-e "keystroke \\"c\\" using command down" ' + // ⌘+c
          '-e "end tell"',
        (error) => {
          if (error) {
            //todo
            log.error("darwin Error executing osascript:", error);

            if (dialogWindow) {
              return;
            }

            //如果是权限检查
            if (check) {
              resolve(false);
              return;
            }

            //获取当前窗口参数
            const currentWindow = BrowserWindow.getFocusedWindow();
            const currentDisplay = screen.getDisplayNearestPoint(
              currentWindow.getBounds()
            );

            const { x, y, width, height } = currentDisplay.workArea;

            // 设置窗口位置的百分比
            const windowX = x + Math.floor(width * 0.7); // 70% 屏幕宽度
            const windowY = y + Math.floor(height * 0.25); // 25% 屏幕高度

            dialogWindow = new BrowserWindow({
              width: 500,
              height: 480,
              minimizable: false,
              maximizable: false,
              closable: true,
              alwaysOnTop: false,
              frame: true, // ✅ 改为 true，显示原生系统标题栏
              movable: true, // ✅ 窗口允许拖动（可选，默认就是 true）
              modal: false,
              parent: null,
              resizable: false,
              x: windowX, // 设置弹出窗口的 x 位置
              y: windowY, // 设置弹出窗口的 y 位置
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });

            dialogWindow.loadFile(getAssetPath("dialog-mac.html"));

            dialogWindow.on("closed", () => {
              dialogWindow = null;
            });

            //在这个地方可以捕获到
            // Error executing osascript: Error: Command failed: osascript -e "tell application \"System Events\"" -e "keystroke \"v\" using command down" -e "delay 0.05" -e "key code 36" -e "end tell"
            //[1] 33:65: execution error: “System Events”遇到一个错误：“osascript”不允许发送按键。 (1002)
            // if (error) console.error("Error executing osascript:", error);

            return;
          }

          resolve(true);
        }
      );
    } else if (process.platform === "win32") {
      // **Windows（Ctrl + C）**
      // 没有权限拦截，暂不用校验
      exec(
        'powershell -command "$wshell = New-Object -ComObject wscript.shell; ' +
          "$wshell.SendKeys('^c'); ", // Ctrl + C
        (error) => {
          if (error) {
            log.error("win Error executing PowerShell:", error);
            resolve(false);
          }

          resolve(true);
        }
      );
    }
  });
}

// 监听从渲染进程发送的 "simulateInit" 消息
ipcMain.on("simulate-init", simulateInit);

// 监听从渲染进程发送的 "simulateClose" 消息
ipcMain.on("simulate-close", () => {
  //把网页关闭
  if (dialogWindow) {
    dialogWindow.close();
  }
});

// 检查连接是否创建成功
ipcMain.handle("simulate-check", async () => {
  //做权限检查使用
  return await simulateInit(true);
});

ipcMain.on("open-settings", () => {
  shell.openExternal(
    "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"
  );
});

ipcMain.on("drag-start", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.startDrag({
    file: "/Applications/凌音助手.app",
    icon: getAssetPath("icons/128x128.png"),
  });
});

// 监听从渲染进程发送的 "simulatePaste" 消息
ipcMain.on("simulate-paste", (event, text) => {
  console.log("Received simulate-paste message：", text);

  // **1. 先将文本写入剪贴板**
  clipboard.writeText(text);

  // **2. 模拟 Ctrl+V + Enter**
  if (process.platform === "darwin") {
    // **macOS（Command + V + Enter）**
    exec(
      'osascript -e "tell application \\"System Events\\"" ' +
        '-e "keystroke \\"v\\" using command down" ' + // ⌘+V
        // 加个是否要输出回车的控制，有些场景需要有些场景不需要，比如我就是用来进行办公的，要打很多字要手动介入控制
        '-e "delay 0.1" ' + // 等待 0.1 秒
        '-e "key code 36" ' + // 按下 Enter（Return 键的 key code = 36）
        '-e "end tell"',
      (error) => {
        //在这个地方可以捕获到
        // Error executing osascript: Error: Command failed: osascript -e "tell application \"System Events\"" -e "keystroke \"v\" using command down" -e "delay 0.05" -e "key code 36" -e "end tell"
        //[1] 33:65: execution error: “System Events”遇到一个错误：“osascript”不允许发送按键。 (1002)
        if (error) log.error("Error executing osascript:", error);
      }
    );
  } else if (process.platform === "win32") {
    // **Windows（Ctrl + V + Enter）**
    exec(
      'powershell -command "$wshell = New-Object -ComObject wscript.shell; ' +
        "$wshell.SendKeys('^v'); " + // Ctrl + V
        "Start-Sleep -Milliseconds 100; " + // 等待 0.1 秒
        "$wshell.SendKeys('{ENTER}')\"", // 回车
      (error) => {
        if (error) log.error("Error executing PowerShell:", error);
      }
    );
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "发现新版本",
        message: "有新的版本可以下载，是否现在下载？",
        buttons: ["下载", "稍后"],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        title: "更新准备安装",
        message: "更新已下载完毕，是否现在安装？",
        buttons: ["立即安装", "稍后安装"],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
  });

  autoUpdater.on("update-not-available", () => {
      //todo
    log.log("暂无更新...");
  });

  autoUpdater.on("error", (error) => {
    dialog.showErrorBox(
      "更新错误",
      error == null ? "unknown" : (error.stack || error).toString()
    );
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
