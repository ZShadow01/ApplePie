const { BaseError } = require('../errors');

require('dotenv').config();


const rootPath = `${process.env.PIEHUB_HOST}:${process.env.PIEHUB_PORT}/api`;


module.exports = {
    async request(path, options = { method: 'GET' }) {
        const res = await fetch(rootPath + path, options);
        const json = await res.json();

        if (json.success) {
            return json.data;
        }

        throw new BaseError('An error occurred while making the API request', json.code, json.metadata);
    },

    async get(path) {
        return await this.request(path);
    },

    async post(path, body) {
        return await this.request(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    },

    async delete(path) {
        return await this.request(path, {
            method: 'DELETE',
        });
    }
};
