const fs = require('fs');
const parser = require('xml2json');
const axios = require('axios');

run();

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function getElevation(coords) {
    try {
      if (coords.includes("undefined")) throw "Undefined Coords";
      const coordsString = coords.map(coord => {
        const string = coord.split(",").reverse()
        return string.join(",")
      }).join("|")
      const {data: {results: elevation} } = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=${coordsString}`,
        {
          paramsSerializer: function(params) {
            var result = '';
            return result;
          }
        }
      )
      const newCoords = elevation.map( coord => {
        return {
          lat: coord.location.lat,
          lng: coord.location.lng,
          elevation: coord.elevation
        }
      })
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
    const json = parser.toJson(data, { object: true });
    const placemarks = json.kml.Document.Folder.Placemark;
    for (var i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const name = placemark.name;
      const filename = placemark.name.toLowerCase().replace(/ /g, "_") + "_" + [i];
      const trailCoordinates = String(placemark.MultiGeometry.LineString.coordinates).replace(/,0 /g, "\n").replace(/,0/g, "").split("\n");

      let coordinates
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
        const trail = JSON.stringify({ name, filename, coordinates })

        fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
          console.log(`Wrote ${filename} into a new file!`)
        });

      }

    }
   });
}
