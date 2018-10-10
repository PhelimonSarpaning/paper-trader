const express = require('express');
const router = express.Router();


const session = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render('index', { loggedin: true });
  } else {
    next();
  }
};

// route for Home-Page
router.get('/', session, (req, res) => {
  res.render('index', { loggedin: false });
});

module.exports = router;
