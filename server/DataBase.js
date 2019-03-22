const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const uuid = require('uuid');

const DataBase = module.exports = {
    init: () => {
        console.log(db.has('phones')
            .value())
        // Set some defaults (required if your JSON file is empty)
        db.defaults({ phones: [
                {
                    id: uuid(),
                    phone: 'Samsung Galaxy S9',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Samsung Galaxy S8',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Samsung Galaxy S7',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Motorola Nexus 6',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'LG Nexus 5X',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Huawei Honor 7X',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Apple iPhone X',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Apple iPhone 8',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Apple iPhone 4s',
                    status: false,
                    date: null,
                    bookedBy: null
                },
                {
                    id: uuid(),
                    phone: 'Nokia 3310',
                    status: false,
                    date: null,
                    bookedBy: null
                }
            ], count: 0 })
            .write();
        // Increment count
        db.update('count', n => n + 1)
            .write();
    },

    addData: (data) => {
        // Add a post
        db.get('phones')
            .push({ id: uuid(), ...data})
            .write()
    },

    updateData: (condition, data) => {
        return db.get('phones')
            .find(condition)
            .assign(data)
            .write()
    },

    getAllData: () => db.get('phones').value(),

};