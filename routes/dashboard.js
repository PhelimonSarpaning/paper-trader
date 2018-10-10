const express = require('express');
const router = express.Router();


// route for user's dashboard
router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;