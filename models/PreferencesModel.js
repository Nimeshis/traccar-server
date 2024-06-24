// models/PreferencesModel.js
const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  activeMaps: {
    type: String,
    enum: ['LocationIQ Streets', 'LocationIQ Dark', 'OpenStreetMap', 'Open TopoMap', 'Carto Basemaps', 'Google Road', 'Google Satellite', 'Google Hybrid MapTiler Basic', 'MapTiler Hybrid Bing Maps Road Bing Maps Aerial', 'Bing Maps Hybrid', 'TomTom Basic Here Basic Here Hybrid', 'Here Satellite', 'AutoNavi', 'Ordnance Survey', 'Mapbox Streets', 'Mapbox Streets Dark', 'Mapbox Outdoors', 'Mapbox Satellite', 'Custom(XYZ)'],
    required: true,
    default: 'OpenStreetMap'
  },
  mapOverlay: {
    type: String,
    enum: ['OpenSeaMap', 'OpenRailwayMap', 'OpenWeather Clouds', 'OpenWeather Precipitation', 'OpenWeather Pressure', 'OpenWeather Wind', 'OpenWeather Temperature', 'TomTom Traffic Flow', 'TomTom Traffic Incidents', 'Here Traffic Flow', 'Custom Overlay'],
    required: true,
    default: 'OpenSeaMap'
  },
  popupInfo: {
    type: String,
    enum: ['Identifier', 'Latitude', 'Longitude', 'Speed', 'Course', 'Altitude', 'Accuracy', 'Valid', 'Protocol'],
    required: true,
    default: 'OpenStreetMap'
  },
  liveRoutes: {
    type: String,
    enum: ['Disabled', 'Selected device', 'All Devices'],
    default: 'Disabled'
  },
  showDirection: {
    type: String,
    enum: ['Disabled', 'Selected device', 'All Devices'],
    default: 'Disabled'
  },
  deviceTitle: {
    type: String,
    enum: ['Name', 'Identifier', 'Phone', 'Model', 'Contact'],
    default: 'Name'
  },
  deviceDetail: {
    type: String,
    enum: ['Name', 'Identifier', 'Phone', 'Model', 'Contact'],
    default: 'Name'
  },
  soundEvents: {
    type: String,
    enum: ['Command result', 'Status online', 'Status unknown', 'Status offline', 'Device inactive', 'Queued command sent', 'Device moving', 'Device stopped', 'Speed limit exceeded', 'Fuel drop', 'Fuel increase', 'Geofence entered', 'Geofence exited', 'Alarm', 'Ignition on', 'Ignition off', 'Maintenance required', 'Text message received', 'Driver changed', 'Media'],
    default: 'Media'
  },
  soundAlarm: {
    type: String,
    enum: ['General', 'SOS', 'Vibration', 'Movement', 'Low Speed', 'Overspeed', 'Fall Down', 'Low Power', 'Low Battery', 'Fault', 'Power Off', 'Power On', 'Door', 'Lock Unlock', 'Geofence', 'Geofence Enter', 'Geofence Exit', 'GPS Antenna Cut', 'Accident'],
    default: 'General'
  },
  expiration: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Preferences', preferencesSchema);
