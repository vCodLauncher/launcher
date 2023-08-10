window.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomType = urlParams.get('roomType');
    const game = urlParams.get('game');

    const roomTypeElement = document.getElementById("room-type");
    roomTypeElement.textContent = game+": "+roomType;

    const quitBtn = document.getElementById("quit-btn");
    quitBtn.addEventListener("click", function() {
        window.location.href = "index.html";  // Assurez-vous de changer "index.html" par le nom de votre page principale
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key == "Backspace") {
        window.location.href = "index.html";
    }
  });
