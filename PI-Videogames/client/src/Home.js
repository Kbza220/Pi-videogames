import './styles/Home.css';
import React, {useState, useEffect}from "react";
import { getAll, getGenres } from "./redux/actions/actions";
import {connect} from 'react-redux';
import Pagination from './components/Pagination'

import SearchBar from './components/SearchBar';
import GameCard from './components/GameCard'
import FilterNav from './components/FilterNav';

function Home ({allGames, getAll, getGenres }){
   
    //indice paginacion 
    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage] = useState(15)
    
    let currentCards; 

    //* indices de la paginación:
    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;


    if(typeof allGames === 'string'){
        currentCards = allGames
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard) //uso los indices para "fraccionar que juegos muestro"
    }
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
 

    useEffect (() => {       
        getAll()
        getGenres()
    }, [])

    return(
        <div className="container">
            <SearchBar />
            <div className="pagination-bar">
                <Pagination
                    cardPerPage={cardPerPage}
                    totalCards={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />

            </div>

            <div className="content-container">
                <FilterNav/>
                <div className="game-cards">
                    {currentCards.length >= 1 ? (
                        currentCards.map((g) => (
                        <GameCard
                            key={g.id}
                            name={g.name}
                            rating={g.rating}
                            genres={g.genres}
                            background_image={g.background_image}
                            id={g.id}
                        />
                        ))
                    ) : typeof currentCards === "string" ? (
                        <div>
                        <h3>not found</h3>
                        </div>
                    ) : (
                        <div className='container-loader'>
                        <span class="loader">LOADING...</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="pagination-bar">
                <Pagination
                    cardPerPage={cardPerPage}
                    totalCards={allGames.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />

            </div>
        </div>
    );
   
}
const mapStateToProps = (state) => {
    return {
        allGames: state.filtered
    }
}

export default connect(mapStateToProps,{ getAll, getGenres }) (Home)
