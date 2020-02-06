const express = require('express');
const app =express();
const port = 4000;
const db = require('../database/index.js');

app.use(express.static('client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/getUserById', (req, res) => {
  console.log('This is the req.body: ', req.body);
  db.getUserById(req.body.userId, (err, results) =>{
    if (err) {
      console.log('this is the err from getUserById: ', err);
    }
    res.send(results);
  })
})

app.get('/getUserByName', (req, res) => {
  console.log('This is the req.body: ', req.body);
  db.getUserByName(req.body.username, (err, results) =>{
    if (err) {
      console.log('this is the err from getUserByName: ', err);
    }
    res.send(results);
  })
})

app.get('/users', (req,res) => {
  console.log('GET users has been activated');
  db.getAllUsers((err, results) => {
    if (err) {
      console.log('this is the err from getAllUsers: ', err);
    }
    res.send(results);
  })
})

app.patch('/decrementFollowers', (req,res) => {
  console.log('This is the decrementFollowers PATCH req.body: ', req.body);
  db.decrementFollowers( req.body.username, (err, results) =>{
    if (err) {
      console.log('this is the err from decrementFollowers: ', err);
    }
    res.sendStatus(200);
  })
})

app.patch('/incrementFollowers', (req,res) => {
  console.log('This is the incrementFollowers PATCH req.body: ', req.body);
  db.incrementFollowers( req.body.username, (err, results) =>{
    if (err) {
      console.log('this is the err from incrementFollowers: ', err);
    }
    res.sendStatus(200);
  })
})


app.listen(port, () =>{console.log(`Server is running on ${port}`)});