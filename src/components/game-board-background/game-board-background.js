import React, { useState } from 'react';
import './game-board-background.css';

function GameBoardBackground() {
  let initialTranslate = {x: 0, y: 0};
  let initialScale = 1.0;

  if(hasState()){
    let state = getState();
    initialTranslate = state.translate;
    initialScale = state.scale;
  }

  const [backgroundTranslate, setBackgroundTranslate] = useState(initialTranslate);
  const [backgroundScale, setBackgroundScale] = useState(initialScale);
  
  window.onkeydown = (event) => {
    if(event.ctrlKey && event.shiftKey) {
      scaleBackground(event);
    }
    else if(event.ctrlKey) {
      shiftBackground(event);
    }
  };

  function hasState() {
    return localStorage.getItem('game-board') != null;
  }

  function getState() {
    return JSON.parse(localStorage.getItem('game-board'));
  }
  
  function saveState() {
    localStorage.setItem('game-board', JSON.stringify({translate: backgroundTranslate, scale: backgroundScale}))
  }

  function scaleBackground(event) {
    switch(event.key){
      case "ArrowRight":
      case "ArrowUp":
        setBackgroundScale(backgroundScale + 0.01);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        setBackgroundScale(backgroundScale - 0.01);
    }

    saveState();
  }

  function shiftBackground(event) {
    switch(event.key){
      case "ArrowUp":
        setBackgroundTranslate({x: backgroundTranslate.x, y: backgroundTranslate.y - 1});
        break;
      case "ArrowLeft":
        setBackgroundTranslate({x: backgroundTranslate.x - 1, y: backgroundTranslate.y});
        break;
      case "ArrowRight":
        setBackgroundTranslate({x: backgroundTranslate.x + 1, y: backgroundTranslate.y});
        break;
      case "ArrowDown":
        setBackgroundTranslate({x: backgroundTranslate.x, y: backgroundTranslate.y + 1});
        break;
    }

    saveState();
  }

  return (
    <img src={require('./clearing.jpg')} 
          style={{transform: `scale(${backgroundScale}) translate(${backgroundTranslate.x}px,${backgroundTranslate.y}px)`}} 
          className="game-board-background" />
  );
}

export default GameBoardBackground;