const { spawn } = require('child_process');
const { isWindows, isMac, isLinux } = require('../utils/checkOs');


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

let gameIsRunning = false;
let runningGame;
let startCmd = '';
let gameFile;

document.querySelector('.button-play').addEventListener('click', async () => {

    const version = document.getElementById('version')
    const versionArrow = document.getElementById('versionArrow');
    const gameClassNavBar = document.getElementsByClassName('navbar-game');

    if (gameName === 'cod1') {
        gameFile = 'CoDMP.exe';
    } else if (gameName === 'cod_united_offensive') {
        gameFile = 'CoDUOMP.exe';
    } else if (gameName === 'cod2') {
        gameFile = 'CoD2MP.exe';
    }

    if (isMac) {
        startCmd = 'wine64 ' + gameFile;
    } else if (isWindows) {
        startCmd = '' + gameFile;
    } else if (isLinux) {
        startCmd = 'MESA_EXTENSION_MAX_YEAR=2004 wine ' + gameFile;
    }
    if (gameIsRunning) {
        runningGame.kill();
    } else {
        const currentVersion = document.getElementById('current-version').textContent;
        const currentGamePath = await getSettings(gameName + '-' + currentVersion);

        if (!currentGamePath) {
            displayNotification('Error: Game Not Found', '#ff0000');
            return;
        }

        if (!gameIsRunning) {
            startLoading();
        }

        runningGame = spawn(startCmd, [], { cwd: currentGamePath });

        runningGame.on('exit', () => {
            const button = document.querySelector('.button-play');
            const icon = document.getElementById('play-icon');
            button.childNodes[3].innerHTML = 'Launch Game';
            icon.src = '../assets/icon/button-play.png';
            versionArrow.style.display = 'block';
            gameIsRunning = false;

            gameClassNavBar.forEach(gameNavBar => {
                    gameNavBar.classList.remove('not-allowed');
                    gameNavBar.style.opacity = '1';
            })
            version.classList.remove('not-allowed');
        });

        runningGame.on('close', () => {
            runningGame.kill();
        });

        versionArrow.style.display = 'none';

        gameClassNavBar.forEach(gameNavBar => {
            if (!gameNavBar.id.startsWith(gameName) && gameNavBar.id.startsWith('cod')) {
                gameNavBar.classList.add('not-allowed');
                gameNavBar.style.opacity = '0.6';
            }
        })

        version.classList.add('not-allowed');

        gameIsRunning = true;
    }
});


