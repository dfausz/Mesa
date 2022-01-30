import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { v4 as uuidv4 } from 'uuid';
import { setScale } from '../../store/transformSlice';
import Pawn from '../pawn/pawn';
import GameBoardBackground from '../game-board-background/game-board-background';
import './game-board.css';
import Emitter from '../../helpers/eventEmitter';

function GameBoard() {
  const newPawn = (size, key) => <Pawn key={key} size={size} type="npc-pawn" image="pawn-image" onRemove={() => removePawn(key)} />;
  const playerPawn = (player) => <Pawn key={`player-pawn-${player}`} type="player-pawn" size="medium" image={`pawn-image-${player}`} onRemove={() => removePawn(`player-pawn-${player}`)} />
  const [pawns, setPawns] = useState([
    playerPawn("cressida"),
    playerPawn("hal"),
    playerPawn("o"),
    playerPawn("nulf"),
    playerPawn("phil")
  ]);

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

  function removePawn(key){
    setPawns(oldPawns => [...oldPawns.filter(pawn => pawn.key !== key)]);
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