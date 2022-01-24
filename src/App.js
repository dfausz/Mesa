import './App.css';
import GameBoard from './components/game-board/game-board';
import MenuBar from './components/menu-bar/menu-bar';

function App() {
  return (
    <div className="App">
      <MenuBar />
      <GameBoard />
    </div>
  );
}

export default App;
