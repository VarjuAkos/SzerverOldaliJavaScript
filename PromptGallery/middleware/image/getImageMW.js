const requireOption = require("../requireOptions");

module.exports = function (objectRepository) {
    const ImageModel = requireOption(objectRepository,"ImageModel");

    return async function getImageMW(req, res, next) {

        try{
            console.log("req body",req.params.imageid);
            const image = await ImageModel.findOne({
                _id: req.params.imageid
            });
            res.locals.image = image;
            return next();
        }
        catch(err){
            return next(err);
        }
    };
};
