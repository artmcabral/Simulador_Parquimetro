import { Parquimetro } from './classes.js';
import { formatarReais } from './utils.js';

const formulario = document.getElementById('form-parquimetro');
const campoValor = document.getElementById('valor');
const resultado = document.getElementById('resultado');

// Executa cálculos sem recarregar a página.
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const valor = Number(campoValor.value);
  if (campoValor.value.trim() === '' || !Number.isFinite(valor) || valor < 1) {
    resultado.className = 'resultado erro';
    resultado.textContent = 'Valor insuficiente! Mínimo de R$ 1,00.';
    return;
  }

  const parquimetro = new Parquimetro(valor);
  const tempo = parquimetro.calcularTempo();
  const troco = parquimetro.calcularTroco();

  resultado.className = 'resultado sucesso';
  resultado.innerHTML = `
    <strong>Pagamento realizado!</strong><br>
    Tempo de permanência: ${tempo} minutos<br>
    Troco: R$ ${formatarReais(troco)}
  `;
});
