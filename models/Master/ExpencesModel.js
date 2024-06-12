const mongoose = require('mongoose')

const expencesScheme = new mongoose.Schema ({
  expenceId:{
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
  expenceType:{
    type:String,
    required:true
  },
  expenceFrom:{
    type:String,
    required:true
  },
  expenceTo:{
    type:String,
    required:true
  },
  expenceDate:{
    type:String,
    required:true
  },
  expenceAmount:{
    type:Number,
    required:true
  },
  expenceDescription:{
    type:String,
    required:true
  },
  refrenceNumber:{
    type:Number,
    required:true
  },
  billAttached:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Expences',expencesScheme)