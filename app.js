/* importar as configurações do servidor */

var app = require('./config/server');

/* parametrizando a porta de escuta */
var server = app.listen(80, function(){
	console.log('Server ON');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* Criando a conexão por websocket */
io.on('connection', function(socket){

	console.log('Um usuário logou');
	socket.on('disconnect', function(){

		console.log('Um usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){

		/*Funções para Dialogo*/

		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/*Participantes*/

		if(parseInt(data.apelido_atualizado) == 0){

			socket.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);

		}
		
	});
});