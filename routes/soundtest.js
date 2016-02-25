var data = require('../data.json');
module.exports = {
	view: function (req, res) {
    	res.render('soundtest', data);
	},
	updateJSON: function(req,res){
		console.log("RETURN SOUND STORAGE");
		data['soundTemp'].value=req.params.value;
		console.log(data['soundTemp']);
	}
}