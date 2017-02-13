module.exports.iniciaChat = function(application, req, res){
	
	var dadosForm = req.body;

	/* Realizando a validação do form */
	req.assert('apelido', 'Por Favor inserir um Apelido').notEmpty();
	req.assert('apelido', 'O Apelido deve conter entre 3 a 15 chars').len(3,15);

	/* Recuperando os erros do form */
	var erros = req.validationErrors();

	if(erros){
		/* Renderizando a pagina index e enviando a variavel validação com os erros do form */
		res.render('index', {validacao : erros});
		return;
	}

	application.get('io').emit(
		'msgParaCliente',
		{apelido: dadosForm.apelido, mensagem: 'Entrou'}

	);


	res.render("chat", {dadosForm : dadosForm});
}