const { app, BrowserWindow, screen, ipcMain, clipboard } = require("electron");
const { exec } = require("child_process");
const path = require("path");

let win;

function createWindow() {
  // 获取主屏幕的工作区域大小
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // 创建浏览器窗口
  win = new BrowserWindow({
    width: width, // 设置窗口宽度为屏幕宽度
    height: height, // 设置窗口高度为屏幕高度
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // 设置 preload 文件
      nodeIntegration: false, // 允许在渲染进程中使用 Node.js API
      contextIsolation: true, // 禁用上下文隔离，确保 Next.js 和 Electron 能正常交互
      webSecurity: false, // 禁用 webSecurity，可以使用 file:// 协议来加载静态文件
    },
  });

  // 加载 Next.js 应用
  // win.loadURL("http://localhost:3000"); // 这是 Next.js 开发服务器的默认端口

  //开发环境
  let indexPath = path.join(__dirname, "out", "index.html");
  if (app.isPackaged) {
    //生产环境，是否有打包
    indexPath = path.join(process.resourcesPath, "out", "index.html");
  }

  // 加载本地的 Next.js 静态文件
  win.loadFile(indexPath); // 使用 file:// 协议来加载静态文件

  // 打开开发工具（仅在开发环境中）
  // if (!app.isPackaged) {
  win.webContents.openDevTools();
  // }
}

// 监听从渲染进程发送的 "simulatePaste" 消息
ipcMain.on("simulate-paste", (event, text) => {
  console.log("Received simulate-paste message：", text);

  // **1. 先将文本写入剪贴板**
  clipboard.writeText(text);
  console.log("Text written to clipboard:", clipboard.readText());

  // **2. 模拟 Ctrl+V + Enter**
  if (process.platform === "darwin") {
    // **macOS（Command + V + Enter）**
    exec(
      'osascript -e "tell application \\"System Events\\"" ' +
        '-e "keystroke \\"v\\" using command down" ' + // ⌘+V
        // 加个是否要输出回车的控制，有些场景需要有些场景不需要，比如我就是用来进行办公的，要打很多字要手动介入控制
        '-e "delay 0.02" ' + // 等待 0.02 秒
        '-e "key code 36" ' + // 按下 Enter（Return 键的 key code = 36）
        '-e "end tell"',
      (error) => {
        if (error) console.error("Error executing osascript:", error);
      }
    );
  } else if (process.platform === "win32") {
    // **Windows（Ctrl + V + Enter）**
    exec(
      'powershell -command "$wshell = New-Object -ComObject wscript.shell; ' +
        "$wshell.SendKeys('^v'); " + // Ctrl + V
        "Start-Sleep -Milliseconds 200; " + // 等待 0.2 秒
        "$wshell.SendKeys('{ENTER}')\"", // 回车
      (error) => {
        if (error) console.error("Error executing PowerShell:", error);
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
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
