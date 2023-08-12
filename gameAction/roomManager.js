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

//ON DOM LOADED
document.addEventListener('DOMContentLoaded', function () {
    // Obtenez le playerTable
    const playerTable = document.getElementById('player-table');

    // Définissez une fonction pour mettre à jour les données des joueurs
    function updatePlayerData() {
        fetch(`http://193.38.250.89:3000/room/1`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                // Réinitialisez le contenu du tableau des joueurs
                playerTable.innerHTML = '';

                // Parcourez les joueurs et ajoutez les nouvelles données au tableau
                data.players.forEach(player => {
                    playerTable.innerHTML += `<div class="player">
                        <p>${player.nickname}</p>
                        <div class="player-info">
                            <ul>
                                <li><strong>Score:</strong> ${player.score}</li>
                                <li><strong>Games Played:</strong> ${player.gamesPlayed}</li>
                                <li><strong>Wins:</strong> ${player.wins}</li>
                            </ul>
                        </div>
                    </div>`;
                });
            });
    }

    // Appelez la fonction de mise à jour initiale
    updatePlayerData();

    // Utilisez setInterval pour appeler la fonction de mise à jour toutes les 5 secondes
    setInterval(updatePlayerData, 5000);
});