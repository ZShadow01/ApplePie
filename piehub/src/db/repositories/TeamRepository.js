const { DatabaseDuplicateEntryError } = require('../../../../shared/errors');
const db = require('../db');
const TeamModel = require('../models/TeamModel');


module.exports = {
    async get(id) {
        // Get the team metadata
        const sql = `
            SELECT t.*, tm.*
            FROM teams t
            LEFT JOIN team_members tm ON t.id = tm.team_id
            WHERE t.id = ?
        `;

        const [rows] = await db.execute(sql, [ id ]);

        if (rows.length === 0) {
            // throw new TeamNotExistError(id);
            return;
        }

        console.log(rows[0]);
        // return new TeamModel();
    },

    async create(leaderId, name) {
        // Create a new team in the database
        try {
            const sql = `INSERT INTO teams (leader_id, name) VALUES (?,?)`;
    
            await db.execute(sql, [ leaderId, name ]);
        } catch (error) {
            if (error instanceof DatabaseDuplicateEntryError) {
                const entry = error.metadata.key;
                if (entry === 'leader_id') {

                } else if (entry === 'name') {
                    
                }
            }
        }
    }
};
