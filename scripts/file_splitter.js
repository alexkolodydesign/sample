const fs = require('fs');
const parser = require('xml2json');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function getElevation(coords) {
  try {
    // If coords are messed up don't make request to Google
    if (coords.includes("undefined")) throw "Undefined Coords";
    // Parsed KML file had lat and lng backwards
    const coordsString = coords.map(coord => {
      const string = coord.split(",").reverse()
      return string.join(",")
    }).join("|")
    // Send request to Google Elevation API (520 location max)
    const {data: {results: elevation} } = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=${coordsString}`,
      {
        paramsSerializer: function(params) {
          var result = '';
          return result;
        }
      }
    )
    // Create new array of objects with lat, lng, and elevation
    const newCoords = elevation.map( coord => {
      return {
        lat: coord.location.lat,
        lng: coord.location.lng,
        elevation: coord.elevation
      }
    })
    // Timeout to make sure we don't go over the 100 requests per second requirement for Google's Elevation API
    await timeout(100);
    return newCoords
  } catch(e) {
    // console.log("Issues getting elevation: ", e)
    return null
  }
}


// Break Up Large KML File Into Individual Trail KML Files
async function run() {
  fs.readFile( './ashcreek.kml', async (err, data) => {
    // Parse the giant KML file and grab the placemarks (trails)
    const json = parser.toJson(data, { object: true });
    const placemark = json.kml.Document.Folder.Placemark;
    const name = placemark.name;
    const filename = placemark.name.toLowerCase().replace(/ /g, "_");
    let multipleLines = false
    let coordinates;
    // If MultiGeometry is an array
    if (Array.isArray(placemark.MultiGeometry.LineString)) {
      multipleLines = true
      coordinates = []
      for (var k = 0; k < placemark.MultiGeometry.LineString.length; k++) {
        const trailCoordinates = String(placemark.MultiGeometry.LineString[k].coordinates).replace(/,0 /g, "\n").replace(/,0/g, "").split("\n");
        const coordinatesLine = await getTrailCoordinates(trailCoordinates)
        coordinates.push(coordinatesLine)
      }
    }
    else {
      const trailCoordinates = String(placemark.MultiGeometry.LineString.coordinates).replace(/,0 /g, "\n").replace(/,0/g, "").split("\n");
      coordinates = await getTrailCoordinates(trailCoordinates)
    }

    // Create final trail variable to store
    const trail = JSON.stringify({ name, filename, coordinates, multipleLines })
    // Write trail file
    fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
      console.log(`Wrote ${filename} into a new file!`)
    });

   });
}


async function getTrailCoordinates(trailCoordinates) {
  if (trailCoordinates) {
    let coordinates
    const fragment = await getElevation(trailCoordinates.slice(1,200)) || []
    const fragment2 = await getElevation(trailCoordinates.slice(201,300)) || []
    const fragment3 = await getElevation(trailCoordinates.slice(301,400)) || []
    const fragment4 = await getElevation(trailCoordinates.slice(401,500)) || []
    const fragment5 = await getElevation(trailCoordinates.slice(501,600)) || []
    const fragment6 = await getElevation(trailCoordinates.slice(601,700)) || []
    const fragment7 = await getElevation(trailCoordinates.slice(701,800)) || []
    const fragment8 = await getElevation(trailCoordinates.slice(801,900)) || []
    const fragment9 = await getElevation(trailCoordinates.slice(901,1000)) || []
    const fragment10 = await getElevation(trailCoordinates.slice(1001,1100)) || []
    coordinates = [
      ...fragment,
      ...fragment2,
      ...fragment3,
      ...fragment4,
      ...fragment5,
      ...fragment6,
      ...fragment7,
      ...fragment8,
      ...fragment9,
      ...fragment10
    ]
    await timeout(100);
    return coordinates
  } else {
    return null
  }
}
