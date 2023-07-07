const { exec } = require('child_process');
const { isWindows, isMac, isLinux } = require('../utils/checkOs');

let startCmd = '';

if (isMac) {
    startCmd = 'wine64 CoDMP.exe';
} else if (isWindows) {
    startCmd = 'CoDMP.exe';
} else if (isLinux) {
    startCmd = 'MESA_EXTENSION_MAX_YEAR=2004 wine CoDMP.exe';
}


function startLoading() {

    const button = document.querySelector(".button-play");
    button.classList.add("loading");
    button.childNodes[3].innerHTML = "Loading...";

    setTimeout(() => {
        const button = document.querySelector(".button-play");
        button.classList.remove('loading')
        const icon = document.getElementById('play-icon');
        button.childNodes[3].innerHTML = "Quit Game";
        icon.src = "../assets/icon/x.png"
    }, 6000);

}

let gameIsRunning;
let runningGame;
document.querySelector('.button-play').addEventListener('click', async () => {
    console.log(gameIsRunning)
    if (gameIsRunning) {
        runningGame.kill();
    } else {
        const curentVersion = document.getElementById('current-version').textContent;
        let currentGamePath = await getSettings(gameName+'-'+curentVersion);

        if (!currentGamePath) {
            displayNotification('Error : Game Not Found', "#ff0000");
            return;
        }

        startLoading();

        runningGame = exec(startCmd + ' ', {cwd: currentGamePath}, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            gameIsRunning = true;
        });

        runningGame.on('exit', () => {
            const button = document.querySelector(".button-play");
            const icon = document.getElementById('play-icon');
            button.childNodes[3].innerHTML = "Launch Game";
            icon.src = "../assets/icon/button-play.png"
            gameIsRunning = false;
        });
    }


});



