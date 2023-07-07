document.addEventListener('DOMContentLoaded', function () {
    const version = document.getElementById('version');
    const dropdown = document.getElementById('version-dropdown');

    version.addEventListener('click', function (event) {
        if (!gameIsRunning) {
            event.stopPropagation(); // Empêche la propagation de l'événement de clic du dropdown vers le document

            dropdown.classList.toggle('dropdown-active');

            if (dropdown.classList.contains('dropdown-active')) {
                dropdown.style.height = (dropdown.scrollHeight - 10) + 'px';
            } else {
                dropdown.style.height = (dropdown.scrollHeight - 10) + 'px';

                // Utilisez setTimeout pour retarder le changement de hauteur
                setTimeout(function () {
                    dropdown.style.height = '0px';
                }, 10);
            }
        }
    });

    document.addEventListener('click', function (event) {
        // Vérifiez si le clic a été effectué à l'extérieur du dropdown
        if (!dropdown.contains(event.target) && !version.contains(event.target)) {
            dropdown.classList.remove('dropdown-active');
            dropdown.style.height = '0px';
        }
    });


});


function changeActiveItem(clickedItem) {
    const dropdown = document.getElementById('version-dropdown');
    // Supprimer la classe "item-active" de tous les éléments
    const allItems = document.getElementsByClassName("version-item");
    const currentVersion = document.getElementById("current-version");
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove("item-active");
    }

    // Ajouter la classe "item-active" à l'élément cliqué
    clickedItem.classList.add("item-active");
    currentVersion.innerHTML = clickedItem.innerHTML;

    dropdown.classList.remove('dropdown-active');
    dropdown.style.height = '0px';


}