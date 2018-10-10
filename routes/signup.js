const express = require('express');
const router = express.Router();


const session = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('dashboard');
  } else {
    next();
  }
};

// route for user signup

router.route('/')
  .get(session, (req, res) => {
    res.render('signup');
  })
  .post((req, res) => {
    console.log(req.body);
    db.User.findOne({ where: { [db.Sequelize.Op.or]: [{ username: req.body.username }, { email: req.body.email }] } }).then((user) => {
      if (user != null) {
        res.redirect('/');
      }
      else {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }).then((user) => {
          req.session.user = user.dataValues;
          res.redirect('/dashboard');
        }, (error) => {
          console.log(error + 'error');
          res.redirect('/signup');
        });
      }
    });
  }
  );

module.exports = router;
