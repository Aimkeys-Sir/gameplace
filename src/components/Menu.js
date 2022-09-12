import { useState } from "react"

export default function Menu({ user }) {
    const [expand, setExpand] = useState(false)
    const [active, setActive] = useState("home")


    const menuItems = ["home", "tags", "wallet", "vr", "prof"]

    function handleButtonClick(item) {
        setActive(item)
        if (item === "home") {
            setExpand(false)
        } else {
            setExpand(true)
        }
    }
    console.log(user);
    let stars = []
    let i = 0
    while (i < Math.ceil(user.level / 2)) {
        stars.push(i)
        i++
    }
    function Tags({ user }) {
        return (
            <div>
                <h3>{user.callsign[0].toUpperCase()}{user.callsign.slice(1)}</h3>
                {stars.map((star, index) => <img className="icon" src="/icons/star.png" alt="star" key={index} />)}
                <div>
                    <h3>Level: {user.level}</h3>
                </div>
            </div>
        )
    }
    function Wallet() {
        const [showform,setShowForm]=useState(false)
        const [credits,setCredits]=useState(100)
        function handleDeposit(){
            setShowForm(true)
        }
        function handleDepositsubmit(e){
            e.preventDefault()
            alert(`Do you want to deposit Ksh. ${credits}`)
            //Add credits and patch
        }
        return (
            <div>
                <h3>Credits {user.credits}</h3>
                <h3>1000</h3>
                <button className="menu-b" onClick={handleDeposit}>deposit</button>
                {showform?<form onSubmit={handleDepositsubmit} style={{position:"relative"}}>
                    <input onChange={(e)=>setCredits(e.target.value)} style={{border:"none"}} type={"number"} value={credits} min={"0"}/>
                    <button style={{background:"transparent",width:"30px",position:"absolute",left:"10px",top:"2px"}} className="menu-b"><img src="/icons/checkmark.png" /></button>
                </form>:null}
            </div>
        )
    }

    function MyGames(){
        return (
            <div>
                <h3>My Games</h3>
                {user.games.map((game,index)=>{
                    return <h4>{game.name}</h4>
                })}
            </div>
        )
    }
    function Profile(){
        const [newDetails,setNewDetails]=useState({first_name:user.first_name,last_name:user.last_name,callsign:user.callsign})

        function handleDetailsChange(e){
            setNewDetails(details=>({...details,[e.target.name]:e.target.value}))
        }
        return (
            <div>
                <h3>Edit Profile</h3>
                <form>
                    <input name="callsign" value={newDetails.callsign}/>
                    <input name="first_name" value={newDetails.first_name}/>
                    <input name="last_name" value={newDetails.last_name}/>
                </form>
            </div>
        )
    }

    return (
        <div className="menu">
            <div className="items">
                {menuItems.map((item, index) => {
                    return <button key={index} className={item === active ? " active-button" : "menu-button"} onClick={() => handleButtonClick(item)}><img alt="" src={`/icons/${item}.png`} /></button>
                })}
            </div>

            {expand ? <div className="expand">
                <Profile/>
            </div> : null}
        </div>
    )
}