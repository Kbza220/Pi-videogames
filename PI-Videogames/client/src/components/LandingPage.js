import {Link} from 'react-router-dom'
import '../styles/LandingPage.css'

export default function LandingPage(){
    return(

        <div className='container-landing'>

            <Link to='/videogames'>
                <button className='btn'>PRESS TO START</button>
            </Link>
        </div>




    )





}