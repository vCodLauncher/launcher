function updateRoomCounts() {
    let roomTypes = ['team-deathmatch', 'search and destroy', 'deathmatch', 'gungame'];

    roomTypes.forEach(roomType => {
        // Effectuer une requête HTTP GET à la route /room/:roomType de votre serveur
        fetch(`http://193.38.250.89:3000/room/team-deathmatch`)
            .then(response => response.json())
            .then(data => {
                // Mettre à jour l'affichage du nombre de joueurs dans la room
                let playersOnline = document.getElementById(`${roomType}-players`);
                playersOnline.textContent = data.players;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
}

setInterval(updateRoomCounts, 5000);
