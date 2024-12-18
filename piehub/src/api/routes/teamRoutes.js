const express = require('express');
const TeamRepository = require('../../db/repositories/TeamRepository');


const router = express.Router();


router.post('/create', async (req, res) => {
    try {
        await TeamRepository.create(req.body.leaderId, req.body.name);

        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, code: error.code, metadata: error.metadata });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const team = await TeamRepository.get(req.params.id);

        res.json({ success: true, team });
    } catch (error) {
        res.json({ success: false, code: error.code, metadata: error.metadata });
    }
});


module.exports = router;
