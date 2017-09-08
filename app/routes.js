const Todo = require('./todoModle.js');
const express = require('express');
const app = express();

app.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err)
            console.log('Error Error you fukced up!!');
        res.json(todos);
    });
});


app.post('/todos', (req, res) => {
    Todo.create({
        title: req.query.title,
        complete: false
    }, (err, todos) => {
        if (err)
            console.log('ERrror');
        Todo.find((err, todos) => {
            if (err)
                console.log('yoooo');
            res.json(todos);
        });
    })
});

