
const title = document.getElementById("title");
const titleSettings = document.getElementById("settingsTitle");
const versionList = document.getElementById("version-list");
const currentVersion = document.getElementById("current-version");
const content = document.querySelector(".content");
const gameContainer = document.querySelector(".game-container");
const settingsContainer = document.querySelector(".modal-content");
const container = document.querySelector('.game-container');


function PlaySound (path,volume) {
    if (!volume)
        volume=0.2;
    var audio = new Audio(path);
    audio.loop = false;
    audio.volume=volume;
    audio.play(); 
}
function updateGameSettings(game, gameTitle, background, versions) {
    var _versions = [];
    

    versions.forEach(version => {
        _versions.push({ version: version, id: `${gameName}-${version.toLowerCase()}` })
    });
    updateSettingsContainer(_versions);

    gameContainer.style.opacity = 0;
    gameContainer.style.transform = "translateY(20px)";

    titleSettings.innerHTML = gameTitle + " — Settings";
    content.style.backgroundImage = background;

    resetMenu();

    
    const versionListHTML = versions.map(version => `
        <li class="version-item" onclick="changeActiveItem(this)">${version}</li>
    `).join('');

    versionList.innerHTML = versionListHTML;

    let versionClassList = document.getElementsByClassName('version-item');
    Array.from(versionClassList).forEach(version => {
        if (version.innerHTML === currentVersion.innerHTML) {
            version.classList.add('item-active');
        }
    });

    
    setTimeout(function () {
        gameTitle = gameTitle.split(":");
        title.innerHTML = gameTitle;

        if (gameTitle.length > 1){
            title.innerHTML = gameTitle[0] + ":<br>" + gameTitle[1];
        }
        gameContainer.style.opacity = 1;
        gameContainer.style.transform = "translateY(0)";

        currentVersion.innerHTML = localStorage.getItem("currentVersion-" + gameName) || versions[0];
        isSwitching=false;

    }, 300);

  


}

function updateSettingsContainer(locations) {
    let settingsHTML = '';

    locations.forEach(location => {
        settingsHTML += `
            <p class="setting-name">Game Location ${location.version} :</p>
            <div class="browse-game" onclick="openBrowseDialog(this)" id="${location.id}">
                <button class="browse-button" type="button">Browse</button>
                <input id="selected-folder-text" class="input-folder" value="" disabled/>
            </div>
        `;
    });

    settingsContainer.innerHTML = settingsHTML;
}