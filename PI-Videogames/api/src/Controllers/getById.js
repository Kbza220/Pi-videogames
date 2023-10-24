require('dotenv').config();
const axios = require ('axios')
const {Genre,Videogame} = require('../db');
const {API_KEY} = process.env

const getById = async (req,res) =>{

    const {idVideogame} = req.params

    //verifico si es creado y busco en la db
    if((idVideogame.includes("-"))){
        let videogameDb = await Videogame.findOne({
            where:{
                id:idVideogame
            }, 
            include: Genre
        });
        //parseo
        videogameDb = JSON.stringify(videogameDb);
        videogameDb = JSON.parse(videogameDb);
        //dejo un array con los nombres de genero solamente
        videogameDb.genres = videogameDb.genres.map(g => g.name);
        res.json(videogameDb)
    }else {
        //si no es creado voy a buscarlo a la api
        try{
            const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            let {id,name, background_image, genres, description, released: releasedDate, rating, platforms} = response.data
            genres = genres.map(g => g.name);
           
            //como de la api me trae objetos con las plataformas y el genero los mapeo para utilizar solo el nombre
            platforms = platforms.map(p => p.platform.name);
            
            return  res.json({
                    id,
                    name,
                    background_image,
                    genres, 
                    description,
                    released: releasedDate, 
                    rating, 
                    platforms,
            });
            
        }catch(err){
            return res.sendStatus(500);
        };
    };
};


module.exports={getById};