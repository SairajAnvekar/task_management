var express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/views', express.static(__dirname + '/views/'));
// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

app.get('/test', function(req, res, next) {
  
    res.render('index');
});

app.get('/tasks',function(req, res, next){
		res.json({
  "data": [
   { id: 11, name: 'Learn Angular 2' },
  { id: 12, name: 'Bulid small app' },
  { id: 13, name: 'Ui development' },
  { id: 14, name: 'Impovement ' },
  { id: 15, name: 'Test' ,test:"ffff"}
  ]
});

});


app.use(errorHandler);

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
