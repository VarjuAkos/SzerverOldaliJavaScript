/**
 * Load a User from the database using the :userid param
 * The result is saved to res.locals.user
 */

const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, "UserModel");

    return async function getUserMW(req, res, next) {
        try {
            const user = await UserModel.findOne({
                _id: req.params.userid
            });
            res.locals.user = user;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};