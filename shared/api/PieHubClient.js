require('dotenv').config();


module.exports = {
    async request(path, options = {}) {
        const res = await fetch(path, options);
        const json = await res.json();
        
        if (res.success) {
            return json.data;
        }

        return { code: json.code, metadata: json.metadata };
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
