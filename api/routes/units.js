const router = require('express').Router()


//GET ALL
router.get('/', (req, res, next) => {
    res.json({ message: 'ok' })
})

module.exports = router