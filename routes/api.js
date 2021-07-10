const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });

    res.send('Received a workout')
});

router.get("/workouts", (req, res) => {
    Workout.find({})
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/workouts/:id", ({ params, body }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {
            $push: {
                exercises: body,

            },
        },
        {
            new: true,
            runValidators: true
        }
    )
        .then(Workout => {
            res.json(Workout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;
