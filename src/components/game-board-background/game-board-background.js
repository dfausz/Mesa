import React, { useState } from 'react';
import './game-board-background.css';

function GameBoardBackground() {
  const [backgroundTranslate, setBackgroundTranslate] = useState({x: 0, y: 0});
  const [backgroundScale, setBackgroundScale] = useState(1.0);

  window.onkeydown = (event) => {
    if(event.ctrlKey && event.shiftKey) {
      scaleBackground(event);
    }
    else if(event.ctrlKey) {
      shiftBackground(event);
    }
  };

  function scaleBackground(event) {
    switch(event.key){
      case "ArrowUp":
        setBackgroundScale(backgroundScale + 0.01);
        break;
      case "ArrowLeft":
        setBackgroundScale(backgroundScale - 0.01);
        break;
      case "ArrowRight":
        setBackgroundScale(backgroundScale + 0.01);
        break;
      case "ArrowDown":
        setBackgroundScale(backgroundScale - 0.01);
        break;
    }
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
  }

  return (
    <>
        <img src={require('./clearing.jpg')} style={{transform: `scale(${backgroundScale}) translate(${backgroundTranslate.x}px,${backgroundTranslate.y}px)`}} 
                className="game-board-background" />
    </>
  );
}

export default GameBoardBackground;