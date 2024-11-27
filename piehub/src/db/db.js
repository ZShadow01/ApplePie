const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');
const DatabaseDuplicateEntryError = require('../../../shared/errors/database/DatabaseDuplicateEntryError');
const { DatabaseError } = require('../../../shared/errors');

require('dotenv').config();


class DatabasePool {
    constructor() {
        this.pool = mysql2.createPool({
            host: process.env.APPLE_PIE_HOST,
            user: process.env.APPLE_PIE_DB_USER,
            password: process.env.APPLE_PIE_DB_PASSWORD,
            database: process.env.APPLE_PIE_DB,
            bigNumberStrings: true,
            supportBigNumbers: true
        }).promise();
    }

    async initialize() {
        const playersTable = this.getSchema('players');
        const teamsTable = this.getSchema('teams');
        const teamMembersTable = this.getSchema('team_members');

        await this.execute(playersTable);
        await this.execute(teamsTable);
        await this.execute(teamMembersTable);
    }

    getSchema(table) {
        const schemaFile = path.join(__dirname, 'schemas', `${table}.sql`);
        
        if (!fs.existsSync(schemaFile)) {
            throw new Error(`Schema file for table "${table}" not found`);
        }
        
        return fs.readFileSync(schemaFile, 'utf-8');
    }

    async execute(sql, values) {
        try {
            return await this.pool.execute(sql, values);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                const match = error.sqlMessage.match(/for key '(.+?)'/);

                throw new DatabaseDuplicateEntryError(match[1]);
            }

            console.error(error);
            throw new DatabaseError({ originalError: error });
        }
    }

    async close() {
        await this.pool.end(() => {
            console.log('Database connection closed');
        });
    }
};


module.exports = new DatabasePool();
