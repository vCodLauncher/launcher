const { ipcRenderer, dialog } = require('electron');

const path = require('path');
const fs = require('fs');

async function getUserDataPath() {
    return await ipcRenderer.invoke('getUserDataPath');
}

function openDialog() {
    dialog.showOpenDialog({ properties: ['openDirectory'] })
        .then(result => {
            // `result.filePaths` contient le chemin du dossier sélectionné
            const selectedDirectory = result.filePaths[0];
            console.log('Dossier sélectionné :', selectedDirectory);
            // Faites quelque chose avec le chemin du dossier sélectionné
        })
        .catch(err => {
            console.error(err);
        });
}

function getFilePath(userDataPath) {
    return path.join(userDataPath, 'settings.json');
}

function setSettings(paramName, paramValue) {
    // Récupérer le chemin vers le dossier userData
    getUserDataPath()
        .then(userDataPath => {
            const filePath = getFilePath(userDataPath);
            // Lecture du fichier JSON
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        // Le fichier n'existe pas, on crée un nouvel objet JSON
                        const jsonData = {};
                        // Définition du paramètre avec sa valeur
                        jsonData[paramName] = paramValue;
                        // Écriture du fichier JSON
                        fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
                            if (err) {
                                console.error('Erreur lors de la création du fichier JSON :', err);
                            } else {
                                console.log('Le fichier JSON a été créé avec succès et les paramètres ont été définis.');
                            }
                        });
                    } else {
                        console.error('Erreur lors de la lecture du fichier JSON :', err);
                    }
                } else {
                    // Le fichier existe, on parse son contenu en objet JSON
                    const jsonData = JSON.parse(data);
                    // Définition du paramètre avec sa valeur
                    jsonData[paramName] = paramValue;
                    // Écriture du fichier JSON
                    fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
                        if (err) {
                            console.error('Erreur lors de l\'écriture dans le fichier JSON :', err);
                        } else {
                            console.log('Le fichier JSON a été mis à jour avec succès et les paramètres ont été définis.');
                        }
                    });
                }
            });
        })
        .catch(err => {
            console.error('Erreur lors de la récupération du chemin userData :', err);
        });
}

function getSettings(paramName) {
    // Récupérer le chemin vers le dossier userData
    return getUserDataPath()
        .then(userDataPath => {
            const filePath = getFilePath(userDataPath);
            // Lecture du fichier JSON
            const data = fs.readFileSync(filePath, 'utf8');
            // Parsing des données JSON en objet
            const jsonData = JSON.parse(data);
            // Vérifier si le paramètre existe
            if (jsonData.hasOwnProperty(paramName)) {
                // Retourner la valeur du paramètre
                return jsonData[paramName];
            } else {
                // Paramètre non trouvé
                console.warn(`Le paramètre '${paramName}' n'a pas été trouvé dans le fichier JSON.`);
                return null;
            }
        })
        .catch(err => {
            console.error('Erreur lors de la récupération du chemin userData :', err);
            return null;
        });
}

function openBrowseDialog(element) {
    ipcRenderer.removeAllListeners('selected-folder');
    ipcRenderer.send('open-folder-dialog');

    ipcRenderer.on('selected-folder', (event, folderPath) => {
        if (!folderPath || folderPath === '') {
            element.getElementsByClassName("input-folder")[0].value = 'No directory selected';
        }else {
            element.getElementsByClassName("input-folder")[0].value = folderPath;
        }
    });
}



module.exports = {
    setSettings,
    getSettings
};
