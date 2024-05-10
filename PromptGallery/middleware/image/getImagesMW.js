const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const ImageModel = requireOption(objectRepository,"ImageModel");
    const UserModel = requireOption(objectRepository,"UserModel");

    return async function getImagesMW(req, res, next) {

        try {
            const images = await ImageModel.find({
                _owner: res.locals.user.id
            });
            res.locals.images = images;
            return next();
        } catch (err) {
            return next(err);
        }
    };
};