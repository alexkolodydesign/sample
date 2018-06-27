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

exports.getElevation = async (req, res) => {
  // Locations query needs to be structured for Google Maps Elevation API
  const locations = req.query.locations.replace(/%7C/g, "|").replace(/\|,/g, "|").replace(/.$/,"")
  try {
    const {data: {results: elevations} } = await axios.get(
      'https://maps.googleapis.com/maps/api/elevation/json',
      {
        params: {
          locations: locations,
          key: 'AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ'
        }
      }
    )
    return res.status(200).json({elevations})
  } catch(e) {
    console.log("Issue arose.", e);
    return res.status(500).send("Error:")
  }
}
