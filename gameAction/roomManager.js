function updateRoomCounts() {
    let roomTypes = ['team-deathmatch', 'search-and-destroy', 'deathmatch', 'gungame'];

    /*    roomTypes.forEach(roomType => {
            fetch(`http://193.38.250.89:3000/room/team-deathmatch`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Mettre à jour l'affichage du nombre de joueurs dans la room
                    let playersOnline = document.getElementById(`${roomType}-players`);
                    playersOnline.textContent = data.players;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });*/
}

setInterval(updateRoomCounts, 5000);


const getBanner = async (userId) => {
    const userResponse = await fetch('http://193.38.250.89:3000/user/' + userId, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: 'GET',
    });
    const userData = await userResponse.json();

    if (!userData.user.bannerId) return;

    const bannerResponse = await fetch('http://193.38.250.89:3000/banner/' + userData.user.bannerId, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        method: 'GET',
    });
    const bannerData = await bannerResponse.json();

    return bannerData.banner.imageUrl;
};

//ON DOM LOADED
document.addEventListener('DOMContentLoaded', function () {
    // Obtenez le playerTable
    const playerTable = document.getElementById('player-table');

    // Créez un objet pour stocker les éléments HTML des joueurs
    const playerElements = {};

    // Définissez une fonction pour mettre à jour les données des joueurs
    async function updatePlayerData() {
        try {
            const roomResponse = await fetch(`http://193.38.250.89:3000/room/1`, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
                method: 'GET',
            });
            const roomData = await roomResponse.json();

            // Parcourez les joueurs et mettez à jour les données existantes ou ajoutez de nouvelles données
            for (const player of roomData.players) {
                if (!playerElements[player.id]) {
                    // Créez un nouvel élément pour le joueur s'il n'existe pas
                    const playerElement = document.createElement('div');
                    playerElement.classList.add('player');
                    playerElement.innerHTML = `<p>${player.nickname}</p>
                        <div class="player-info">
                            <ul id="${player.id}">
                                <li><strong>Score:</strong> ${player.score}</li>
                                <li><strong>Games Played:</strong> ${player.gamesPlayed}</li>
                                <li><strong>Wins:</strong> ${player.wins}</li>           
                            </ul>
                        </div>`;
                    playerTable.appendChild(playerElement);

                    // Stockez l'élément dans l'objet playerElements
                    playerElements[player.id] = playerElement;
                } else {
                    // Mettez à jour les données du joueur existant
                    const ulElement = playerElements[player.id].querySelector(`ul#${player.id}`);
                    ulElement.innerHTML = `
                        <li><strong>Score:</strong> ${player.score}</li>
                        <li><strong>Games Played:</strong> ${player.gamesPlayed}</li>
                        <li><strong>Wins:</strong> ${player.wins}</li>`;
                }

                // Mettez à jour l'image de bannière si disponible
                const bannerUrl = await getBanner(player.id);
                if (bannerUrl) {
                    playerElements[player.id].style.backgroundImage = `url('http://193.38.250.89:3000${bannerUrl}')`;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Appelez la fonction de mise à jour initiale
    updatePlayerData();

    // Utilisez setInterval pour appeler la fonction de mise à jour toutes les 5 secondes
    setInterval(updatePlayerData, 5000);
});

