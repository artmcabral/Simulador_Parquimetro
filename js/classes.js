import { paraCentavos, encontrarTarifa, calcularTrocoEmCentavos } from './utils.js';

export class Parquimetro {
  constructor(valor) {
    this.valor = paraCentavos(valor);
  }

  calcularTempo() {
    const tarifa = encontrarTarifa(this.valor);
    return tarifa ? tarifa.minutos : 0;
  }

  calcularTroco() {
    const tarifa = encontrarTarifa(this.valor);
    return calcularTrocoEmCentavos(this.valor, tarifa) / 100;
  }
}
