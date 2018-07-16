const axios = require("axios");

const mockTrailData = require('../data/mock-trail-data');
const mockTrailSystemData = require('../data/mock-trail-system-data');
const { regions } = require('../data/regions');

exports.getTrailData = async (req, res) => {
  try {
    const trailHandle = req.params.trail;
    if (!trailHandle) {
      res.statusMessage = "Missing Trail Handle"
      res.status(422)
    }
    const { data: [trail] } = await axios.get(`http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?slug=${trailHandle}`);
    res.status(200).json(trail);
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
  // TODO: Requests can become too large for the Google Elevation API, maybe add the elevation information into the node script that builds the json files so we don't have to make additional requests to google elevation api.
  const locations = req.query.locations.replace(/%7C/g, "|").replace(/\|,/g, "|").replace(/.$/,"")
  try {
    const {data: {results: elevations} } = await axios.get(
      `https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=${locations}`,
      {
        paramsSerializer: function(params) {
          var result = '';
          return result;
        }
      }
    )
    return res.status(200).json({elevations})
  } catch(e) {
    console.log("Issue arose.", e);
    return res.status(500).send("Error:")
  }
}
