// masks-validation.js
// Máscaras simples para CPF, telefone e CEP + reforço de validação nativa

document.addEventListener('DOMContentLoaded', () => {
  const cpfEl = document.getElementById('cpf');
  const telEl = document.getElementById('telefone');
  const cepEl = document.getElementById('cep');
  const form = document.getElementById('formCadastro');

  function mask(value, pattern) {
    // pattern ex: '###.###.###-##'
    let i = 0;
    return pattern.replace(/#/g, () => value[i++] || '');
  }

  function onlyDigits(str) {
    return str.replace(/\D/g, '');
  }

  cpfEl && cpfEl.addEventListener('input', e => {
    const v = onlyDigits(e.target.value).slice(0,11);
    e.target.value = mask(v, '###.###.###-##');
  });

  telEl && telEl.addEventListener('input', e => {
    const v = onlyDigits(e.target.value).slice(0,11);
    if (v.length <= 10) {
      e.target.value = mask(v, '(##) ####-####');
    } else {
      e.target.value = mask(v, '(##) #####-####');
    }
  });

  cepEl && cepEl.addEventListener('input', e => {
    const v = onlyDigits(e.target.value).slice(0,8);
    e.target.value = mask(v, '#####-###');
  });

  // exemplo simples de validação extra no submit
  form && form.addEventListener('submit', (ev) => {
    if (!form.checkValidity()) {
      // Deixar o browser mostrar os erros nativos
      form.reportValidity();
      ev.preventDefault();
      return;
    }

    // Validação de CPF (check básico de formato)
    const cpfDigits = onlyDigits(cpfEl.value || '');
    if (cpfDigits.length !== 11) {
      alert('CPF inválido: deve ter 11 dígitos.');
      ev.preventDefault();
      cpfEl.focus();
      return;
    }

    // aqui você faria envio real via fetch / backend; por agora previne envio real
    ev.preventDefault();
    alert('Formulário válido! (substitua este alerta por envio real ao backend)');
  });
});
