import './App.css';
import GameBoard from './components/game-board/game-board';
import MenuBar from './components/menu-bar/menu-bar';
import BackgroundsDialog from './components/backgrounds-dialog/backgrounds-dialog';
import NewPawnDialog from './components/new-pawn-dialog/new-pawn-dialog';

function Dialogs() {
  return (
    <>
      <BackgroundsDialog />
      <NewPawnDialog />
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Dialogs />
      <MenuBar />
      <GameBoard />
    </div>
  );
}

export default App;
