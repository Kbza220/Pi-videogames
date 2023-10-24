const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getGenres} = require('../Controllers/getGenres')
const {getByName} = require('../Controllers/getByName')
const { getAll } = require('../Controllers/getAll');
const { getById } = require('../Controllers/GetbyId');
const { postGames } = require('../Controllers/postGames');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames',getAll);
router.get('/genres', getGenres);
router.get('/videogames/name', getByName);
router.get('/videogames/:idVideogame', getById);
router.post('/videogames', postGames);


module.exports = router;
