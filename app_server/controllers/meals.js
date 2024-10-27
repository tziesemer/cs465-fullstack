var fs = require('fs');
var meals2 = JSON.parse(fs.readFileSync('./data/meals2.json','utf8'));

/* GET Meals View */
const meals = (req, res) => {
    res.render('meals', { title: "Travlr Getaways", meals2});
};

module.exports = {
    meals
};