const fs = require('fs');
const path = require('path');

module.exports = {
    /**
     * 
     * @param {{name: string}} user 
     */
    insertOne(user) {
        return new Promise ((resolve, reject) => {
            this.find().then(data => {
                let users = data;
                users.push(user);
                fs.writeFile(path.resolve('data', 'users.json'), JSON.stringify(users), err => {
                    if(err) {
                        reject(err);
                    }
                    resolve(true);
                });
            }).catch(err => {
                reject(err);
            });
        });
    },
    find() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve('data', 'users.json'), {encoding: 'utf8'}, (err, data) => {
                if(err) {
                    reject(err);
                }
                Boolean(data) ? resolve(JSON.parse(data)) : resolve([]);
            });
        });
    }
}