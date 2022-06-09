//Joi schemas for server side DB validation
const { } = require('./JoiSchemas.js');
const ExpressError = require('./erorrHandling/ExpressError');
const Course = require('./models/course');


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //get the Url that the user is trying to access to redirect him after login
        req.session.returnUrl = req.originalUrl
        req.flash('error', 'Πρέπει να συνδεθείτε για να δείτε αυτό το περιεχόμενο!');
        return res.redirect('/login');
    }
    next();
}
  

module.exports = {
    isLoggedIn,
 }