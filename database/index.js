const faker = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/soundcloud', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

let userSchema = mongoose.Schema({
  id: Number,
  handle: String,
  name: String,
  image_url: String,
  track_count: Number,
  follower_count: Number,
  join_date: Date
});

let User = mongoose.model('User', userSchema);
let users = [];

// for (var i=1; i<101; i++) {
// var id = i;
// var handle = faker.name.findName();
// var name = faker.name.findName();
// var image_url = 'https://unsplash.it/120/120/?random' ;
// var track_count = faker.random.number(50);
// var follower_count = faker.random.number(2000);
// var join_date = faker.date.past(10, '2020-01-01');
// var user = {id, handle, name, image_url, track_count, follower_count, join_date};
// console.log(user);
// users.push(user);
// }

// User.insertMany(users);

let getUserById = (ID, callback) => {
  User.findOne({id: ID}).exec(callback);
}

let getUserByName = (username, callback) => {
  User.findOne({name: username}).exec(callback);
}

let getAllUsers = (callback) => {
  User.find({}).exec(callback);
}

let decrementFollowers = (username, callback) => {
  User.findOneAndUpdate({name: username}, { $inc: {follower_count: -1}}).exec(callback);
}

let incrementFollowers = (username, callback) => {
  User.findOneAndUpdate({name: username}, { $inc: {follower_count: 1}}).exec(callback);
}

module.exports.getUserById = getUserById;
module.exports.decrementFollowers = decrementFollowers;
module.exports.incrementFollowers = incrementFollowers;
module.exports.getAllUsers = getAllUsers;
