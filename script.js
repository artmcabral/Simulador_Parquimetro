
class Parquimetro {
    constructor(valor) {
        // Converte para centavos para evitar erros com decimais
        this.valor = Math.round(valor * 100);
    }

    calcularTempo() {
        if (this.valor < 100) {
            return 0;
        } else if (this.valor < 175) {
            return 30;
        } else if (this.valor < 300) {
            return 60;
        } else {
            return 120;
        }
    }

    calcularTroco() {
        let valorCobrado = 0;

        if (this.valor < 100) {
            return 0;
        } else if (this.valor < 175) {
            valorCobrado = 100;
        } else if (this.valor < 300) {
            valorCobrado = 175;
        } else {
            valorCobrado = 300;
        }

        return (this.valor - valorCobrado) / 100;
    }
}

// Captura os elementos do HTML
const formulario = document.getElementById("form-parquimetro");
const resultado = document.getElementById("resultado");

// Evento do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const valor = Number(document.getElementById("valor").value);

    // Cria um objeto da classe Parquimetro
    const parquimetro = new Parquimetro(valor);

    const tempo = parquimetro.calcularTempo();
    const troco = parquimetro.calcularTroco();

    if (!Number.isFinite(valor) || valor < 1) {
        resultado.className = "resultado erro";
        resultado.innerHTML = "Valor insuficiente! Mínimo de R$ 1,00.";
        return;
    }

    resultado.className = "resultado sucesso";

    resultado.innerHTML = `
        <strong>Pagamento realizado!</strong><br>
        Tempo de permanência: ${tempo} minutos<br>
        Troco: R$ ${troco.toFixed(2).replace(".", ",")}
    `;
});
