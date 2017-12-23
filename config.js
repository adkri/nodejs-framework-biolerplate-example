//All config functions here
var fs = require('fs')
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = {

	_routes: function(routes,cb) {
		var data = [];
		try{
			for (var k in routes){
			    if (routes.hasOwnProperty(k)) {
			    	var obj = {};
			    	obj.route = k;
			    	obj.target = routes[k].split('.');
			    	if(obj.target[1]){
			    		obj.func = obj.target[1];
			    	}
			        data.push(obj);
			    }
			}
			return cb(null,data);
		}catch(e){
			return cb(e,null);
		}
	},

	_models : function() {
		fs.readdir('./app/models',function(err,files) {
			if(err) throw err;
			async.each(files,function(file,next) {
				var obj = require('./app/models/'+file)

				try{
					GLOBAL[(obj.name[0].toUpperCase() + obj.name.slice(1))] = mongoose.model(obj.name, new Schema(obj.attributes));
					next(null)
				}catch(e){
					next(e)
				}
			},function(err) {
				if(err) throw err;
			});
		})
		
	}
}