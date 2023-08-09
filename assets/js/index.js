const game1 = document.getElementById("cod1nav");
const game2 = document.getElementById("coduonav");
const game3 = document.getElementById("cod2nav");
var gameName = null;
var isSwitching = false;



/* Known bugs:
- When you launch the game, and for some reason prompts the safemode window and you select cancel. The launcher still think that the game is opened.
- When you open settings of any game, you cant close it with ESC or clicking outside
- We should reduce the transition time of the version dropdown list. It takes a while when you click it.
*/

document.addEventListener("DOMContentLoaded", function() {

    // It would be good to add the token verification logic into
    // a VerifyToken() function.
    // I will leave this logic untouched because its unfinished.

    // Vérifier la valeur du token dans le LocalStorage
    // const token = localStorage.getItem('token');
        
    /*// Si le token est vide ou indéfini, rediriger vers la page de connexion
    if (!token) {
        window.location.href = 'login.html#'; // Remplacez "login.html" par l'URL de votre page de connexion
    }
    */

    /*
        function checkToken() {

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

    setInterval(checkToken, 5000);
    */

    
    // We force to switch the Game. Initially it will be cod1 as defined in the beginning
    switchGame(gameName,true)


    const roomBoxes = document.querySelectorAll(".room-box");
    roomBoxes.forEach(function(roomBox) {
        roomBox.addEventListener("click", function() {
            const roomType = this.getAttribute("data-room");
            window.location.href = "gamePage.html?roomType=" + roomType;
        });
    });
});


function switchGame(game, firstTime) {
    if (isSwitching){
        return;
    }
    if (!game){
        game = "cod1"
    }

    if (game && gameName == game){
        return;
    }

    if (!gameIsRunning) {
        isSwitching = true;
        gameName = game;
        localStorage.setItem('gameName', game);

        // if not the initial swap, then play the audio
        if (!firstTime){
            setTimeout(function () {
                PlaySound("../assets/sounds/swap.mp3",0.15)
            },100);
        }
        switch (gameName) {
            case "cod1":
                updateGameSettings(
                    "cod1",
                    "Call Of Duty: Classic",
                    'url("../assets/game_background/cod1.png")',
                    ['1.1', '1.1X', '1.2', '1.3', '1.4', '1.5']
                );
                game1.classList.add('navbar-game-active');
                break;

            case "cod_united_offensive":
                updateGameSettings(
                    "cod_united_offensive",
                    "Call Of Duty: United Offensive",
                    'url("../assets/game_background/cod_uo_background.jpeg")',
                    ['1.41', '1.51']
                );


                game2.classList.add('navbar-game-active');
                break;

            case "cod2":
                updateGameSettings(
                    "cod2",
                    "Call Of Duty 2: Classic",
                    'url("../assets/game_background/cod_2_background.webp")',
                    ['1.0', '1.2', '1.3']
                );

                game3.classList.add('navbar-game-active');
                break;
        }

        const browseGame = document.getElementsByClassName('browse-game');
        browseGame.forEach(game => {
            getSettings(game.id).then(data => {
                game.querySelector('.input-folder').value = data || 'No directory selected';
            });
        });
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
const modalitemCOD1 = document.getElementById('modalitemCOD1');
const closeButton = document.getElementById('close-button');

// Event handler on settings button
buttonSettings.addEventListener('click', function() {
    // Afficher la modal
    modal.style.display = 'block';

    modal.style.opacity = '1';
    modalitemCOD1.classList.remove('slide-out');
    modalitemCOD1.classList.add('slide-in');
});

const roomBoxes = document.querySelectorAll('.room-box, .navbar-game, .button-play');
roomBoxes.forEach(roomBox => {
    roomBox.addEventListener('mouseenter', () => {
        setTimeout(() => {
            PlaySound("../assets/sounds/hover.mp3",0.2);
        }, 10);
    });
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
        modalitemCOD1.classList.remove('slide-in');
        modalitemCOD1.classList.add('slide-out');
        modal.style.opacity = '0';
        setTimeout(function() {
            modal.style.display = 'none';
        }, 500); // Attendre 500 ms (0.5s) avant de masquer la modal
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


