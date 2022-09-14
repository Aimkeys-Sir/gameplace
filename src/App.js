import './App.css';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import Logo from './components/Logo';
import Sidebar from './components/Sidebar';
import { Route, Switch, useHistory } from 'react-router';
import Login from './components/Login';
import GamePage from './components/GamePage';
import Menu from './components/Menu';


function App() {
  const [games, setGames] = useState([])
  const [activeGame,setActiveGame]=useState({id:""})
  const [user,setUser]=useState({})


  const history=useHistory()

  useEffect((() => {
    try {
      fetch('http://localhost:9292/games')
        .then(r => r.json())
        .then(setGames)
    } catch { }
  }), [])

  function handleUserLogin(player){
    setUser(player)
  }
  function handleGameOnclick(game){
   setActiveGame(active=>({...active,...game}))
  }
  
  useEffect(()=>{
    history.push(`/${activeGame.id}`)
  },[activeGame,history])
  console.log(games)
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Login getUser={handleUserLogin}/>
        </Route>
        <Route path={'/home'}>
          <div className='side'>
            <Sidebar user={user}/>
            <Menu setUser={setUser} user={user}/>
          </div>
          
          <div className='cards'>
            <Logo />
            {games.map((game, index) => {
              return (<Card gameOnclick={handleGameOnclick} game={game} key={index} image={'/pictures/dragon.jpg'} />)
            })}
          </div>
        </Route>
        <Route path={`/${activeGame.id}`}>
          <GamePage setUser={setUser} player={user} game={activeGame}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
