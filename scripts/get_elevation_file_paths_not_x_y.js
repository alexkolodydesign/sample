const fs = require('fs');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function run() {
      fs.readFile( "Rest_of_Split_Missing_Broken/BarrelRollTrailUpdated.json", async (err, data) => {
console.log("data: ", data);
        //const json = JSON.parse(data)
//const paths = json.features.geometry.paths;
//console.log("Paths; ", paths);
	});
}


function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}
