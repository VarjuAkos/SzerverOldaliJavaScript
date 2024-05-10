const requireOption = require('../requireOptions');


module.exports = function (objectRepository) {
    const ImageModel = requireOption(objectRepository, "ImageModel");

    return async function editImageMW(req, res, next) {
        let image;
        try {
            image = res.locals.image;
            image.prompt = req.body.prompt
            res.locals.image = image;
            await res.locals.image.save();
            return res.redirect(`/dashboard/${res.locals.user.id}`);
        } catch (err) {
            return next(err);
        }
    };
};
