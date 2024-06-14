const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema ({
  expenseId:{
    type:Number,
    unique: true
  },
  vehicle:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  expenseType:{
    type:String,
    required:true
  },
  expenseFrom:{
    type:Date,
    required:true
  },
  expenseTo:{
    type:Date,
    required:true
  },
  expenseDate:{
    type:Date,
    required:true
  },
  expenseAmount:{
    type:Number,
    required:true
  },
  expenseDescription:{
    type:String,
    required:true
  },
  referenceNumber:{
    type:Number,
    required:true
  },
  billAttached:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Expenses',expensesSchema)