const request = require("request");

// Geocoding
// address => Let/Long -> Weather
// mapbox.com/

function geocode(address, cb) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2thaWp1biIsImEiOiJja2NubDU2NTAwYzljMnJsdTNzdGtocTloIn0.v30hdXCtOa6Fv_ejCdlhLA&limit=1`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      cb("The server is not responsible..", undefined);
    } else if (!response.body.features.length) {
      cb("Invalid incoming parameters..", undefined);
    } else {
      cb(undefined, {
        location: response.body.features[0].place_name,
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
      });
    }
  });
}

module.exports = geocode;
