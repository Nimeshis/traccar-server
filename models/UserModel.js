const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true // Allows this field to be unique but also optional
    },
    name: String,
    email: String,
    phone: String,
    readonly: Boolean,
    administrator: Boolean,
    map: String,
    latitude: Number,
    longitude: Number,
    zoom: Number,
    password: String,
    twelveHourFormat: Boolean,
    coordinateFormat: String,
    disabled: Boolean,
    expirationTime: Date,
    deviceLimit: Number,
    userLimit: Number,
    deviceReadonly: Boolean,
    limitCommands: Boolean,
    fixedEmail: Boolean,
    poiLayer: String,
    attributes: {
        type: Object,
        default: {}
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;