const mongoose = require('mongoose')

const announcementScheme = new mongoose.Schema ({
    AnnouncementId:{
        type: Number,
        unique:true
    },
   subject:{
    type:String,
    required:true
    },
    announcementDate:{
        type:String,
        required:true
    },
    announcementTime:{
        type:String,
        required:true
    },
    announcementVia:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    schedule:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }


   
    
})

module.exports = mongoose.model('Announcement',announcementScheme)