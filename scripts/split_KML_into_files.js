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
  fs.readFile( './doc.kml', async (err, data) => {
    // Parse the giant KML file and grab the placemarks (trails)
    const json = parser.toJson(data, { object: true });
    const placemarks = json.kml.Document.Folder.Placemark;
    // Loop through trails getting it's name, coordinates, and making elevation requests
    for (var i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const name = placemark.name;
      const filename = placemark.name.toLowerCase().replace(/ /g, "_") + "_" + [i];
      const trailCoordinates = String(placemark.MultiGeometry.LineString.coordinates).replace(/,0 /g, "\n").replace(/,0/g, "").split("\n");
      let coordinates
      // If the trail has coordinates and they have less than 500 points then just send a single elevation request
      // Else break these requests into multiple calls and return a new array for coordinates (TODO: Dynamically make calls based on array length)
      if (trailCoordinates) {
        if (trailCoordinates.length < 500) {
          coordinates = await getElevation(trailCoordinates)
        }
        else {
          const fragment = await getElevation(trailCoordinates.slice(1,200)) || []
          const fragment2 = await getElevation(trailCoordinates.slice(201,400)) || []
          const fragment3 = await getElevation(trailCoordinates.slice(401,600)) || []
          const fragment4 = await getElevation(trailCoordinates.slice(601,800)) || []
          const fragment5 = await getElevation(trailCoordinates.slice(801,1000)) || []
          coordinates = [
            ...fragment,
            ...fragment2,
            ...fragment3,
            ...fragment4,
            ...fragment5
          ]
        }
        // Create final trail variable to store
        const trail = JSON.stringify({ name, filename, coordinates })
        // Write trail file
        fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
          console.log(`Wrote ${filename} into a new file!`)
        });

      }

    }
   });
}
