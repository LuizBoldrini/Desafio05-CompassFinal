function validaCpf(cpf) {
  if (!cpf) return true;

  let soma = 0;

  if (cpf === '01234567890') return false;

  for (let i = 0; i <= 9; i++) {
    const numerosRepetidos = `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`;
    if (cpf === numerosRepetidos) return false;
  }

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  let resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}

module.exports = validaCpf;
