const { PlayerNotRegisteredError, PlayerNotFoundError, DatabaseDuplicateEntryError, PlayerAlreadyRegisteredError, PlayerNameTakenError } = require('../../../../shared/errors');
const db = require('../db');
const PlayerModel = require('../models/PlayerModel');


module.exports = {
    async get(id) {
        const sql = 'SELECT * FROM players WHERE id = ?';

        const [rows] = await db.execute(sql, [ id ]);

        if (rows.length === 0) {
            throw new PlayerNotRegisteredError(id);
        }

        return new PlayerModel(rows[0]);  // Return PlayerModel
    },

    async search(name) {
        const sql = 'SELECT * FROM players WHERE name = ?';

        const [rows] = await db.execute(sql, [ name ]);

        if (rows.length === 0) {
            throw new PlayerNotFoundError(name);
        }

        return new PlayerModel(rows[0]);
    },

    async create(id, name) {
        try {
            const sql = 'INSERT INTO players (id, name) VALUES (?, ?)';
    
            await db.execute(sql, [ id, name ]);
        } catch (error) {
            if (error instanceof DatabaseDuplicateEntryError) {
                const entry = error.metadata.key;
                if (entry === 'PRIMARY') {
                    throw new PlayerAlreadyRegisteredError(id);
                } else if (entry === 'name') {
                    throw new PlayerNameTakenError(name);
                } else {
                    console.error(error);
                }
            }

            throw error;
        }
    }
};
