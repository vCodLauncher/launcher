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
  //get playerTable
    const playerTable = document.getElementById('player-table');

    fetch(`http://193.38.250.89:3000/room/1`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            //for all players in room add a row to the table
            data.players.forEach(player => {
                playerTable.innerHTML += `<div class="player">
                    <p>${player.nickname}</p>
                    <div class="player-info">
                        <ul>
                            <li><strong>Score:</strong> 5000</li>
                            <li><strong>Games Played:</strong> 150</li>
                            <li><strong>Wins:</strong> 90</li>
                        </ul>
                    </div>
                </div>`;
            })
        })

})