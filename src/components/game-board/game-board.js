import './game-board.css';
import Pawn from '../pawn/pawn';
import { webFrame } from 'electron';

function GameBoard() {
  function KeyDown(...all) {
    console.log(all);
  }

  return ( 
    <div className="game-board" onKeyDown={KeyDown}>
        <div className="grid">
            <Pawn size="tiny" />
            <Pawn size="huge" />
            <Pawn size="gargantuan" />
        </div>
    </div>
  );
}

export default GameBoard;