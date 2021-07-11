const express = require("express");
const router = express.Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(({ message }) => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ params, body }, res) => {
    Workout.findOneAndUpdate(
        { _id: params.id },
        { $push: { exercises: body } },
        { new: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ _id: -1 }).limit(7)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;