function formataCpf(funcionario) {
	if(Array.isArray(funcionario)) {
		const funcionarioFormatado = funcionario.filter(teste => {
			const cpf = teste.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
			teste.cpf = cpf;
		});
		return funcionarioFormatado;
	} 
	const cpf = funcionario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
	const funcionarioFormatado = funcionario.cpf = cpf;
	return funcionarioFormatado;
	
}

module.exports = formataCpf;