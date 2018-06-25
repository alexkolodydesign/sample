const axios = require("axios");

const mockTrailData = require('../data/mock-trail-data');
const mockTrailSystemData = require('../data/mock-trail-system-data');
const { regions } = require('../data/regions');

exports.getTrailData = async (req, res) => {
  try {
    const trailHandle = req.params.trail;
    const { data: [trail] } = await axios.get(`http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?slug=${trailHandle}`);
    res.json(trail);
  } catch(e) {
    console.log("Issue arose.", e);
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

exports.getRegionData = async (req, res) => {
  try {
    const { data: trails } = await axios.get('http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails');
    return res.json({
      regions,
      trails
    });
  } catch(e) {
    console.log("Issue arose.");
    return res.status(500).send("Error: ", e)
  }
}

exports.getCoordinates = async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(500)
  try {
    const { data: trail } = await axios.get(url);
    return res.json({ trail });
  } catch(e) {
    console.log("Issue arose.");
    return res.status(500).send("Error: ", e)
  }
}
