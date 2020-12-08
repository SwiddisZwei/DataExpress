const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster.hcukc.mongodb.net/dexpr');

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
});

let User = mongoose.model('user_collection', userSchema);
