module.exports = function (app, passport) {

app.get('/login', function (req, res) {

	// render the page and pass in any flash data if it exists
	res.render('login.ejs', {
     message: req.flash('loginMessage')
	});
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/home', // redirect to the secure dashboard section
	failureRedirect: '/login', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));


app.get('/signup', function (req, res) {

	// render the page and pass in any flash data if it exists
	res.render('signup.ejs', {
		message: req.flash('signupMessage')
	});
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/home', // redirect to the secure profile section
	failureRedirect: '/signup', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));



}