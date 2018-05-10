const mockTrailData = require('../data/mock-trail-data');

exports.getTrailData = function(req, res) {
  try {
    const trailHandle = req.params.trail;
    res.json(mockTrailData);
  } catch(e) {
    console.log("Issue arose.");
    res.status(500).send("Error")
  }
}
