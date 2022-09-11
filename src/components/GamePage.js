import './gamepage.css'
import Icon from './Icon'


import { useEffect, useState } from 'react'


export default function GamePage({ game, player }) {
    const [activeShop, setActiveShop] = useState(game.gameshops[0])
    const [ticket, setTicket] = useState({ game_shop_id: activeShop.id, time: "", amount: 1, game_id: game.id, player_id: player.id })

    const [ticketsBought, setTicketsBought] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [emptyError, setEmptyError] = useState(false)

    function fetchTickets() {
        fetch(`http://localhost:9292/players?id=${player.id}`)
            .then(r => r.json())
            .then(setTicketsBought)
            .catch(console.log)
    }
    useEffect(fetchTickets, [])
    console.log(ticketsBought);
    console.log(ticket);
    let image = game.name.toLowerCase().split(" ").join("_")

    function handleInputChange(e) {
        setTicket(ticket => ({ ...ticket, [e.target.name]: e.target.value }))
        if (e.target.name === 'time') {
            setEmptyError(false)
        }
    }
    function handleOptionsClick(shop) {
        setActiveShop(shop)
        setShowOptions(false)
        setTicket(ticket => ({ ...ticket, game_shop_id: shop.id }))
    }
    function onCheckOut(e) {
        e.preventDefault()
        if (!ticket.time) {
            setEmptyError(true)
        }
        else {
            console.log(ticket)
            //post
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ticket)
            }
            fetch('http://localhost:9292/ticket', options)
                .then(() => fetchTickets())
            setTicket({ game_shop_id: activeShop.id, time: "", amount: 1, game_id: game.id, player_id: player.id })
        }
    }

    return (
        <div className='game-page'>
            <div className='bar'>
                <div style={{ position: "relative" }}>
                    <img className="profile-small" src="/pictures/profile.png" alt="prof pic" />
                    <img id="profile-hud-small" src="/pictures/hud.png" />
                </div>
                <h2>{game.name}</h2>
                <div>
                    <img id='logo-small' alt='logo' src='/pictures/logo.png' />
                </div>
            </div>
            <div className='contents-div'>
                <div className='about'>
                    <h3>Catch Phrase</h3>
                    <div className='line'>
                        <div className='dot'></div>
                        <div className='linee'></div>
                        <div className='dot'></div>
                    </div>
                    <p>{game.description}</p>
                    <h3>Technologies {'&'} props</h3>
                    <div className='icons-div'>
                        {game.technologies.split(",").map((tech, index) => (
                            <div>
                                <Icon tech={tech} key={index} />
                                <p>{(tech[0].toUpperCase() + tech.slice(1)).split("_").join(" ")}</p>
                            </div>

                        ))}
                    </div>
                </div>
                <div>
                    <div style={{ backgroundImage: "url('/pictures/hud.png')" }} className="hud-div">
                        <img className="pictures" src={`/pictures/${image}.png`} alt="" />
                    </div>
                    <div className='price'>
                        <h3>Play time:</h3>
                        <h3>{game.play_time} minutes</h3>
                    </div>
                    <div className='price'>
                        <h3>Teams:</h3>
                        <h3>max of {game.teams} </h3>
                    </div>
                    <div className='price'>
                        <h3>Price </h3>
                        <h3> Ksh {game.price}</h3>
                    </div>
                </div>
                <div className='details'>

                    <h2>Buy Tickets</h2>

                    <div>
                        <form className='buy-form'>
                            <label>Choose a Game Shop</label>
                            <div onClick={() => setShowOptions(show => !show)} className='shop-items active-item'>
                                <p>{activeShop.name} </p>
                                <em>{activeShop.location}</em>
                            </div>
                            {showOptions ? <div className='options-div'>
                                {game.gameshops.map((shop, index) => (
                                    <div onClick={() => { handleOptionsClick(shop) }} className={`shop-items ${index % 2 === 0 ? "" : "odd"}`} key={index}>
                                        <p>{shop.name} </p>
                                        <em>{shop.location}</em>
                                    </div>
                                ))}

                            </div> : null}
                            <label>Choose a date</label>
                            <input name='time' onChange={handleInputChange} value={ticket.date} type={"date"} />
                            <input name='amount' min={'1'} onChange={handleInputChange} value={ticket.amount} type={"number"} />
                            <label>Total {Math.round(ticket.amount * game.price * 0.95 ** ticket.amount)}</label>
                            <button onClick={onCheckOut}>Checkout</button>
                        </form>
                        <div>
                            {emptyError ? <p className='error'>Please choose a date!</p> : null}
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Gameplace</th>
                                        <th>Tickets</th>
                                        <th>Time</th>
                                        <th>Amount Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticketsBought.filter(ticketB => ticketB.game_id === game.id)
                                        .map((ticketB, index) => {
                                            let theShop = game.gameshops.find(shop => shop.id === ticketB.game_shop_id)
                                            return (<tr>
                                                <td>{theShop.name}</td>
                                                <td>{ticketB.amount}</td>
                                                <td>{ticketB.play_time.slice(0, 10)}</td>
                                                <td>{Math.round(ticketB.amount * game.price * 0.95 ** ticketB.amount)}</td>
                                            </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}