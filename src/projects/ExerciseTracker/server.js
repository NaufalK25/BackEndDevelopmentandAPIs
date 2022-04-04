const express = require('express');
const cors = require('cors')
const { connect, model, Schema } = require('mongoose');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

connect(
    process.env.MONGO_URI,
    (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.');
        } else {
            console.log(`Error on DB connection: ${err}`);
        }
    },
);

const User = model('User', new Schema({
    username: String,
}));

const Exercise = model('Exercise', new Schema({
    username: String,
    description: String,
    duration: Number,
    date: Date,
    userId: String,
}));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/api/users/:_id/logs', async (req, res) => {
    const user = await User.findById(req.params._id);

    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;

    const exercises = await Exercise.find({ username: user.username }).limit(limit);

    res.json({
        username: user.username,
        count: exercises.length,
        _id: user._id,
        log: exercises.map(exercise => {
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: new Date(exercise.date).toDateString(),
            };
        }),
    });
});

app.post('/api/users/:_id/exercises', async (req, res) => {
    const user = await User.findById(req.params._id);

    const newExercise = new Exercise({
        username: user.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date || new Date().toISOString().split('T')[0],
        userId: req.params._id,
    });

    await newExercise.save();

    res.json({
        username: newExercise.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: new Date(newExercise.date).toDateString(),
        _id: newExercise.userId,
    });
});

app.route('/api/users')
    .get(async (req, res) => {
        const users = await User.find();

        res.send(users.map(user => {
            return {
                username: user.username,
                _id: user._id,
            };
        }));
    })
    .post(async (req, res) => {
        const newUser = new User({
            username: req.body.username,
        });

        await newUser.save();

        res.json({
            username: newUser.username,
            _id: newUser._id,
        });
    });

app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
})
