export function formatar(valor, unidade = '') {
  if (valor === 'unknown') {
    return 'Desconhecido'
  }
  return `${valor}${unidade}`
}

const traducoes = {
  male: 'masculino',
  female: 'feminino',
  hermaphrodite: 'hermafrodita',
  'n/a': 'não se aplica',
  none: 'nenhum',
  blond: 'loiro',
  blonde: 'loiro',
  brown: ['castanho', 'castanha'],
  black: ['preto', 'preta'],
  auburn: ['castanho-avermelhado', 'castanha-avermelhada'],
  white: ['branco', 'branca'],
  grey: 'cinza',
  gray: 'cinza',
  fair: ['claro', 'clara'],
  light: ['claro', 'clara'],
  pale: ['pálido', 'pálida'],
  dark: ['escuro', 'escura'],
  gold: ['dourado', 'dourada'],
  yellow: 'amarelo',
  blue: 'azul',
  red: ['vermelho', 'vermelha'],
  green: 'verde',
  orange: 'laranja',
  pink: 'rosa',
  hazel: 'avelã',
  tan: 'bege',
  'blue-gray': 'azul-acinzentado',
}

export function traduzir(valor, feminino = false) {
  if (valor === 'unknown') {
    return 'Desconhecido'
  }

  function traduzirPalavra(palavra) {
    const traducao = traducoes[palavra]
    if (traducao === undefined) {
      return palavra
    }
    return Array.isArray(traducao) ? traducao[feminino ? 1 : 0] : traducao
  }

  const texto = valor.toLowerCase()
  const partes =
    traducoes[texto] !== undefined ? [texto] : texto.split(/([\s,\/-]+)/)
  const resultado = partes.map(traduzirPalavra).join('')

  return resultado.charAt(0).toUpperCase() + resultado.slice(1)
}

export function formatarNascimento(valor) {
  if (valor === 'unknown') {
    return 'Desconhecido'
  }

  const encontrado = valor.match(/^([\d.]+)(BBY|ABY)$/)
  if (!encontrado) {
    return valor
  }

  const [, numero, era] = encontrado
  const anos = numero.replace('.', ',')
  const quando = era === 'BBY' ? 'antes' : 'depois'

  return `${anos} anos ${quando} da Batalha de Yavin (${valor})`
}