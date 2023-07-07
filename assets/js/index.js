
document.addEventListener("DOMContentLoaded", function() {
// Vérifier la valeur du token dans le LocalStorage
    const token = localStorage.getItem('token');

/*// Si le token est vide ou indéfini, rediriger vers la page de connexion
    if (!token) {
        window.location.href = 'login.html#'; // Remplacez "login.html" par l'URL de votre page de connexion
    }*/


/*    function checkToken() {

            fetch(`http://193.38.250.89:3000/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        localStorage.removeItem('token');
                        window.location.href = 'login.html#';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    }

    setInterval(checkToken, 5000);*/

    if (localStorage.getItem('gameName') === null) {
        localStorage.setItem('gameName', 'cod1');
        switchGame('cod1');
    } else {
        switchGame(localStorage.getItem('gameName'));
    }



    const game1 = document.getElementById("game1");
    const game2 = document.getElementById("game2");
    const game3 = document.getElementById("game3");

    game1.addEventListener("click", function() {
        switchGame("cod1");
    });

    game2.addEventListener("click", function() {
        switchGame("cod_united_offensive");
    });

    game3.addEventListener("click", function() {
        switchGame("cod2");
    });

    const roomBoxes = document.querySelectorAll(".room-box");
    roomBoxes.forEach(function(roomBox) {
        roomBox.addEventListener("click", function() {
            const roomType = this.getAttribute("data-room");
            window.location.href = "gamePage.html?roomType=" + roomType;
        });
    });
});
const game1 = document.getElementById('game1');
const game2 = document.getElementById('game2');
const game3 = document.getElementById('game3');
function switchGame(game) {
    const title = document.getElementById("title");
    const titleSettings = document.getElementById("settingsTitle");
    const versionList = document.getElementById("version-list");
    const currentVersion = document.getElementById("current-version");
    const content = document.querySelector(".content");
    const gameContainer = document.querySelector(".game-container");
    const settingsContainer = document.querySelector(".modal-content");


    gameName = game;



    const container = document.querySelector('.game-container')
    switch (game) {
        case "cod1":
            container.style.opacity = 0;
            container.style.transform = "translateY(20px)";

            titleSettings.innerHTML = "Call Of Duty:  Classic - Settings";
            content.style.backgroundImage = 'url("../assets/game_background/test.jpg")';
            localStorage.setItem("gameName", game);

            resetMenu();
            game1.classList.add('navbar-game-active');
            setTimeout(function() {
                title.innerHTML = "Call Of Duty: <br> Classic";
                versionList.innerHTML = `
            <li class="version-item item-active" onclick="changeActiveItem(this)">1.1</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.1x</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.2</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.3</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.4</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.5</li>
        `;
                currentVersion.innerHTML = "1.1x";
                container.style.opacity = 1;
                container.style.transform = "translateY(0)";

            }, 500);
            settingsContainer.innerHTML = `                            <p class="setting-name">Game Location v1.1 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod1-1.1">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.1X :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod1-1.1x">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.2 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod1-1.2">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.3 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod1-1.3">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.4 :</p>
                            <div class="browse-game"  onclick="openBrowseDialog(this)" id="cod1-1.4">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                                                        <p class="setting-name">Game Location v1.5 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod1-1.5">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
`;
            break;
        case "cod_united_offensive":
            container.style.opacity = 0;
            container.style.transform = "translateY(20px)";

            titleSettings.innerHTML = "Call Of Duty: United Offensive - Settings";
            content.style.backgroundImage = 'url("../assets/game_background/cod_uo_background.jpeg")';
            localStorage.setItem("gameName", game);

            resetMenu();
            game2.classList.add('navbar-game-active');
            setTimeout(function() {
                title.innerHTML = "Call Of Duty: <br> United Offensive";
                versionList.innerHTML = `
            <li class="version-item item-active" onclick="changeActiveItem(this)">1.41</li>
             <li class="version-item" onclick="changeActiveItem(this)">1.51</li>
        `;
                currentVersion.innerHTML = "1.41";
                container.style.opacity = 1;
                container.style.transform = "translateY(0)";
            }, 500);
            settingsContainer.innerHTML = `
                            <p class="setting-name">Game Location v1.41 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod_united_offensive-1.41">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.51 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod_united_offensive-1.51">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            `;
            break;
        case "cod2":
            container.style.opacity = 0;
            container.style.transform = "translateY(20px)";

            titleSettings.innerHTML = "Call Of Duty 2 : Classic - Settings";
            content.style.backgroundImage = 'url("../assets/game_background/cod_2_background.webp")';
            localStorage.setItem("gameName", game);

            resetMenu();
            game3.classList.add('navbar-game-active');
            setTimeout(function() {
                title.innerHTML = "Call Of Duty: 2 <br> Classic";
                versionList.innerHTML = `
            <li class="version-item item-active" onclick="changeActiveItem(this)">1.0</li>
             <li class="version-item" onclick="changeActiveItem(this)">1.2</li>
             <li class="version-item" onclick="changeActiveItem(this)">1.3</li>
        `;
                currentVersion.innerHTML = "1.0";
                container.style.opacity = 1;
                container.style.transform = "translateY(0)";
            }, 500);
            settingsContainer.innerHTML = `
                            <p class="setting-name">Game Location v1.0 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod2-1.0">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            <p class="setting-name">Game Location v1.2 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod2-1.2">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                                                        <p class="setting-name">Game Location v1.3 :</p>
                            <div class="browse-game" onclick="openBrowseDialog(this)" id="cod2-1.3">
                                <button class="browse-button" type="button">Browse</button>
                                <input id="selected-folder-text" class="input-folder" value=""
                                       disabled/>
                            </div>
                            `;
            break;
    }

    const browseGame = document.getElementsByClassName('browse-game');
    browseGame.forEach( game => {

        getSettings(game.id).then(data => {
            game.querySelector('.input-folder').value = data || 'No directory selected';
        }) ;
    });
}

function resetMenu() {


    game1.classList.remove('navbar-game-active')
    game2.classList.remove('navbar-game-active')
    game3.classList.remove('navbar-game-active')
}

// Récupérer la div, la modal et le bouton de fermeture
const buttonSettings = document.querySelector('.button-settings');
const modal = document.getElementById('modalCOD1');
const modalitemCOD1 = document.getElementById('modalitemCOD1');
const closeButton = document.getElementById('close-button');

// Ajouter un gestionnaire d'événement au clic sur la div
buttonSettings.addEventListener('click', function() {
    // Afficher la modal
    modal.style.display = 'block';

    modal.style.opacity = '1';
    modalitemCOD1.classList.remove('slide-out');
    modalitemCOD1.classList.add('slide-in');
});

// Ajouter un gestionnaire d'événement au clic sur le bouton de fermeture
closeButton.addEventListener('click', function() {
        modalitemCOD1.classList.remove('slide-in');
        modalitemCOD1.classList.add('slide-out');
        modal.style.opacity = '0';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 500); // Attendre 500 ms (0.5s) avant de masquer la modal
});


const form = document.getElementById('saveSettings');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    const browseGame = document.getElementsByClassName('browse-game');
    browseGame.forEach(game => {
        const value = game.querySelector('.input-folder').value;
        if (!value.startsWith('No')) {
            setSettings(game.id, value);
        }

    });

});

function displayNotification(message, color) {
    const notification = document.getElementById('notification');
    notification.innerHTML = message;
    notification.style.backgroundColor = color;
    notification.classList.add('active');
    setTimeout(function() {
        notification.classList.remove('active');
    }, 5000);
}


