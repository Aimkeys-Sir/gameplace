import './sidebar.css'

export default function Sidebar({ user }) {
    return (
        <div className="sidebar">
            {<div className="hide">
                <div>
                    <img className="profile" src="/pictures/profile.png" alt="prof pic" />
                    <img alt='' id="profile-hud" src="/pictures/hud.png" />
                </div>
                <button>{user.callsign || user.first_name} </button>
            </div>}

        </div>

    )
}