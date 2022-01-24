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
  const [pawns, setPawns] = useState([<Pawn />]);

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
    setPawns(oldPawns => [...oldPawns, <Pawn key={uuidv4()} size={size} />]);
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