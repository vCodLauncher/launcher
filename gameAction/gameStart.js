const { exec } = require('child_process');
const { isWindows, isMac, isLinux } = require('../utils/checkOs');

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

document.querySelector('.button-play').addEventListener('click', async () => {
    console.log(localStorage.getItem('gameName'));
    let currentGamePath = await getSettings(localStorage.getItem('gameName'));

    if (!currentGamePath) {
        displayNotification('Error : Game Not Found', "#ff0000");
        return;
    }

    startLoading();

    exec(startCmd + ' +connect 127.0.0.1', {cwd: currentGamePath}, (error, stdout, stderr) => {
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



