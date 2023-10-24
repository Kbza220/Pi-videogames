require('dotenv').config();
const axios = require ('axios')
const {API_KEY} = process.env
const {Genre,Videogame} = require('../db');

const getAll = async(req,res)=>{
    let videogamebd = await Videogame.findAll({
        include: [{
            model: Genre,
            as: 'genres',
            attributes: ['name'],
            through:{attributes:[]}
        }],
    })

    //limpio el arreglo de genre dejando solamente los nombres de cada genero

    videogamebd = videogamebd.map(videogame => ({
        ...videogame.toJSON(),
        genres: videogame.genres.map(genre  => genre.name)
    }));


    try{
        let pages = 0
        let results = [...videogamebd]
        let response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        while (pages<6) {
            pages++;

            //tomo solo lo que necesito enviar al front
            const gamesToFront = response.data.results.map(game => {
                return{
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name)
                }
            });
            results = [...results, ...gamesToFront]
            response = await axios.get(response.data.next)//vuelvo a llamar a la api        
            
        };
        return res.json(results)

    }catch(err){
        console.log("Error fetching from external API: ", err)
        res.sendStatus(500)
    };
};

module.exports={getAll}
