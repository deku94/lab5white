// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	/*data['tempEnv']={
			"Environment": req.params.name,
			"name": "NO INFO",
			"type": "NO INFO",
			"soundValue":req.params.sound,
			"location":req.params.location,
			"idnum":-1
		};*/
	data['soundTemp']['value']=50;
	res.render('environment', data);

};