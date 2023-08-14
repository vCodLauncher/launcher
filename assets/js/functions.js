


function PlaySound (path,volume) {
    if (!volume)
        volume=0.2;
    
    var audio = new Audio(path);
    audio.loop = false;
    audio.volume=volume;
    audio.play(); 
}
function updateGameSettings(game, gameTitle, background, versions) {
    var title = document.querySelector("#"+optionName+"_content #title");
    var titleSettings = document.querySelector("#settingsTitle");
    var versionList = document.querySelector("#"+optionName+"_content #version-list");
    var currentVersion = document.querySelector("#"+optionName+"_content #current-version");
    var content = document.querySelector("#"+optionName+"_content");
    var gameContainer = document.querySelector("#"+optionName+"_content .game-container");

    
    console.log("im updating game settings")
    gameContainer.style.opacity = 0;
    gameContainer.style.transform = "translateY(20px)";
    titleSettings.innerHTML = gameTitle + " — Settings";
    content.style.backgroundImage = background;

    resetMenu();

    var _versions = [];
    versions.forEach(version => {
        _versions.push({ version: version, id: `${gameName}-${version.toLowerCase()}` })
    });
    updateSettingsContainer(_versions);
    
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
        CurrentVersion = localStorage.getItem("currentVersion-" + gameName) || versions[0];
        currentVersion.innerHTML = CurrentVersion;
        
        isSwitching=false;

    }, 300);

  


}



function updateMenuOptionsSettings(title, background) {
     var viewTitle = document.querySelector("#"+optionName+"_content .game-title");
     console.log(viewTitle)
    var titleSettings = document.querySelector("#settingsTitle");
    var versionList = document.querySelector("#"+optionName+"_content #version-list");
    var currentVersion = document.querySelector("#"+optionName+"_content #current-version");
    var content = document.querySelector("#"+optionName+"_content");
    var gameContainer = document.querySelector("#"+optionName+"_content .game-container");

    

    // resetMenu();
    
    gameContainer.style.opacity = 0;
    gameContainer.style.transform = "translateY(20px)";
    content.style.backgroundImage = background;
    

    
    setTimeout(function () {
        gameContainer.style.opacity = 1;
        gameContainer.style.transform = "translateY(00px)";
        viewTitle.innerHTML = title;

       
        isSwitching=false;

    }, 300);

  


}

function checkLogin() {

    if (localStorage.getItem('token')) {
        fetch('http://193.38.250.89:3000/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    localStorage.removeItem('token');

                    ipcRenderer.send('open-login-window');

                    return false;
                }
            });
        return true;
    };
    localStorage.removeItem('token');
    ipcRenderer.send('open-login-window');
    return false;
}

function updateSettingsContainer(locations) {
    let settingsHTML = '';
    var settingsContainer = document.querySelector(".modal-content");
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