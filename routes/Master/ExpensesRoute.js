const express = require('express');
const router = express.Router();
const Expense = require('../../models/Master/ExpensesModel');
const CounterModel = require('../../models/CounterModel'); // Assuming you have a counter model for generating unique IDs
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expence not found' });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new expense
router.post('/', async (req, res) => {
  try {
    let expenseCounter = await CounterModel.findOneAndUpdate(
      { _id: 'expenseId' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const newExpenseData = {
      expenseId: expenseCounter.sequence_value,
      vehicle: req.body.vehicle,
      category: req.body.category,
      expenseType: req.body.expenseType,
      expenseFrom: req.body.expenseFrom,
      expenseTo: req.body.expenseTo,
      expenseDate: req.body.expenseDate,
      expenseAmount: req.body.expenseAmount,
      expenseDescription: req.body.expenseDescription,
      referenceNumber: req.body.referenceNumber,
      billAttached: req.body.billAttached
    };

    const newExpense = new Expense(newExpenseData);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an expense by ID
router.put('/:id', async (req, res) => {
  try {
    let expense = await Expense.findOne({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expence not found' });
    }

    expense.vehicle = req.body.vehicle || expense.vehicle;
    expense.category = req.body.category || expense.category;
    expense.expenseType = req.body.expenseType || expense.expenseType;
    expense.expenseFrom = req.body.expenseFrom || expense.expenseFrom;
    expense.expenseTo = req.body.expenseTo || expense.expenseTo;
    expense.expenseDate = req.body.expenseDate || expense.expenseDate;
    expense.expenseAmount = req.body.expenseAmount || expense.expenseAmount;
    expense.expenseDescription = req.body.expenseDescription || expenseDescription.expenceDescription;
    expense.referenceNumber = req.body.referenceNumber || expense.referenceNumber;
    expense.billAttached = req.body.billAttached || expense.billAttached;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.deleteOne({ expenseId: req.params.id });
    res.json({ message: 'Expence deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE all expenses
router.delete('/', async (req, res) => {
  try {
    await Expense.deleteMany({});
    res.json({ message: 'All expenses deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
