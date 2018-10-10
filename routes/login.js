const express = require('express');
const router = express.Router();

const session = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('dashboard');
  } else {
    next();
  }
};

/* GET home page. */
router.route('/')
  .get(session, (req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    var username = req.body.username,
      password = req.body.password;

    db.User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        res.redirect('/login');
      } else if (!user.validPassword(password)) {
        res.redirect('/login');
      } else {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
      }
    });
  });

module.exports = router;
