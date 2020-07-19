const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Def. path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/weather", (req, res) => {
  const adress = req.query.address;

  if (!adress) {
    return res.send({
      error: "The weather address have to be defined..",
    });
  }

  geocode(adress, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        err: err,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        location,
        temperature: forecastData.temperature + " °C",
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "can not find the requested page",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "invalid page input",
  });
});

app.listen(port, () => {
  console.log("the server is running.. Port# " + port);
});
