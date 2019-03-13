var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', function(req, res) {
  var desc = req.body.desc.replace(/\n/g, "<br>")
  res.render('ville', {ville: req.body.nom_ville, description: desc})
})

module.exports = router;
