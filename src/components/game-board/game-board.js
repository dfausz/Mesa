import './game-board.css';
import Pawn from '../pawn/pawn';

function GameBoard() {
  return (
    <div className="game-board">
        <div className="grid">
            <Pawn />
        </div>
    </div>
  );
}

export default GameBoard;