var requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
  return function authMW(req, res, next) {
      console.log('authMW');
      if (typeof req.session.belepve === 'undefined' || req.session.belepve !== true) {
          console.log('session.belepve is undefined gets redirected to /');
          return res.redirect('/');
      }
      next();
  };
};