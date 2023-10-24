import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/GameCard.css'
import Star from './assets/estrella.png'
// import GameDetail from './GameDetail';



export default function GameCard(props) {

  return (
      <div className="card">
       
        <div className="image">
         
            <img src={`${props.background_image}`} alt="Videogame" className="Img"></img>
        
        </div>
        <div className="title-game"><h2>{props.name}</h2></div>
        <div className='data'>
          <div className="infocontgenres">
            {
              <p className="">
                <strong className='genretitle'>Genres:</strong>{" "}
                <br/>
                {`${
                  typeof props.genres === "string"
                    ? props.genres
                    : props.genres.join(", ")
                }`}
              </p>
            }
          </div>
          <div className="infoRating">
            {
              <p>
                <img src={Star}/> {`${props.rating}`}
              </p>
            }
          </div>
        </div>
        <div className="btn-contain">
          {props.id && (
            <Link to={`/videogames/${props.id}`}>
              <button className='btn-info' >+ MORE INFO</button>
            </Link>
          )}
        </div>
      </div>
    );
}