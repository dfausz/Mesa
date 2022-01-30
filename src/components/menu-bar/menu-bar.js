import './menu-bar.css';
import { useState } from 'react';
import Emitter from '../../helpers/eventEmitter';
const electron = window.require('electron');

function MenuBar() {
    const [pawnsMenuOpen, setPawnsMenuOpen] = useState(false);

    electron.ipcRenderer.on("file-selected", (...all) => console.log(all));
    
    function createPawn(size) {
        Emitter.emit('create-pawn', size);
        setPawnsMenuOpen(false);
    }

    function showFileDialog(){
        electron.ipcRenderer.invoke("show-file-dialog");
    }

    return (
        <div className="menu-bar">
            <div className="sub-menu primary-menu-items">
                <div className="menu-button upload-file" onClick={showFileDialog}>Upload</div>
                <div className="pawns-menu">
                    <button className="menu-button" onClick={() => {setPawnsMenuOpen(!pawnsMenuOpen)}}>Pawns</button>
                    <div className={"menu-content " + (pawnsMenuOpen ? "" : "hidden")} >
                        <button className="menu-button" onClick={() => createPawn("tiny")}>Tiny</button>
                        <button className="menu-button" onClick={() => createPawn("small")}>Small</button>
                        <button className="menu-button" onClick={() => createPawn("medium")}>Medium</button>
                        <button className="menu-button" onClick={() => createPawn("large")}>Large</button>
                        <button className="menu-button" onClick={() => createPawn("huge")}>Huge</button>
                        <button className="menu-button" onClick={() => createPawn("gargantuan")}>Gargantuan</button>
                    </div>
                </div>
            </div>
            <div className="draggable-app-region">&nbsp;</div>
            <div className="sub-menu window-menu-items">
                <button className="menu-button material-icons" onClick={() => electron.ipcRenderer.invoke("window-minimize")}>minimize</button>
                <button className="menu-button material-icons-outlined" onClick={() => electron.ipcRenderer.invoke("window-toggle-maximize")}>square</button>
                <button className="menu-button material-icons" onClick={() => electron.ipcRenderer.invoke("window-all-closed")}>close</button>
            </div>
        </div>
    );
  }
  
  export default MenuBar;