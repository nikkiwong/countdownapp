const electron = require('electron')
const TurndownService =  require('turndown')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const countdown = require('./countdown');
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 400,
    width:400
  })

  mainWindow.loadURL(`file://${__dirname}/countdown.html`)
  mainWindow.on('closed', _ => {
    mainWindow = null
  })

  // const name = electron.app.getName()
  // const template = [
  //   {
  //     label: name,
  //     submenu: [{
  //       label: `About ${name}`,
  //       click: _ => {
  //         console.log('Clicked About')
  //       },
  //       role: 'about'
  //     }, {
  //       type: 'separator'
  //     }, {
  //       label: 'Quit',
  //       click: _ => {app.quit()},
  //       accelerator: 'Cmd+Q'
  //     }]
  //   }
  // ]
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)
})

ipc.on('countdown-start', _ => {
  // (async() => {
  //   let countdownHtmlData
  //   try {
  //     countdownHtmlData = await readFile('src/countdown.html', 'utf8')
  //       console.log(countdownHtmlData);
  //   } catch(e){
  //     console.error(e);
  //   }
  //   const turndownService = new TurndownService()
  //   const markdown = turndownService.turndown(countdownHtmlData)
  //   console.log(markdown)
  // })();

  console.log(countdownHtmlData)
  countdown(count => {
    mainWindow.webContents.send('countdown', count)
  })
})
