import './card.css'
import Icon from './Icon'

export default function Card({game}) {
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
                <p>Tame your dragon and ride him wherever you wish. Imagine a land where people are afraid of dragons. It is a reasonable fear: dragons possess a number of qualities that make being afraid of them a very commendable response.</p>
                <div style={{display:"flex"}}>
                    {techs.map((tech,index)=><Icon key={index} tech={tech}/>)}
                </div>
            </div>
            <div className='images'>
                <img className='hud' alt='hud' src='/pictures/hud.png' />
                <img alt={image} className='picture' src={`/pictures/${image}.png`} />
            </div>
        </div>
    )
}