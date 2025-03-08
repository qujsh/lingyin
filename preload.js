const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  simulatePaste: (text) => ipcRenderer.send("simulate-paste", text),
});

console.log("Electron preload script loaded successfully");
