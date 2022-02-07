import React, { useState } from 'react';
import './game-board-background.css';
import BackgroundWrapper from './background-wrapper';
import BackgroundModel from './background-model';

function GameBoardBackground() {
  let background = JSON.parse(localStorage.getItem('current-background')) ?? new BackgroundModel();
  const [backgroundTranslate, setBackgroundTranslate] = useState(background.translate);
  const [backgroundScale, setBackgroundScale] = useState(background.scale);
  const [imageSource, setImageSource] = useState(background.image);
  
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
      case "ArrowRight":
      case "ArrowUp":
        setBackgroundScale(backgroundScale + 0.01);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        setBackgroundScale(backgroundScale - 0.01);
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
    <BackgroundWrapper setBackground={setImageSource} scale={{get: backgroundScale, set: setBackgroundScale}} 
                       translate={{get: backgroundTranslate, set: setBackgroundTranslate}}>
      <img src={imageSource} 
            style={{transform: `scale(${backgroundScale}) translate(${backgroundTranslate.x}px,${backgroundTranslate.y}px)`}} 
            className="game-board-background" />
    </BackgroundWrapper>
  );
}

export default GameBoardBackground;