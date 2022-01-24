import './menu-bar.css';
import { useState } from 'react';
import Emitter from '../../helpers/eventEmitter';
const electron = window.require('electron');

function MenuBar() {
    const [pawnsMenuOpen, setPawnsMenuOpen] = useState(false);

    function createPawn(size) {
        Emitter.emit('create-pawn', size);
        setPawnsMenuOpen(false);
    }

    return (
        <div className="menu-bar">
            <div className="sub-menu primary-menu-items">
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
            <div className="sub-menu window-menu-items">
                <button className="menu-button" onClick={() => electron.ipcRenderer.invoke("window-all-closed")}>X</button>
            </div>
        </div>
    );
  }
  
  export default MenuBar;