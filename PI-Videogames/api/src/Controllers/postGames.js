// const {Videogame,Genres} = require("../models/Videogame");
const { Videogame,Genre } = require("../db.js");

const postGames = async (req, res) => {
    
    let {name, description, released, rating, background_image, genres, platforms} = req.body 
      
    platforms = platforms.join(',');
    
    try{
        const gameCreated = await Videogame.findOrCreate({
            where:{
                name,
                description, 
                released,
                rating,
                background_image,
                platforms,
            }
        });

         await gameCreated[0].setGenres(genres);
         return res.send('Created succesfully :)')
    }catch(err){
        return "res.sendStatus(500)";
    }

};
module.exports={postGames};