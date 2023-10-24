import React from 'react'
import '../styles/FilterNav.css'
import { connect } from 'react-redux'
import { filterBy, orderBy } from '../redux/actions/actions'


function FilterNav({filterBy, orderBy,genres}) {

    const handleCheckbox = (e) => {
        filterBy(e.target.value)
    }

    const handleCheckbox2 = (e) => {
        orderBy(e.target.value)
    }    
    
    return (
        <div className='filter-container'>           
              <div className="origin-group">
                  <label>ORIGIN:</label>
                  <br/>
                    <label>
                      <input type="checkbox" className="checkbox" onChange={handleCheckbox} name="default" value="default" />
                       ALL
                    </label>
               
                
                  <label>
                    <input type="checkbox" className="checkbox" onChange={handleCheckbox} name="DB" value="DB" />
                    CREATED
                  </label>
               
             
                   
                    <label>
                      <input type="checkbox" className="checkbox" onChange={handleCheckbox} name="API" value="API" />
                       API
                    </label>
                    <br/>
              </div>

              <div className="genre-group">
                  <label className="optionGroupLabel">GENRES:</label>
                  <br/>
                  {genres &&
                    genres.map((g) => (
                      <label key={g.name}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={handleCheckbox}
                          name={g.name}
                          value={g.name}
                        />
                         {g.name}
                      </label>
                    ))}
                     <br/>
              </div>

              <div className="checkboxGroup">
              
                  <label>
                    SORT BY:
                  </label>
                  
              </div>
              <div className="rating-group">
                  <br/>
                   <label className="optionGroupLabel">Rating:</label>
                  <br/>
                  <label>
                    <input type="checkbox" className="checkbox" onChange={handleCheckbox2} name="asc" value="asc" />
                    Highest to lowest 
                  </label>
                  <label>
                    <input type="checkbox" className="checkbox" onChange={handleCheckbox2} name="desc" value="desc" />
                    Lowest to highest
                  </label>
              </div>
            
              <div className="alphabetic">
                  <br/>
                    <label className="optionGroupLabel">Alphabetic:</label>
                  <br/>
                   <label>
                     <input type="checkbox" className="checkbox" onChange={handleCheckbox2} name="A-Z" value="A-Z" />
                      A - Z
                   </label>
                   <label>
                     <input type="checkbox" className="checkbox" onChange={handleCheckbox2} name="Z-A" value="Z-A" />
                      Z - A
                   </label>
              </div>
              

          </div>
    )
}
const mapStateToProps = (state) => {
    return {

        genres: state.genres
    }
}

export default connect(mapStateToProps, {orderBy, filterBy})(FilterNav)