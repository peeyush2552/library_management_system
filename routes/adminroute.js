const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const Issue = require('../models/issue');
const Student = require('../models/student');

const { isAdmin } = require('../middleware/auth');

router.get('/view/:type', isAdmin, async (req, res) => {
    try {
        let data;
        switch(req.params.type) {
            case 'books':
                data = await Book.find();
                break;
            case 'issues':
                data = await Issue.find();
                break;
            case 'students':
                data = await Student.find();
                break;
            default:
                return res.status(400).send('Invalid type specified');
        }
        res.json(data);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/modify/:type/:id', isAdmin, async (req, res) => {
    const { type, id } = req.params;
    const updates = req.body;

    try {
        let model;
        switch(type) {
            case 'books':
                model = Book;
                break;
            case 'issues':
                model = Issue;
                break;
            case 'students':
                model = Student;
                break;
            default:
                return res.status(400).send('Invalid type specified');
        }
        const updatedRecord = await model.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedRecord);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.delete('/remove/:type/:id', isAdmin, async (req, res) => {
    const { type, id } = req.params;

    try {
        let model;
        switch(type) {
            case 'books':
                model = Book;
                break;
            case 'issues':
                model = Issue;
                break;
            case 'students':
                model = Student;
                break;
            default:
                return res.status(400).send('Invalid type specified');
        }
        await model.findByIdAndRemove(id);
        res.send('Record deleted successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;