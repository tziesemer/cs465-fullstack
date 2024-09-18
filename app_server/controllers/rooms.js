var fs = require('fs');
var rooms2 = JSON.parse(fs.readFileSync('.data/rooms2.json','utf8'));

/* GET Travel View */
const rooms = (req, res) => {
    res.render('rooms', { title: "Travlr Getaways", rooms2});
};

module.exports = {
    rooms
};