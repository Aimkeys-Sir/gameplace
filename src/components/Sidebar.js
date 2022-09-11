import { useState } from "react"
import './sidebar.css'

export default function Sidebar({user}) {
    const [showbar,setShowbar]=useState(true)
    return (
        <div className="sidebar">
        {/* {!showbar?<button onClick={()=>setShowbar(true)}><img src="/icons/chev-right.png" alt="right carret" /></button>:null} */}
            {showbar?<div className="hide">
                <div>
                    <img className="profile" src="/pictures/profile.png" alt="prof pic" />
                    <img id="profile-hud" src="/pictures/hud.png"/>
                </div>
                <button>{user.callsign || user.first_name} {user.last_name}</button>
            </div>:null}
            {/* {showbar?<button onClick={()=>setShowbar(false)}><img src="/icons/chev-left.png" alt="left carret" /></button>:null} */}
        </div>

    )
}