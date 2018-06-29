const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', _ =>{
  const path = document.getElementById("myFile").files[0].path;
  var name = document.getElementById("myFile").files[0].name;
  ipc.send('countdown-start', [path, name])
})

ipc.on('countdown', (evt, markdown) => {

  document.getElementById('count').innerHTML = markdown;
})
