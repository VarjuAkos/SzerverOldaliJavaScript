const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const ImageModel = requireOption(objectRepository,"ImageModel");

    return async function delImageMW(req, res, next) {
        try {
            await ImageModel.deleteOne({
                _id : req.params.imageid
            })
            return res.redirect(`/dashboard/${res.locals.user.id}`)
        } catch (err) {
            return next(err);
        }

    };
};