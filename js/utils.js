// Funções puras: não alteram o DOM nem dependem de variáveis externas mutáveis.
export const paraCentavos = (reais) => Math.round(reais * 100);

// map(): transforma a tabela em valores inteiros para evitar erros decimais.
export const TARIFAS = [
  { preco: 1.00, minutos: 30 },
  { preco: 1.75, minutos: 60 },
  { preco: 3.00, minutos: 120 }
].map(({ preco, minutos }) => ({ centavos: paraCentavos(preco), minutos }));

// find(): busca a maior faixa que o pagamento consegue cobrir.
export function encontrarTarifa(valorCentavos) {
  return [...TARIFAS].reverse().find(({ centavos }) => valorCentavos >= centavos) ?? null;
}

// reduce(): combina o pagamento com o custo negativo da faixa escolhida.
export function calcularTrocoEmCentavos(valorCentavos, tarifa) {
  if (!tarifa) return 0;
  return [valorCentavos, -tarifa.centavos].reduce((total, parcela) => total + parcela, 0);
}

export const formatarReais = (valor) => valor.toFixed(2).replace('.', ',');
