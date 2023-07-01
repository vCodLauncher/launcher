
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

    const selectedFolder = document.getElementById('selected-folder-text');
    getSettings(localStorage.getItem('gameName')).then(data => {
        selectedFolder.value = data || 'Aucun dossier sélectionné';
    }) ;

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


    gameName = game;

    const selectedFolder = document.getElementById('selected-folder-text');
    getSettings(gameName).then(data => {
        selectedFolder.value = data || 'Aucun dossier sélectionné';
    }) ;

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
            <li class="version-item item-active" onclick="changeActiveItem(this)">1.1x</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.2</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.3</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.4</li>
            <li class="version-item" onclick="changeActiveItem(this)">1.5</li>
        `;
                currentVersion.innerHTML = "1.1x";
                container.style.opacity = 1;
                container.style.transform = "translateY(0)";

            }, 500);
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
            break;
    }
}

function resetMenu() {


    game1.classList.remove('navbar-game-active')
    game2.classList.remove('navbar-game-active')
    game3.classList.remove('navbar-game-active')
}

// Récupérer la div, la modal et le bouton de fermeture
const buttonSettings = document.querySelector('.button-settings');
const modal = document.getElementById('modalCOD1');
const closeButton = document.getElementById('close-button');

// Ajouter un gestionnaire d'événement au clic sur la div
buttonSettings.addEventListener('click', function() {
    // Afficher la modal
    modal.style.display = 'block';

    // Ajouter la classe d'animation pour le slide-in
    modal.classList.add('slide-in');
});

// Ajouter un gestionnaire d'événement au clic sur le bouton de fermeture
closeButton.addEventListener('click', function() {
    // Ajouter la classe d'animation pour le slide-out
    modal.classList.add('slide-out');

    // Supprimer la classe d'animation pour le slide-in
    modal.classList.remove('slide-in');
});

// Ajouter un gestionnaire d'événement pour réinitialiser la modal après l'animation de fermeture
modal.addEventListener('animationend', function() {
    // Vérifier si l'animation est celle du slide-out
    if (modal.classList.contains('slide-out')) {
        // Masquer la modal
        modal.style.display = 'none';

        // Supprimer la classe d'animation pour réinitialiser la prochaine fois
        modal.classList.remove('slide-out');
    }
});

const form = document.getElementById('saveSettings');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    const selectedFolder = document.getElementById('selected-folder-text').value;

    // Appeler la fonction setSettings après avoir récupéré la valeur
    setSettings(gameName, selectedFolder);

    // Récupérer la référence à la modal après avoir appelé setSettings
    const modal = document.getElementById('modalCOD1');

    // Masquer la modal après un court délai pour permettre l'animation
    setTimeout(function() {
        modal.style.display = 'none';
    }, 200); // Temps en millisecondes, ajustez-le selon la durée de votre animation

    modal.classList.remove('slide-out');
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


