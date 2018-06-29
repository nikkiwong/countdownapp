const electron = require('electron')
const TurndownService = require('turndown')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const mammoth = require('mammoth')
const countdown = require('./countdown');
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400
  })

  mainWindow.loadURL(`file://${__dirname}/countdown.html`)
  mainWindow.on('closed', _ => {
    mainWindow = null
  })
})

ipc.on('countdown-start', (evt, path, name) => {
  (async () => {
    let countdownHtmlData
    let countdownMHtmlData
    const dir = '/docs';
    try {
      var html
      mammoth.convertToHtml({ path: path[0] })
        .then(function (result) {
          if (!fs.existsSync(directory+dir)) {
            fs.mkdirSync(directory+dir);
          }        
          html = result.value; // The generated HTML
          var messages = result.messages; // Any messages, such as warnings during conversion
          fs.writeFile(dirFileName + '.html', html, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        })
        .done();
    } catch (e) {
      console.error(e);
    }

    // let fileExtension = ""
    let dirFileName = path[0].replace(/\.doc.$/, "")
    let name = path[1].replace(/\.doc.$/, "")
    const directory = path[0].replace(path[1], "")

    countdownHtmlData = await readFile(dirFileName + '.html', 'utf8')

    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(countdownHtmlData)

    fs.writeFile(directory+dir+"/"+name + '.md', markdown, function (err) {
      if (err) throw err;
      console.log('Saved md file!');
    });

    mainWindow.webContents.send('countdown', "Saved")
  })();

  // console.log(countdownHtmlData)
  // countdown(count => {
  //   mainWindow.webContents.send('countdown', count)
  // })
})
