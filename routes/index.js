var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', function(req, res) {
  axios.get("https://geocode.xyz/" + req.body.nom_ville + "?json=1&auth=218622879073471220010x1964")
    .then(function (response) {
      var long = response.data.longt;
      var lat = response.data.latt;
      console.log("Longitude: " + long + "\n");
      console.log("Latitude: " + lat + "\n");
      res.render('ville', {ville: req.body.nom_ville, description: req.body.desc, longitude: long, latitude: lat})
    })
    .catch(function (error) {
      console.log("Error: " + error + "\n\n\n");
    });
});

module.exports = router;
