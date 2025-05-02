const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  simulateInit: () => ipcRenderer.send("simulate-init"),
  simulatePaste: (text) => ipcRenderer.send("simulate-paste", text),
});

console.log("Electron preload script loaded successfully");
