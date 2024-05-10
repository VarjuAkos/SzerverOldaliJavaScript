const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository,"UserModel");

    return async function newPwMW(req, res, next) {
        try {
            console.log(req.body.email);
            const user = await UserModel.findOne({ email: req.body.email });

            if (!user) {
                console.log('No user found');
                return res.redirect('/login');
            } else {
                user.password = req.body.password;
                await user.save();
                return res.redirect('/login');
            }
        } catch (err) {
            return next(err);
        }
    };
};
