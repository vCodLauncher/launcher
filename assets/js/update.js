document.addEventListener('DOMContentLoaded', function () {
    const { ipcRenderer } = require('electron');
    const message = document.getElementById('message');
    const progress = document.getElementById('progress');

    const dots = window.setInterval(function () {
        const wait = document.getElementById("wait");
        if (wait.innerHTML.length > 3)
            wait.innerHTML = "";
        else
            wait.innerHTML += ".";
    }, 500);

    progress.style.display = 'none';
    message.innerHTML = 'Starting Launcher';
    setTimeout(() => {
        ipcRenderer.invoke('startUpdatedGame').catch((error) => {
            console.error(error);
        });
    }, 6000)

    setTimeout(() => {
        message.innerHTML = "Installing Update";
        progress.style.display = "block";

        let i = 0;
        const interval = setInterval(() => {
            if (i <= 100) {
                progress.value = i;
                i++;
            } else {
                clearInterval(interval);
                progress.style.display = 'none';
                message.innerHTML = 'Starting Launcher';
                setTimeout(() => {
                    ipcRenderer.invoke('startUpdatedGame').catch((error) => {
                        console.error(error);
                    });
                }, 3000);
            }
        }, 20);
    }, 3000);

});