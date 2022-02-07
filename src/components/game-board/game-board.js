import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { v4 as uuidv4 } from 'uuid';
import { setScale } from '../../store/transformSlice';
import Pawn from '../pawn/pawn';
import GameBoardBackground from '../game-board-background/game-board-background';
import './game-board.css';
import Emitter from '../../helpers/eventEmitter';

function GameBoard() {
  const newPawn = (info, key) => 
    <Pawn key={key} pawnId={key} info={info} type="npc-pawn" image="pawn-image" onRemove={() => removePawn(key)} />;
  const playerPawn = (player) => 
    <Pawn key={`player-pawn-${player}`} pawnId={`player-pawn-${player}`} type="player-pawn" info={{size: "medium", name: player}} image={`pawn-image-${player}`} onRemove={() => {}} />
  
  let initialPawns = [
    playerPawn("Cressida"),
    playerPawn("Hal"),
    playerPawn("O"),
    playerPawn("Nulf"),
    playerPawn("Phil")
  ]
  
  loadNPCs();

  function loadNPCs() {
    let npcs = JSON.parse(localStorage.getItem('npc-pawn-pawns'));
    for(let npcKey in npcs) {
      if(!initialPawns.find(p => p.key == npcKey)) {
        initialPawns.push(newPawn(npcs[npcKey].info, npcKey));
      }
    }
  }
  
  const [pawns, setPawns] = useState(initialPawns);
  
  useEffect(() => {
    Emitter.removeAllListeners("create-pawn");
    Emitter.on("create-pawn", (pawn) => { 
      let pawnInfo = {
        size: pawn.size,
        color: pawn.color,
        name: pawn.name
      }
      addPawn(pawnInfo) 
    });
  });
  
  const dispatch = useDispatch();
  const disableTransform = useSelector((state) => state.transform.disableTransform)

  function onZoom(zoomInfo) {
    dispatch(setScale(zoomInfo.state.scale))
  }
  
  function addPawn(info) {
    setPawns(oldPawns => [...oldPawns, newPawn(info, uuidv4())]);
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

  return (
    <>
      <TransformWrapper disabled={disableTransform} onZoom={onZoom}>
        <TransformComponent>
          <div className="game-board">
            <GameBoardBackground />
            <div className="grid">
              {pawns}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </>
  );
}

export default GameBoard;