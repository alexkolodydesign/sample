const fs = require('fs');
const parser = require('xml2json');

run();

// Break Up Large KML File Into Individual Trail KML Files
function run() {
  fs.readFile( './doc.kml', (err, data) => {
    const json = parser.toJson(data, { object: true });
    const placemarks = json.kml.Document.Folder.Placemark;
    for (var i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const name = placemark.name;
      const filename = placemark.name.toLowerCase().replace(/ /g, "_");
      const trailCoordinates = String(placemark.MultiGeometry.LineString.coordinates).replace(/,0 /g, "\n").replace(/,0/g, "").split("\n");
      const coordinates = trailCoordinates.map(coordinates => {
        const mapCoordinates = coordinates.split(",");
        return {
          lng: mapCoordinates[0],
          lat: mapCoordinates[1],
        }
      })
      const trail = JSON.stringify({ name, filename, coordinates })
      fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
        console.log(`Wrote ${filename} into a new file!`)
      });
    }
   });
}
