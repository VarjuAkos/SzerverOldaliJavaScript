const requireOption = require('./requireOptions');

module.exports = function (objectRepository,viewName){
        return async function (req, res) {
            res.render(viewName);
        };

};
