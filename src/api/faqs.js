const express = require('express');
const monk = require('monk');

const db = monk(process.env.MONGO_URI || "mongodb://localhost/faqs");
const faqs = db.get('faqs');

const router = express.Router();

//Read All
router.get('/', async (req, res, next) => {
    try {
        db.then(() => console.log("Connected to MongoDB")).catch((err) =>
          console.error("Connection error:", err)
        );
        // const items = await faqs.find({});
        // res.json(items)
        // console.log(db.get('faqs').find({}))
    } catch (error) {
        next(error);
    }
});

//Read One
router.get('/:id', (req, res, next) => {
    res.json({
        message: 'Hello Read One'
    });
});

//Create One
router.post('/', (req, res, next) => {
    res.json({
        message: 'Hello Create One'
    });
});

// Update One
router.put('/:id',(req, res, next) => {
    res.json({
        message: 'Hello Update One'
    });
});

// Delete One
router.delete('/:id',(req, res, next) => {
    res.json({
        message: 'Hello Delete One'
    });
});

module.exports = router;