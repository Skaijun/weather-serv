const request = require("request");

function forecast(lat, long, cb) {
  const url = `http://api.weatherstack.com/current?access_key=dbf31ed0bc9f0914bf1c5331798b47e2&query=${lat},${long}&units=m`;

  request({ url, json: true }, (err, response) => {
    if (err) {
      cb("The server is not responsible..", undefined);
    } else if (response.body.err) {
      cb("Invalid incoming parameters..", undefined);
    } else {
      cb(undefined, {
        // location: response.body.location.name,
        temperature: response.body.current.temperature,
      });
    }
  });
}

module.exports = forecast;
