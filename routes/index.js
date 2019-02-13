require('dotenv').config()
var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'WeatherApp' });
});

router.post('/data', (req, res, next) => {
  var city = req.body.city;
  var unit = req.body.units;
  console.log(typeof unit);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  if (unit === '1') {
    url = url + `&units=metric`;
  }
  else {
    url = url
  }
  axios.get(url)
    .then((response) => {
      res.send(response.data.main);
    })
    .catch((err) => {

      if (err.request) {
        res.status(404).send('Something went wrong with Request!');
      }
      else if (err.response) {
        console.log(err.response);
        res.status(404).send('Something went wrong with response!');
      }
      else {
        res.status(404).send(err.message)
      }

    })
})

module.exports = router;
