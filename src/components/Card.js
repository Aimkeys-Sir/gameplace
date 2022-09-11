import { useHistory } from 'react-router'
import './card.css'
import Icon from './Icon'

export default function Card({game,gameOnclick}) {
    let history=useHistory()
    let image=game.name.toLowerCase().split(" ").join("_")
    const techs=game.technologies.split(",")
    return (
        <div className="card">
            <div>
                <h3>{game.name}</h3>
                <div className='line'>
                    <div className='dot'></div>
                    <div className='linee'></div>
                    <div className='dot'></div>
                </div>
                <p>{game.description}</p>
                <div style={{display:"flex"}}>
                    {techs.map((tech,index)=><Icon key={index} tech={tech}/>)}
                </div>
            </div>
            <div className='images'>
                <img className='hud' alt='hud' src='/pictures/hud.png' />
                <img onClick={()=>gameOnclick(game)} alt={image} className='picture' src={`/pictures/${image}.png`} />
            </div>
        </div>
    )
}