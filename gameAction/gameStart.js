const { spawn } = require('child_process');
const { isWindows, isMac, isLinux } = require('../utils/checkOs');
const gameClassNavBar = document.getElementsByClassName('navbar-game');
var GameLaunchedCorrectly = true;

function startLoading() {

    const button = document.querySelector(".button-play");
    button.classList.add("loading");
    button.childNodes[3].innerHTML = "Loading...";

    setTimeout(() => {
        if (!GameLaunchedCorrectly){
            return;
        }
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


function gameClosed(){
        const button = document.querySelector('.button-play');
        const icon = document.getElementById('play-icon');
        button.childNodes[3].innerHTML = 'Launch Game';
        icon.src = '../assets/icon/button-play.png';
        versionArrow.style.display = 'block';
        gameIsRunning = false;
        button.classList.remove("loading");


        gameClassNavBar.forEach(gameNavBar => {
                gameNavBar.classList.remove('not-allowed');
                gameNavBar.style.opacity = '1';
        })
        version.classList.remove('not-allowed');
}

document.querySelector('.button-play').addEventListener('click', async () => {

    const version = document.getElementById('version')
    const versionArrow = document.getElementById('versionArrow');

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
        startCmd = gameFile;
    } else if (isLinux) {
        startCmd = 'MESA_EXTENSION_MAX_YEAR=2004 wine ' + gameFile;
    }
    if (gameIsRunning) {
        runningGame.kill();
    } else {
        const currentVersion = document.getElementById('current-version').textContent;
        const currentGamePath = await getSettings(gameName + '-' + currentVersion);

        if (!currentGamePath) {
            displayNotification('Error: Game Not Found', '#f44336');
            return;
        }


        if (!gameIsRunning) {
            startLoading();
        }

        // Execute the command
        const childProcess = spawn(gameFile, [
            `+connect`,
            `cod.swd.cl:20010`,
            `+set`,
            `fs_game`,
            `callofdutychile`,
            `+set`,
            `password`,
            `ladder`,
  
          ], { cwd: currentGamePath });
        
        childProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        
        childProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        
        childProcess.on('error', (error) => {
          gameClosed();
          console.error(`Error: ${error.message}`);
          GameLaunchedCorrectly = false;
        });
        
        childProcess.on('close', (code) => {
          gameClosed();
          GameLaunchedCorrectly = false;
          console.log(`Child process exited with code ${code}`);
        });

        // spawn('"C:/Program Files (x86)/Steam/steamapps/common/Call of Duty/CoDMP.exe" +connect cod.swd.cl:20010',[],{cwd:currentGamePath})
        // return;
        runningGame = spawn(startCmd, [], { cwd: currentGamePath });

       

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

