const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');
let Job = require('../../models/Job');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/',
    async (req, res) => {
        try {
            const job = await Job.find().sort({ createdAt: -1 });
            res.send(job);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.get('/:id',
    auth,
    async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            if (!job) {
                return res.status(404).send('job not found');
            }
            res.send(job);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.post(
    '/',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        try {
            const newJob = new Job({
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                companyId: req.body.companyId,
                companyName: req.body.companyName,
                role: req.body.role,
                tags: req.body.tags,
                applyLink: req.body.applyLink,
            });

            const result = await newJob.save();

            res.send(result);
        } catch (err) {
            res.status(500).send({ msg: err });
        }
    }
);

router.delete('/:id',
    auth,
    async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            if (!job) {
                return res.status(404).json({ msg: 'Job not found' });
            }
            const result = await Job.findByIdAndDelete(req.params.id);
            res.send(result);
        } catch (err) {
            res.status(500).send('Server error');
        }
    });

router.put('/',
    auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
    ],
    async (req, res) => {
        try {
            const job = await Job.findById(req.body.id);
            if (!job) {
                return res.status(404).json({ msg: 'Job not found' });
            }

            job.name = req.body.name;
            job.description = req.body.description;
            job.type = req.body.type;
            job.companyId = req.body.companyId;
            job.companyName = req.body.companyName;
            job.role = req.body.role;
            job.tags = req.body.tags;
            job.applyLink = req.body.applyLink;

            await job.save();
            res.send(job);
        } catch (err) {
            res.status(500).send({ "msg": err });
        }
    });


module.exports = router;