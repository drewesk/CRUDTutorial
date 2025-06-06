const express = require('express');
const monk = require('monk');

const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI || "mongodb://localhost/faqs");
const faqs = db.get('faqs');

const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    question: Joi.string().trim().required(),
    video_url: Joi.string().uri()
});

const router = express.Router();

//Read All
router.get('/', async (req, res, next) => {
    try {
        // ChatGPT Troubleshooting
        // db.then(() => console.log("Connected to MongoDB")).catch((err) =>
        //   console.error("Connection error:", err)
        // );
        const items = await faqs.find({});
        res.json(items)
        console.log(db.get('faqs').find({}));
    } catch (error) {
        next(error);
    }
});

//Read One
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id
        });
        (!item) ? next() : res.json(item);
    } catch (error) {
        next(error);
    }
});

//Create One
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

// Update One
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await faqs.findOne({
            _id: id
        });
        if (!item) return next();
        const updated = await faqs.update({
            _id: id
        }, {
            $set: value
        });
        res.json(value);
    } catch (error) {
        next(error);
    }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await faqs.remove({
            _id: id
        });
        res.status(200).send('Success, deleted');
    } catch (error) {
        next(error);
    }
});

module.exports = router;