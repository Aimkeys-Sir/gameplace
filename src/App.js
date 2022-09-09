import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Sidebar from './components/Sidebar';

function App() {
  const [games, setGames] = useState([])
  useEffect((() => {
    try {
      fetch('http://localhost:9292/games')
        .then(r => r.json())
        .then(setGames)
    } catch { }

  }), [])
  console.log(games)
  return (
    <div className="App">
      <div className='side'>
        <Sidebar/>
      </div>
      <div className='cards'>
        <Logo/>
        {games.map((game, index) => {
          return (<Card game={game} key={index} image={'/pictures/dragon.jpg'} />)
        })}
      </div>


    </div>
  );
}

export default App;
