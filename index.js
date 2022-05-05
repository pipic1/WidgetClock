const { app, BrowserWindow, Menu, Tray } = require('electron')
let win = null;
const createWindow = () => {
    win = new BrowserWindow({
        width: 240,
        height: 240,
        transparent: true,
        frame: false,
        alwaysOnTop: false,
        resizable: false,
        skipTaskbar: true,
    })

    win.webContents.openDevTools();
    win.loadFile('index.html')
}


let tray = null
app.whenReady().then(() => {
    createWindow()
    tray = new Tray('tray.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Always on top', type: 'checkbox', click() { win.setAlwaysOnTop(!win.isAlwaysOnTop()) } },
        { label: 'Hide', type: 'normal', click() { win.minimize() } },
        { label: 'Show', type: 'normal', click() { win.restore() } },
        { label: 'Zoom in', type: 'normal',  click() { win.webContents.setZoomFactor(win.webContents.getZoomFactor()*0.9) }},
        { label: 'Zoom out', type: 'normal',  click() { win.webContents.setZoomFactor(win.webContents.getZoomFactor()*1.1) }},
        { label: 'Zoom reset', type: 'normal',  click() { win.webContents.setZoomFactor(1.0) }},
        { label: '', type: 'separator' },
        { label: 'Quit', type: 'normal', role: "quit" },
    ])
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
})



