const mongoose = require('mongoose')

const tripScheme = new mongoose.Schema ({
    tripId:{
        type: Number,
        unique:true
    },
    tripStartTime:{  
        type:Date,
        required:true
    },
    tripEndTime:{
        type:Date,
        required:true
    },
    tripLocation:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true
    },
    tripDuration:{
        type:Number,
        required:true
    },
    driver:{
        type:String,
        required:true
    },
    fuelConsumed:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    modifiedby:{
        type:String,
        // required:true
    },
    modifyDate:{
        type: String,
        default: function () {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const day = currentDate.getDate();
          return `${year}-${month < 10 ? "0" : ""}${month}-${
            day < 10 ? "0" : ""
          }${day}`;
        },
      },
      note:{
        type:String,
        required:true
      }
    
})

module.exports = mongoose.model('Trip',tripScheme)