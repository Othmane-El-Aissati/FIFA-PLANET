const express = require('express');
const ejs = require('ejs');

const PORT :number =  3000;
const app = express();

// Server properties set-up
app.set('port', PORT);
app.set('view engine', 'ejs');

//'IMPORT' STATIC FILES
app.use(express.static('css'));
app.use(express.static('assets'));
app.use(express.static('js'));

// Routes to the specified path with the specified callback functions
app.get('/', (req :any, res :any) => {
    res.render('index');
});

app.get('/index', (req :any, res :any) => {
    res.render('index');
});

app.get('/about', (req :any, res :any) => {
    res.render('about');
});

app.get('/login', (req :any, res :any) => {
    res.render('login');
});

// Listens for connections on the specified port 
app.listen(app.get('port'), () => console.log( '[SERVER] http://localhost:' + app.get('port')));
export{};