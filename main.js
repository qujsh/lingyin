const { app, BrowserWindow, screen, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");
const waitOn = require("wait-on"); // 安装 wait-on

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
      nodeIntegration: true, // 允许在渲染进程中使用 Node.js API
      contextIsolation: true, // 禁用上下文隔离，确保 Next.js 和 Electron 能正常交互
    },
  });

  // 加载 Next.js 应用
  win.loadURL("http://localhost:3000"); // 这是 Next.js 开发服务器的默认端口

  // 打开开发工具（可选）
  win.webContents.openDevTools();
}

// 监听从渲染进程发送的 "simulatePaste" 消息
ipcMain.on("simulate-paste", (event, arg) => {
  console.log("Received simulate-paste message");

  // 使用 osascript 模拟按下 Command + V
  exec(
    'osascript -e "tell application \\"System Events\\"" -e "keystroke \\"v\\" using command down" -e "end tell"',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
});

app.whenReady().then(() => {
  // 启动 Next.js 生产服务器
  const nextServer = exec("npm run start");

  nextServer.stdout.on("data", (data) => {
    console.log(`Next.js: ${data}`);
  });

  nextServer.stderr.on("data", (data) => {
    console.error(`Next.js Error: ${data}`);
  });

  // 使用 wait-on 等待 Next.js 服务器启动
  waitOn({ resources: ["http://localhost:3000"] }, () => {
    // 只有在 Next.js 启动后，才创建 Electron 窗口
    createWindow();
  });

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
