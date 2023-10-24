require('dotenv').config();
const axios = require ('axios')
const { Op } = require("sequelize");
const {Genre,Videogame} = require('../db');
const {API_KEY} = process.env




const getByName = async(req,res)=>{
        const name = req.query.name.toLowerCase();
        
        // // Busco en la bd si tengo juegos y los traigo
        let videogamebd = await Videogame.findAll({
            where: {
                name: {[Op.iLike] : `%${name}%`}
            },
            include: [{
                model: Genre,
                as: 'genres',
                attributes: ['name'],
                through:{attributes:[]}
            }],
            
        });

        //Parseo
       
        // //limpio el arreglo de genre dejando solamente los nombres de cada genero
        videogamebd = videogamebd.map(videogame => ({
            ...videogame.toJSON(),
            genres: videogame.genres.map(genre  => genre.name)
        }));
        
        try{

            //busco el juego en la api
            let response = await axios.get (`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`)
            if(!response.data.count) return res.status(204).json(`Juego no encontrado "${req.query.name}"`)
            
            //envio lo necesario al front
            const gamesFront = response.data.results.map(game =>{
                return{
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name)

                }
            });
            //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
            const filterGameBd = videogamebd.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            //priorizo la bd, sumo todo y corto en 15 el array
            const results = [...filterGameBd, ...gamesFront.splice(0,15)];
            return res.json(results);
        
        }catch(err){
            
            res.sendStatus(500)
        }

        //si no entro por query voy a buscar todos lo juegos a la api

    
}
module.exports= {getByName}