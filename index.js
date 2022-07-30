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
        webPreferences: { experimentalFeatures: true }
    })

    //win.webContents.openDevTools();
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
        { label: '', type: 'separator' },
        { label: 'Disable Drag', type: 'normal', click() { IntegrateCSSToLockDrag() } },
        { label: 'Enable Drag', type: 'normal', click() { RemoveCSS() } },
        { label: '', type: 'separator' },
        { label: 'Zoom in', type: 'normal', click() { win.webContents.setZoomFactor(win.webContents.getZoomFactor() * 0.9) } },
        { label: 'Zoom out', type: 'normal', click() { win.webContents.setZoomFactor(win.webContents.getZoomFactor() * 1.1) } },
        { label: 'Zoom reset', type: 'normal', click() { win.webContents.setZoomFactor(1.0) } },
        { label: '', type: 'separator' },
        { label: 'Quit', type: 'normal', role: "quit" },
    ])
    tray.setToolTip('Pixel W10 widget clock')
    tray.setContextMenu(contextMenu)
})

// Quit when all windows are closed.    
app.on('window-all-closed', () => {
    app.quit()
});

var cssKey = undefined;

function IntegrateCSSToLockDrag(){
    
    var css = "* {	-webkit-user-select: none;	-webkit-user-drag: none;	-webkit-app-region: no-drag;	cursor: default;}"

    win.webContents.insertCSS(css, {
        cssOrigin: 'author'
    }).then(result => {
        console.log('CSS Added Successfully')
        console.log('Unique Key Returned ', result)
        cssKey = result;
    }).catch(error => {
        console.log(error);
    });
}

function RemoveCSS(){
    if (cssKey) {
        win.webContents.removeInsertedCSS(cssKey)
            .then(console.log('CSS Removed Successfully')).catch(error => {
                console.log(error);
            });
    }
}


