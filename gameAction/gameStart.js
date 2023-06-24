const { exec } = require('child_process');
const fs = require('fs');
const { isWindows, isMac, isLinux } = require('../utils/checkOs');

let gamePaths;
if (fs.existsSync('gamePaths.json')) {
    gamePaths = JSON.parse(fs.readFileSync('gamePaths.json'));
} else {
    gamePaths = {};
}

let currentGamePath = 'C:\\Program Files\\COD1';

let startCmd = '';

if (isMac) {
    startCmd = 'wine64 CoDMP.exe';
} else if (isWindows) {
    startCmd = 'CoDMP.exe';
}


function startLoading() {
    const button = document.querySelector(".button-play");
    button.classList.add("loading");
    button.childNodes[3].innerHTML = "Loading...";

    setTimeout(stopLoading, 4500);

}

document.querySelector('.button-play').addEventListener('click', () => {
    if (!currentGamePath) {
        console.error('No game selected');
        return;
    }

    startLoading();

    exec(startCmd+' +connect 127.0.0.1', { cwd: currentGamePath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        stopLoading();
    });
});


function stopLoading() {
    const button = document.querySelector(".button-play");
    button.childNodes[3].innerHTML = "Launch game";
    button.classList.remove("loading");
}
