
class Parquimetro {
    constructor(valor) {
        // Converte o valor para centavos
        this.valor = Math.round(valor * 100);
    }

    // Determina a faixa de estacionamento
    determinarFaixa() {
        if (this.valor < 100) {
            return { tempo: 0, valorCobrado: 0 };
        } else if (this.valor < 175) {
            return { tempo: 30, valorCobrado: 100 };
        } else if (this.valor < 300) {
            return { tempo: 60, valorCobrado: 175 };
        } else {
            return { tempo: 120, valorCobrado: 300 };
        }
    }

    // Calcula o tempo de permanência
    calcularTempo() {
        return this.determinarFaixa().tempo;
    }

    // Calcula o troco
    calcularTroco() {
        const faixa = this.determinarFaixa();

        if (faixa.tempo === 0) {
            return 0;
        }

        return (this.valor - faixa.valorCobrado) / 100;
    }
}

// Captura os elementos do HTML
const formulario = document.getElementById("form-parquimetro");
const resultado = document.getElementById("resultado");

// Evento do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const campoValor = document.getElementById("valor");
    const valorTexto = campoValor.value.trim();
    const valor = Number(valorTexto);

    // Valida o valor informado
    if (valorTexto === "" || !Number.isFinite(valor) || valor < 0) {
        resultado.className = "resultado erro";
        resultado.textContent = "Digite um valor válido.";
        return;
    }

    if (valor < 1) {
        resultado.className = "resultado erro";
        resultado.textContent = "Valor insuficiente! Mínimo de R$ 1,00.";
        return;
    }

    // Cria um objeto da classe Parquimetro
    const parquimetro = new Parquimetro(valor);

    const tempo = parquimetro.calcularTempo();
    const troco = parquimetro.calcularTroco();

    // Exibe o resultado
    resultado.className = "resultado sucesso";

    resultado.innerHTML = `
        <strong>Pagamento realizado!</strong><br>
        Tempo de permanência: ${tempo} minutos<br>
        Troco: R$ ${troco.toFixed(2).replace(".", ",")}
    `;
});
