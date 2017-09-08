const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const db = require('./app/db.js');
mongoose.connect(db.db);
const Car = require('./app/carModel.js');

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App Successful listening on port 3000');
});

app.get('/cars', (req, res) => {
    Car.find((err, cars) => {
        if (err)
            console.log('Error Error you fukced up!!');
        res.json(cars);
    });
});

app.post('/cars', (req, res) => {
    Car.create({
        make: req.query.make,
        model: req.query.model,
        year: req.query.year
    }, (err, cars) => {
        if (err)
            console.log('Error');
        Car.find((err, cars) => {
            if (err)
                console.log('Error');
            res.json(cars);
        });
    })
});

app.put('/cars/:id', (req, res) => {
    Car.update(req.params.id, req.query, (err, cars) => {
        if (err)
            console.log(err);
        Car.find((err, cars) => {
            if (err)
                console.log(err);
            res.json(cars);
        });
    });
})




app.delete('/cars/:id', (req, res) => {
    Car.remove({
        _id: req.params.id
    }, (err, cars) => {
        if (err)
            console.log('Error');
        Car.find((err, cars) => {
            if (err)
                console.log('Error');
            res.json(cars);
        });
    });
});