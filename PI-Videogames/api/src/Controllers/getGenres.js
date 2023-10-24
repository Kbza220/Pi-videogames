require('dotenv').config();
const axios = require ('axios')
const {Genre} = require('../db')
const {API_KEY} = process.env


async function getGenres (req,res){
     try{ 

        //si lo tengo en la base de datos los consumo de ahi.
        const genresDb= await Genre.findAll()
        if(genresDb.length !== 0) return res.json(genresDb)
        

        // si no lo voy a buscar a la api.

        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = response.data.results; // recibo un array de obj, con los juegos filtrados por genero
        //los guardo en la DB
        genres.forEach( async genre => {
            await Genre.findOrCreate({
            where:{
                name: genre.name, 
            }
         });
        });

        //envio al front la informacion necesaria 
        const genresREADY = genres.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.json(genresREADY)

    }catch(err){
        return res.status(500).json(error.message)
        

    }




}

module.exports={getGenres}