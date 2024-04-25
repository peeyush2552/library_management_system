const Book = require('../models/book');
const Issue = require('../models/issue');
const Student = require('../models/student');


const getModel = (type) => {
    switch (type) {
        case 'book':
            return Book;
        case 'issue':
            return Issue;
        case 'student':
            return Student;
        default:
            throw new Error('Invalid model type specified');
    }
};
exports.viewData = async (req, res) => {
    try {
        const { type } = req.query;
        const model = getModel(type);
        const data = await model.find();
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.modifyData = async (req, res) => {
    try {
        const { type, id } = req.body;
        const model = getModel(type);
        const record = await model.findByIdAndUpdate(id, req.body.update, { new: true });
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeData = async (req, res) => {
    try {
        const { type, id } = req.params;  // URL parameters
        const model = getModel(type);
        const record = await model.findByIdAndDelete(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};