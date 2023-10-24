import React,{useState} from "react"
import axios from "axios";
import SearchBar from "./components/SearchBar";
import './styles/SubmitGame.css'


function SubmitGames (props){
   
    const [errors, setErrors] = useState({ form: 'Must complete the form' });

    const [form, setForm] = useState({
        name: '',
        description: '',
        released: '',
        rating: 0,
        background_image: null,
        genres: [],
        platforms: []
    });

    const handleChange = e => {
        if (e.target.parentNode.parentNode.parentNode.id === 'genres') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.concat(e.target.value)

                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    genres: form.genres.filter(x => e.target.value !== x)
                }))
            }
        }
        if (e.target.parentNode.parentNode.parentNode.id === 'platforms') {
            if (e.target.checked) {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.concat(e.target.name)
                }))
            } else {
                setForm(prevState => ({
                    ...prevState,
                    platforms: form.platforms.filter(x => e.target.name !== x)
                }))
            }
        }
        if (e.target.type !== 'checkbox') {
            setForm(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
        }

        if(e.target.type === "file") {
            setForm(prevState => ({
                ...prevState,
                background_image: e.target.value
            }));

            console.log('is changin');
        }
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    const validate = form => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Game Name is required';
        } else if (form.name.length < 4) {
            errors.name = 'Game Name must have at least 4 characters';
        }
        if (!form.description) {
            errors.description = 'Description is required';
        } else if (form.description.length < 8) {
            errors.description = 'Description must have at least 8 characters'
        }
        if (!form.rating) {
            errors.rating = 'Rating is required';
        } else if (!/^[1-5]$/.test(form.rating)) {
            errors.rating = 'Rating must be between 1 and 5';
        }
        return errors;
    }

    const handleSubmit = e => {
        e.preventDefault()
        validate(form);
        let checkboxsErrors = []
        if (form.genres.length < 1) checkboxsErrors.push('Genres is required');
        if (form.platforms.length < 1) checkboxsErrors.push('Platforms is required');
        if (Object.values(errors).length || checkboxsErrors.length) { // Object.values --> retorno un array con los values
            return alert(Object.values(errors).concat(checkboxsErrors).join('\n'));
        }
        axios.post('http://localhost:3001/videogames', form)
                  .then(res => console.log(res.data));
        alert(`${form.name} Creado Correctamente`)
       
    }


    return (
        <div className="container">
        <SearchBar/>
            <div class="game-container">
                <div class="game-form-container">
                    <h2>Create Game - Details</h2>
                    <div class="game-form">
                        <form class="game-details-form" onSubmit={handleSubmit} onChange={handleChange}>
                            <div className="form-content">
                                <div class="form-inputs">
                                    <div class="form-input">
                                        <label for="name">Name:</label>
                                        <input class="input-name" placeholder="Name" type="text" id="name" name="name" autoComplete="off" />
                                    </div>
                                    <div class="form-input">
                                        <label for="released"><strong>Release Date:</strong></label>
                                        <input name="released" class="input-date" type="date" id="released" required />
                                    </div>
                                    <div class="form-input">
                                        <label for="rating"><strong>Rating:</strong></label>
                                        <input name="rating" class="input-rating" placeholder="Rate from 1 to 5" type="tel" id="rating" maxLength="1" autoComplete="off" />
                                    </div>
                                    <div class="form-input">
                                        <label for="background_image"><strong>Image:</strong></label>
                                        <input name="background_image" class="input-image" placeholder="URL of the image" type="text" id="background_image" autoComplete="off" />
                                    </div>
                                    <div class="form-input">
                                        <label for="description"><strong>Description:</strong></label>
                                        <textarea class="input-description" name="description" placeholder="Description..." id="description" cols="30" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="genre-platform-container">
                                    <div  id="genres" class="genre-container">
                                        <label className="genres-title"><strong>Genres:</strong></label>

                                        <div class="checkbox-group">
                                            <div>
                                                <input name='Action' value='1' type="checkbox" id="Action" />
                                                <label htmlFor="Action">Action.</label>
                                            </div>
                                            <div>
                                                <input name='Indie' value='2' type="checkbox" id="Indie" />
                                                <label htmlFor="Indie">Indie.</label>
                                            </div>
                                            <div >
                                                <input name='Adventure' value='3' type="checkbox" id="Adventure" />
                                                <label htmlFor="Adventure">Adventure.</label>
                                            </div>
                                            <div>
                                                <input name='RPG' value='4' type="checkbox" id="RPG" />
                                                <label htmlFor="RPG">RPG.</label>
                                            </div>
                                            <div>
                                                <input name='Strategy' value='5' type="checkbox" id="Strategy" />
                                                <label htmlFor="Strategy">Strategy.</label>
                                            </div>

                                                <input name='Shooter' value='6' type="checkbox" id="Shooter" />
                                                <label htmlFor="Shooter">Shooter.</label>

                                            <div>
                                                <input name='Casual' value='7' type="checkbox" id="Casual" />
                                                <label htmlFor="Casual">Casual.</label>
                                            </div>
                                            <div>
                                                <input name='Simulation' value='8' type="checkbox" id="Simulation" />
                                                <label htmlFor="Simulation">Simulation.</label>
                                            </div>
                                            <div>
                                                <input name='Puzzle' value='9' type="checkbox" id="Puzzle" />
                                                <label htmlFor="Puzzle">Puzzle.</label>
                                            </div>
                                            <div>
                                                <input name='Arcade' value='10' type="checkbox" id="Arcade" />
                                                <label htmlFor="Arcade">Arcade.</label>
                                            </div>
                                            <div>
                                                <input name='Platformer' value='11' type="checkbox" id="Platformer" />
                                                <label htmlFor="Platformer">Platformer.</label>
                                            </div>
                                            <div>
                                                <input name='Massively-Multiplayer' value='12' type="checkbox" id="Massively-Multiplayer" />
                                                <label htmlFor="Massively-Multiplayer">Massively-Multiplayer.</label>
                                            </div>
                                            <div>
                                                <input name='Racing' value='13' type="checkbox" id="Racing" />
                                                <label htmlFor="Racing">Racing.</label>
                                            </div>

                                            <div>
                                                <input name='Sports' value='14' type="checkbox" id="Sports" />
                                                <label htmlFor="Sports">Sports.</label>
                                            </div>
                                            <div>
                                                <input name='Fighting' value='15' type="checkbox" id="Fighting" />
                                                <label htmlFor="Fighting">Fighting.</label>
                                            </div>
                                            <div>
                                                <input name='Family' value='16' type="checkbox" id="Family" />
                                                <label htmlFor="Family">Family.</label>
                                            </div>
                                            <div>
                                                <input name='Boad Games' value='17' type="checkbox" id="Boad Games" />
                                                <label htmlFor="Boad Games">Boad Games.</label>
                                            </div>
                                            <div>
                                                <input name='Educational' value='18' type="checkbox" id="Educational" />
                                                <label htmlFor="Educational">Educational.</label>
                                            </div>
                                            <div>
                                                <input name='Card' value='19' type="checkbox" id="Card" />
                                                <label htmlFor="Card">Card.</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="platforms" class="platform-container">
                                        <label className="platform-title"><strong>Platforms:</strong></label>
                                        <div class="checkbox-group">
                                                <div>
                                                    <input name='PC' type="checkbox" id="PC" />
                                                    <label htmlFor="PC">PC.</label>
                                                </div>
                                                <div>
                                                    <input name='iOS' type="checkbox" id="iOS" />
                                                    <label htmlFor="iOS">iOS.</label>
                                                </div>
                                                <div>
                                                    <input name='Android' type="checkbox" id="Android" />
                                                    <label htmlFor="Android">Android.</label>
                                                </div>
                                                <div>
                                                    <input name='macOS' type="checkbox" id="macOS" />
                                                    <label htmlFor="macOS">macOS.</label>
                                                </div>
                                                <div>
                                                    <input name='PlayStation 4' type="checkbox" id="PlayStation 4" />
                                                    <label htmlFor="PlayStation 4">PlayStation 4.</label>
                                                </div>
                                                <div>
                                                    <input name='PlayStation 5' type="checkbox" id="PlayStation 5" />
                                                    <label htmlFor="PlayStation 5">PlayStation 5.</label>
                                                </div>
                                                <div>
                                                    <input name='XBOX' type="checkbox" id="XBOX" />
                                                    <label htmlFor="XBOX">XBOX.</label>
                                                </div>
                                                <div>
                                                    <input name='PS Vita' type="checkbox" id="PS Vita" />
                                                    <label htmlFor="PS Vita">PS Vita.</label>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="create-button" type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmitGames