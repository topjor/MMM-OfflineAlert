const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function() {
  	this.expressApp.get('/offlinealert/check', function (req, res) {
  		res.send('{"success": true}');
  	});
  }
});
