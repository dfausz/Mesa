import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { v4 as uuidv4 } from 'uuid';
import { setScale } from '../../store/transformSlice';
import Pawn from '../pawn/pawn';
import GameBoardBackground from '../game-board-background/game-board-background';
import './game-board.css';
import Emitter from '../../helpers/eventEmitter';
import ContextMenu from '../context-menu/context-menu';

function GameBoard() {
  const newPawn = (size, key) => <Pawn key={key} pawnId={key} size={size} type="npc-pawn" image="pawn-image" onRemove={() => removePawn(key)} />;
  const playerPawn = (player) => <Pawn key={`player-pawn-${player}`} pawnId={`player-pawn-${player}`} type="player-pawn" size="medium" image={`pawn-image-${player}`} onRemove={() => {}} />
  
  let initialPawns = [
    playerPawn("cressida"),
    playerPawn("hal"),
    playerPawn("o"),
    playerPawn("nulf"),
    playerPawn("phil")
  ]
  
  loadNPCs();

  function loadNPCs() {
    let npcs = JSON.parse(localStorage.getItem('npc-pawn-pawns'));
    for(let npcKey in npcs) {
      if(!initialPawns.find(p => p.key == npcKey)) {
        initialPawns.push(newPawn(npcs[npcKey].size, npcKey));
      }
    }
  }
  
  const [pawns, setPawns] = useState(initialPawns);
  const [contextMenuLocation, setContextMenuLocation] = useState({x: 0, y: 0});
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  
  useEffect(() => {
    Emitter.removeAllListeners("create-pawn");
    Emitter.on("create-pawn", (size) => { addPawn(size) });
  });
  
  const dispatch = useDispatch();
  const disableTransform = useSelector((state) => state.transform.disableTransform)

  function onZoom(zoomInfo) {
    dispatch(setScale(zoomInfo.state.scale))
  }
  
  function addPawn(size) {
    setPawns(oldPawns => [...oldPawns, newPawn(size, uuidv4())]);
  }

  function removePawn(key) {
    setPawns(oldPawns => [...oldPawns.filter(pawn => pawn.key !== key)]);
    removeNPC(key);
  }

  function removeNPC(key) {
    let npcs = JSON.parse(localStorage.getItem('npc-pawn-pawns'));
    delete npcs[key];
    localStorage.setItem('npc-pawn-pawns', JSON.stringify(npcs));
  }

  function openContextMenu(event) {
    console.log('here')
    setContextMenuOpen(true);
    setContextMenuLocation({x: event.clientX, y: event.clientY});
  }

  return (
    <>
      <TransformWrapper disabled={disableTransform} onZoom={onZoom}>
        <TransformComponent>
          <div className="game-board">
            <GameBoardBackground />
            <div className="grid">
              <div className="game-board-context" onContextMenu={openContextMenu}>&nbsp;</div>
              {pawns}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
      <ContextMenu isOpen={contextMenuOpen} setIsOpen={setContextMenuOpen} location={contextMenuLocation} />
    </>
  );
}

export default GameBoard;