import {React, useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../redux/actions/actions'
// import Navbar from '../NavBar/NavBar'
// import photo from '../../img/created.jpg'
import { NavLink, useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import '../styles/GameDetail.css'
import Star from './assets/estrella.png'


function GameDetail(props) {
    console.log("este",props)
    const params = useParams();
    const {getVideogameDetail} = props
    let gameDetails = props.gameDetails;
    const idVideogame = params.idVideogame;
    // me carga los details del juego
    useEffect(() => {
        getVideogameDetail(idVideogame);
    },[idVideogame])

    return (
      <div className="container">
        
        <SearchBar />
        <div className="detail-container">
          <div className="img-container">
            {gameDetails.background_image ? (
              <img src={gameDetails.background_image}/>
            ) : (
              <img alt="Juegardo" />
            )}
             <NavLink to="/videogames">
                      <button className='btn'>Back</button>
             </NavLink>
          </div>
          

          {gameDetails ? (
            <div className="data-container">
                <div className='primero'>
                  <h3 className="title">{gameDetails.name}</h3>
                  <p>
                    <img src={Star}/> {`${gameDetails.rating}`}
                  </p>
                </div> 

                {gameDetails.description &&
                gameDetails.genres &&
                gameDetails.platforms ?(
                  <div className="detail">
                    {
                      <p >
                        {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                      </p>
                    }
                    
                 <div className='primero'>
                    {
                      <p className='genres'>
                        <strong className='titles'>Genres:</strong>{" "}
                        {`${gameDetails.genres.join(", ")}`}
                      </p>
                    }
                    
                  
                    {
                      <p>
                        <strong className='titles'>Release Date:</strong>{" "}
                        {`${gameDetails.released || "None"}`}
                      </p>
                    }
                  </div>
                    {
                      <p className='platforms'>
                        <strong className='titles'>Platforms:</strong>{" "}
                        {`${
                          typeof gameDetails.platforms === "string"
                            ? gameDetails.platforms
                            : gameDetails.platforms.join(", ")
                        }`}
                      </p>
                    }
                   
                  </div>
                ) : (
                  <h1>Cargando</h1>
                )}
            </div>
          ) : (
            <h1>Cargando</h1>
          )}
        </div>
      </div>
    );
}

const mapStateToProps = (state) => {
    return {
        gameDetails: state.gameDetails
    }
}


export default connect(mapStateToProps, {getVideogameDetail}) (GameDetail)
