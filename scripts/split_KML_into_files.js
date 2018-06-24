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
      const name = placemark.name.toLowerCase().replace(/ /g, "_")
      fs.writeFile(`./trails/${name}.json`, JSON.stringify(placemark), 'utf8', () => {
        console.log(`Wrote ${name} into a new file!`)
      });
    }
   });
}
