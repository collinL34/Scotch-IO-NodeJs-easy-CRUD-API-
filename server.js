const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db = require('./app/db.js');
mongoose.connect(db.db);
const Todo = require('./app/todoModel.js');

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App Successful listening on port 3000');
});

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
            console.log('Error');
        Todo.find((err, todos) => {
            if (err)
                console.log('Error');
            res.json(todos);
        });
    })
});


app.delete('/todos/:id', (req, res) => {
    Todo.remove({
        _id: req.params.id
    }, (err, todos) => {
        if (err)
            console.log('Error');
        Todo.find((err, todos) => {
            if (err)
                console.log('Error');
            res.json(todos);
        });
    });
});