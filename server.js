const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let app = express();
const DB_URL = "mongodb://127.0.0.1:27017/test";
const MoviesModel = require('./Schema/Movie.schema')

var db = mongoose.connection;
app.use(express.json())
app.use(cors())

const connect = () => {
    return mongoose.connect(DB_URL);
}

app.get('/movies', async (req, res) => {
    let movies = await MoviesModel.find({});
    res.status(200).json(movies)
})

app.get('/movies/:id', async (req, res) => {
    let movie = await MoviesModel.findById(req.params.id);
    res.status(200).json(movie)
})

app.post('/movies', async (req, res) => {
    let movie = req.body;
    const addedMovie = await MoviesModel.create(movie);
    res.status(200).json(addedMovie);
})

app.patch('/movies/:id', async (req, res) => {
    let updatedMovie = await MoviesModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', async (req, res) => {
    let deletedMovie = await MoviesModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedMovie)
})
db.on('error', console.error.bind(console, "MongoDB connection error"))

app.listen(8000, async () => {
    try{
        await connect();
        console.log("listing...");
    }catch(e){
        console.log(e.message)
    }
    
})
