const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(process.env.MLAB);
const Car = require('./app/carModel.js');

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('listening on port 3000');
});

app.get('/cars', (req, res) => {
    Car.find((err, cars) => {
        if (err)
            console.log(handleError(err));
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
            console.log(handleError(err));
        Car.find((err, cars) => {
            if (err)
                console.log(handleError(err));
            res.json(cars);
        });
    });
});

app.put('/cars/:id', (req, res) => {
    Car.findById(req.params.id, (err, car) => {
        car.update(req.query, (err, cars) => {
            if (err)
                console.log(handleError(err));
            Car.find((err, cars) => {
                if (err)
                    console.log(handleError(err));
                res.json(cars);
            });
        });
    });
});

app.delete('/cars/:id', (req, res) => {
    Car.remove({
        _id: req.params.id
    }, (err, cars) => {
        if (err)
            console.log(handleError(err));
        Car.find((err, cars) => {
            if (err)
                console.log(handleError(err));
            res.json(cars);
        });
    });
});