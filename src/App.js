import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div>
      <div className="header">
        <header className="title">GOMOKU</header>
        <div className="credit">by 19120384</div>
      </div>
      <Game />
    </div>
  );
}

export default App;
