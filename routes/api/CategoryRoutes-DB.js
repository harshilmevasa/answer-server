const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
let Category = require('../../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.send(category);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send('task not found');
        }
        res.send(category);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post(
    '/', auth,
    [
        check('Categoryname', 'title is required').not().isEmpty()
       
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const newCategory = new Category({
                Categoryname: req.body.Categoryname,
            });


            const result = await newCategory.save();

            res.send(result);
        } catch (err) {
            res.status(500).send('Server error');
        }
    }
);



router.delete('/', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.body.id);
        if (!category) {
            return res.status(404).json({ msg: 'id not found' });
        }
        const result = await Category.findByIdAndDelete(req.body.id);
        res.send(result);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.put('/', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.body.id);
        if (!category) {
            return res.status(404).json({ msg: 'Id not found' });
        }

        category.Categoryname = req.body.Categoryname;
        
        await category.save();
        res.send(category);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;