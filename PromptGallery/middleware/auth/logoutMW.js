const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    return function logoutMiddleware(req, res, next) {
        console.log('logoutMW');
        req.session.destroy(err => {
            res.redirect('/');
        });
    };
};
