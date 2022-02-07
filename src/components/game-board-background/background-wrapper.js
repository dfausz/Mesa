import Emitter from '../../helpers/eventEmitter';
import BackgroundModel from './background-model';
import { useEffect } from 'react';
const electron = window.require('electron');

function BackgroundWrapper(props){
    useEffect(() => {
        Emitter.removeAllListeners('change-background');
        Emitter.on('change-background', (backgroundModel) => {
            processChangeBackground(backgroundModel);
        });

        Emitter.removeAllListeners('save-app-state');
        Emitter.on('save-app-state', saveBackgroundState);

        electron.ipcRenderer.removeAllListeners('chosen-background');
        electron.ipcRenderer.on('chosen-background', (_, base64, name) => {
            let image = `data:image/jpg;base64,${base64}`;
            let background = new BackgroundModel(name, image);
            saveBackground(background);
            processChangeBackground(background);
        })
    })

    function processChangeBackground(background) {
        saveBackgroundState();
        setCurrentBackground(background);
    }
    
    function setCurrentBackground(background) {
        props.setBackground(background.image);
        props.translate.set(background.translate);
        props.scale.set(background.scale);
        localStorage.setItem('current-background', JSON.stringify(background));
    }

    function saveBackground(background) {
        let backgroundList = JSON.parse(localStorage.getItem('background-store')) ?? {};
        backgroundList[background.name] = background;
        localStorage.setItem('background-store', JSON.stringify(backgroundList));
    }

    function saveBackgroundState() {
        let currentBackground = JSON.parse(localStorage.getItem('current-background'));
        currentBackground.translate = props.translate.get;
        currentBackground.scale = props.scale.get;
        localStorage.setItem('current-background', JSON.stringify(currentBackground));
        saveBackground(currentBackground);
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default BackgroundWrapper;
    