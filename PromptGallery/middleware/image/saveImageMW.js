const requireOption = require('../requireOptions');

//jó asszem ez kész így
module.exports = function (objectRepository) {
    const ImageModel = requireOption(objectRepository, "ImageModel");

    return async function saveImageMW(req, res, next) {

        res.locals.image =  new ImageModel();
        res.locals.image._owner = res.locals.user.id;
        res.locals.image.file_path = req.file.path;
        res.locals.image.prompt = req.body.prompt;
        //console.log(res.locals.image);

        try{
            await res.locals.image.save();
            return res.redirect(`/dashboard/${res.locals.user.id}`);
        } catch (err) {
            return next(err);
        }
    };
};
