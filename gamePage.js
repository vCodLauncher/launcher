window.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomType = urlParams.get('roomType');

    const roomTypeElement = document.getElementById("room-type");
    roomTypeElement.textContent = roomType;

    const quitBtn = document.getElementById("quit-btn");
    quitBtn.addEventListener("click", function() {
        window.location.href = "index.html";  // Assurez-vous de changer "index.html" par le nom de votre page principale
    });
});
