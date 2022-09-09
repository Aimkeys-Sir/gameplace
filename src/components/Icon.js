export default function Icon({ tech }) {
    return (
        <div className="the-icon">
            <div className="line-dot">
                <div className="dot2"></div>
                <div className="line2"></div>
                <div className="dot2"></div>
            </div>
            <div className='icons-div'>
                <img className='hud-small' src='/pictures/hud_small.png' alt='hud_small' />
                <div className='wrappers'>
                    <img src={`/icons/${tech}.png`} alt={tech} className='icons' />
                </div>
            </div>
            <div className="line-dot last">
                <div className="dot2"></div>
                <div className="line2"></div>
                <div className="dot2"></div>
            </div>
        </div>

    )
}