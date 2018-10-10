const express = require('express');
const router = express.Router();
const iex = require('../iex.js');

/* GET users listing. */
router.get('/:symbol', function (req, res, next) {
  //res.send(req.params.symbol);
  iex.data(req.params.symbol).then((data) => {
    res.render('stock', data);
  }, (err) => {
    console.log(err);
  });
  
  
});

module.exports = router;
