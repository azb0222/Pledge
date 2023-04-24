module.exports = {
    get: async length => {
        return new Promise(async (resolve, reject) => {
            require('crypto').randomBytes(length, (err, buffer) => resolve(buffer.toString('hex')));
        })
    }
}