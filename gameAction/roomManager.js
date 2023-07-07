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

window.addEventListener("DOMContentLoaded", function() {

    const roomElements = document.querySelectorAll(".room-box");

    roomElements.forEach(roomElement => {
        roomElement.addEventListener("click", function() {
            const roomType = roomElement.getAttribute('data-room');

            fetch(`http://193.38.250.89:3000/room/${roomType}/join`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        });
    });
});
