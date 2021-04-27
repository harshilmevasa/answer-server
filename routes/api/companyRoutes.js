const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let Company = require('../../models/Company');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/',
    async (req, res) => {
        try {
            const companies = await Company.find().sort({ createdAt: -1 });
            res.send(companies);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.get('/:id', auth, 
    async (req, res) => {
        try {
            const company = await Company.findById(req.params.id);
            if (!company) {
                return res.status(404).send('company not found');
            }
            res.send(company);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.post(
    '/', auth,
    [
        check('name', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const newCompany = new Company({
                name: req.body.name,
                description: req.body.description,
                industry: req.body.industry,
                website: req.body.website,
                status: req.body.status
            });

            const result = await newCompany.save();

            res.send(result);
        } catch (err) {
            res.status(500).send({ msg: err });
        }
    }
);

router.delete('/:id', auth, 
    async (req, res) => {
        try {
            const company = await Company.findById(req.params.id);
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }
            const result = await Company.findByIdAndDelete(req.params.id);
            res.send(result);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.put('/', auth, 

    [
        check('name', 'name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const company = await Company.findById(req.body.id);
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }

            company.name = req.body.name;
            company.description = req.body.description;
            company.industry = req.body.industry;
            company.website = req.body.website;
            company.status = req.body.status;

            await company.save();
            res.send(company);
        } catch (err) {
            res.status(500).send({ "msg": err });
        }
    });

module.exports = router;