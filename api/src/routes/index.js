const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const videogamesRoute = require('./videogames');
const genresRoute = require('./genres');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute);

module.exports = router;
