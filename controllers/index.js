const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;