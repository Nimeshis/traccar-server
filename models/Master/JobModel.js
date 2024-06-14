const mongoose = require('mongoose')

const jobScheme = new mongoose.Schema ({
    jobId:{
        type: Number,
        unique:true
    },
    jobName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    noOfCheckpoint:{
        type:Number,
        required:true
    },
    noOfSchedule:{
        type:Number,
        required:true
    },
    scheduleType:{
        type:String,
        required:true
    },
    validFrom:{
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
    jobEndTime:{
        type:String,
        required:true
    },
    jobStatus:{
        type:String,
        required:true
    },
    jobStartTime:{  
        type:String,
        required:true
    },
    tripType:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    jobDate:{
        type:String,
        required:true
    },
    assign:{
        type:String,
        required:true
    },
    document:{
        type:String,
        required:true
    },
    alert:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Job',jobScheme)