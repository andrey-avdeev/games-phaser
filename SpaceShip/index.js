const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
//app.set('view engine', 'pug');

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.listen(app.get('port'), () => {
	console.log('\nExpress server up and running at http://localhost:%s.\n', app.get('port'));
});
