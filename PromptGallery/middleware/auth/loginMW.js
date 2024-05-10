const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository,"UserModel");

    return async function loginMW(req, res, next) {
        if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
            return res.redirect('/login');
        }
        const user = await UserModel.findOne({
            username: req.body.username
        });
        console.log(user);
        if (user == null) {
            return res.redirect("/login");
        }
        if (user.password === req.body.password) {
            req.session.belepve = true;
            req.session.user = user;
            req.session.save(err => {
                if (err) {
                    console.error('Error saving session:', err);
                    return res.redirect('/login');
                }
                return res.redirect(`/dashboard/${user.id}`);
            });
        }
    };
};
