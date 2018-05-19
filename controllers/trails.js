const mockTrailData = require('../data/mock-trail-data');
const mockTrailSystemData = require('../data/mock-trail-system-data');
const mockRegionData = require('../data/mock-region-data');

exports.getTrailData = function(req, res) {
  try {
    const trailHandle = req.params.trail;
    res.json(mockTrailData);
  } catch(e) {
    console.log("Issue arose.");
    res.status(500).send("Error")
  }
}

exports.getTrailSystemData = function(req, res) {
  try {
    const trailSystemHandle = req.params.trailsystem;
    res.json(mockTrailSystemData);
  } catch(e) {
    console.log("Issue arose.");
    res.status(500).send("Error")
  }
}

exports.getRegionData = function(req, res) {
  try {
    res.json(mockRegionData);
  } catch(e) {
    console.log("Issue arose.");
    res.status(500).send("Error")
  }
}
