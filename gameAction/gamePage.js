window.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomType = urlParams.get('roomType');
    const game = urlParams.get('game');

    const roomTypeElement = document.getElementById("room-type");
    roomTypeElement.textContent = game+": "+roomType;

    const quitBtn = document.getElementById("quit-btn");
    quitBtn.addEventListener("click", function() {

        //post on server to quit room
        fetch(`http://193.38.250.89:3000/room/leave`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = "index.html";
            })
            .catch(error => console.error('Error:', error));
        });

});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key == "Backspace") {
        window.location.href = "index.html";
    }
  });
