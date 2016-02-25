var data = require("../data.json");
var idnum=6;
module.exports={
	addingEquip:function(req, res) {
		
		data["equipment"].push({

			"name": req.query.name,
			"type": req.query.type,
			"usage": req.query.usage,
			'idnum':idnum	
		});
		idnum++;
		//res.render("equipment",data);
		res.redirect('/equipment');
	},
	addEquipment:function(req, res) { 
		// Your code goes here
		console.log("ADDING EQUIP");
		res.render('addEquipment',data);
	},
	view :function(req,res){
		//console.log("YES");
		var found=0;
		//console.log(req.params.id);
		var finding=String(req.params.id);
		var key;
		var temp=new Array();
		for(key in data.environment){
			//console.log(data['environment'][key]['equipment']);
			if(finding.localeCompare(String(data['environment'][key]['equipment']))==0){
				//console.log("FOUND");
				found=1;
				temp.push(data['environment'][key]);
				//res.json(data['environment'][key]);
				
			}

		}
		if (found==1){
			res.json(temp);
			return;
		}
		temp.push({
			"name": "NOWHERE",
			"equipment": finding,
			"noise": "NO INFO",
			"type": "NO INFO"	
		});
		res.json(temp);
	},
	editpage: function(req,res){
		console.log("EDIT EQUIPMENT"+ req.params.id);
		var idnum=req.params.id;
		for (key in data['equipment']){
			if(data['equipment'][key].idnum==idnum){
				console.log("FOUND EQUIPMENT");
				console.log(data['equipment'][key]);
				data['tempEquip']={
					"name": data['equipment'][key]['name'],
					"type": data['equipment'][key]['type'],
					"usage": data['equipment'][key]['usage'],
					'idnum':data['equipment'][key]['idnum']	
				};

				//res.render('EditEquipment',data);
				//return;
				break;

			}
		}
		/*data['tempEquip']={
			"name": "NO INFO",
			"type": "NO INFO",
			"usage": "NO INFO",
			'id':'-1'	
		};*/
		res.render('EditEquipment',data);
	},
	editting : function(req,res){
		console.log("WE ARE EDITTING NOW");
		for(key in data['equipment']){
			if(data['equipment'][key]['idnum']==req.params.id){
				console.log('EQUIPMENT FOUND');
				if((String(req.query.button)).localeCompare("DELETE")==0){
					delete data['equipment'][key];
					
					(data.equipment).splice(key,1);
					break;

				}
				data['equipment'][key].name= req.query.name;
				data['equipment'][key].type= req.query.type;
				data['equipment'][key].usage=req.query.usage;
				break;
			}
		}
		res.redirect('/equipment');
	}
}
//It should be sound level, environment name, the equipment used in the environment.