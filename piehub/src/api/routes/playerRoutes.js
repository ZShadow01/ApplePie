const express = require('express');
const PlayerRepository = require('../../db/repositories/PlayerRepository');

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        await PlayerRepository.create(req.body.id, req.body.name);
        
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, code: error.code, metadata: error.metadata });
    }
});


router.get('/search/:name', async (req, res) => {
    try {
        const player = await PlayerRepository.search(req.params.name);
        
        res.json({ success: true, player });
    } catch (error) {
        res.json({ success: false, code: error.code, metadata: error.metadata });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const player = await PlayerRepository.get(req.params.id);
        
        res.json({ success: true, player });
    } catch (error) {
        res.json({ success: false, code: error.code, metadata: error.metadata });
    }
});


module.exports = router;
