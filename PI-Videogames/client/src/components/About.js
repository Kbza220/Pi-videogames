import React from 'react'
import Aboutimg from './assets/Aboutimg.png'
import SearchBar from '../components/SearchBar';
import '../styles/About.css'

function About (){
    return(
        <div className="container">
            <SearchBar/>
            <div className='about'>
            
                <div>
                <img src={Aboutimg}></img>
                </div>          
            </div>
        </div>
    )
}
export default About;