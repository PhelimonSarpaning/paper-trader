const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:symbol', function(req, res, next) {
    //res.send(req.params.symbol);
  res.render('stock', {symbol: req.params.symbol});
});

module.exports = router;
