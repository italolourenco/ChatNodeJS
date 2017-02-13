/* importando o módulo do framework express */
var express = require('express');

/* importando o módulo do consign */
var consign = require('consign');

/* importando o módulo do body-parser */
var bodyParser = require('body-parser');

/* importando o módulo do express-validator */
var expressValidator = require('express-validator');

/* Iniciando o objeto do express */
var app = express();

/* setando as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurando o middleware express.static */
app.use(express.static('./app/public'));

/* configurando o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurando o middleware express-validator */
app.use(expressValidator());

/* configurando o consign */
/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* Exportando o objeto app */
module.exports = app;