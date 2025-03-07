const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  simulatePaste: () => ipcRenderer.send("simulate-paste"),
});

console.log("Electron preload script loaded successfully");
