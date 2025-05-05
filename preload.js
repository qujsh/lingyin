const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  simulateInit: () => ipcRenderer.send("simulate-init"),
  simulateClose: () => ipcRenderer.send("simulate-close"),
  simulateCheck: async () => await ipcRenderer.invoke("simulate-check"),
  simulatePaste: (text) => ipcRenderer.send("simulate-paste", text),
});

console.log("Electron preload script loaded successfully");
