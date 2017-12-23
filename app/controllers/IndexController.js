module.exports = {
	home: function(req,res) {
		User.create({name: 'user',password: 'pass1'},function(err,user) {
			if(err) console.log(err);

		})
		Song.create({name: 'title1' , type : 'r&b'},function(err,song) {
			if(err) console.log(err);
		})
		return res.send('success!');
		
	},
	new :function(req,res) {
		res.send('new route');
	}
};	