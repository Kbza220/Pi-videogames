import {React, useState} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {searchByName}  from '../redux/actions/actions';

import '../styles/SearchBar.css';



function SearchBar({searchByName}) {
    
   
    const [input, setInput] = useState({
        buscar: ''
    })
   
    const handleInputChange = function(e) {
        
          setInput({
          [e.target.name]: e.target.value
        });
    }
    

    const handleOnClick = () => {
       
        searchByName(input.buscar)
        setInput({
            buscar: ''
        });
    }

    return (
        <div className='header'>
            <div className='searchBar'>
                <input
                    className='search'
                    name="buscar"
                    placeholder="Search your game here..."
                    onChange={handleInputChange}
                    value={input.buscar}
                    autoComplete="off"
                />
                <button className="btnsearch" onClick={handleOnClick} ><img src='Search-icon.png'/></button>            
            </div>

            <div className='buttons'>
               
               <NavLink to='/about'>               
                <button className='btnNav'>ABOUT</button>
               </NavLink>
               <NavLink to='/addgames'>
                    <button className='btnNav'>ADD GAMES</button>
                </NavLink>             
                <NavLink to='/videogames'>
                    <button className='btnNav'>HOME</button>
                </NavLink>
            </div>
            
        </div>

      
    );
}

export default connect(null, { searchByName})(SearchBar)
