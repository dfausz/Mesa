import './game-board.css';
import Pawn from '../pawn/pawn';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import React from 'react';
import { setScale } from '../../store/transformSlice'
import { useDispatch, useSelector } from 'react-redux';

function GameBoard() {
  const dispatch = useDispatch();
  const disableTransform = useSelector((state) => state.transform.disableTransform)

  function onZoom(zoomInfo) {
    dispatch(setScale(zoomInfo.state.scale))
  }

  return (
    <TransformWrapper disabled={disableTransform} onZoom={onZoom}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
            <TransformComponent>
              <div className="game-board">
                <div className="grid">
                  <Pawn size="medium" />
                  <Pawn size="huge" />
                  <Pawn size="gargantuan" />
                </div>
              </div>
            </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default GameBoard;