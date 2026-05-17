/**
 * GastosManager — Módulo de lógica de negócio para gerenciamento de gastos.
 * Contém funções puras para CRUD, validação, cálculos e filtros.
 * Funciona tanto no navegador quanto em Node.js (para testes com Jest).
 */
const GastosManager = {

  /**
   * Categorias disponíveis para classificação de gastos.
   */
  CATEGORIAS: [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Outros'
  ],

  /**
   * Cria um objeto de gasto com ID único.
   * @param {string} descricao - Descrição do gasto
   * @param {number|string} valor - Valor do gasto
   * @param {string} categoria - Categoria do gasto
   * @param {string} data - Data no formato YYYY-MM-DD
   * @returns {object} Objeto do gasto criado
   */
  criarGasto(descricao, valor, categoria, data) {
    return {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      descricao: descricao ? descricao.trim() : '',
      valor: parseFloat(valor),
      categoria: categoria ? categoria.trim() : '',
      data: data || ''
    };
  },

  /**
   * Valida os campos de um gasto.
   * @param {object} gasto - Objeto do gasto a validar
   * @returns {object} { valido: boolean, erros: string[] }
   */
  validarGasto(gasto) {
    const erros = [];

    if (!gasto.descricao || gasto.descricao.trim() === '') {
      erros.push('Descrição é obrigatória');
    }

    if (gasto.valor === undefined || gasto.valor === null || isNaN(gasto.valor)) {
      erros.push('Valor deve ser um número válido');
    } else if (gasto.valor <= 0) {
      erros.push('Valor deve ser positivo');
    }

    if (!gasto.categoria || gasto.categoria.trim() === '') {
      erros.push('Categoria é obrigatória');
    }

    if (!gasto.data || gasto.data.trim() === '') {
      erros.push('Data é obrigatória');
    }

    return { valido: erros.length === 0, erros };
  },

  /**
   * Adiciona um gasto à lista após validação.
   * @param {Array} lista - Lista atual de gastos
   * @param {object} gasto - Gasto a ser adicionado
   * @returns {object} { sucesso: boolean, erros: string[], lista: Array }
   */
  adicionarGasto(lista, gasto) {
    const validacao = this.validarGasto(gasto);
    if (!validacao.valido) {
      return { sucesso: false, erros: validacao.erros, lista };
    }
    const novaLista = [...lista, gasto];
    return { sucesso: true, erros: [], lista: novaLista };
  },

  /**
   * Remove um gasto da lista pelo ID.
   * @param {Array} lista - Lista atual de gastos
   * @param {string} id - ID do gasto a remover
   * @returns {object} { sucesso: boolean, erro?: string, lista: Array }
   */
  removerGasto(lista, id) {
    const index = lista.findIndex(g => g.id === id);
    if (index === -1) {
      return { sucesso: false, erro: 'Gasto não encontrado', lista };
    }
    const novaLista = lista.filter(g => g.id !== id);
    return { sucesso: true, lista: novaLista };
  },

  /**
   * Calcula o total de uma lista de gastos.
   * @param {Array} lista - Lista de gastos
   * @returns {number} Soma dos valores
   */
  calcularTotal(lista) {
    return lista.reduce((total, gasto) => total + gasto.valor, 0);
  },

  /**
   * Filtra gastos por categoria.
   * @param {Array} lista - Lista de gastos
   * @param {string} categoria - Categoria para filtrar (ou 'todas')
   * @returns {Array} Lista filtrada
   */
  filtrarPorCategoria(lista, categoria) {
    if (!categoria || categoria === 'todas') {
      return [...lista];
    }
    return lista.filter(g => g.categoria === categoria);
  },

  /**
   * Retorna as categorias únicas presentes na lista.
   * @param {Array} lista - Lista de gastos
   * @returns {string[]} Array de categorias únicas
   */
  obterCategorias(lista) {
    return [...new Set(lista.map(g => g.categoria))];
  },

  /**
   * Calcula o total de gastos agrupado por categoria.
   * @param {Array} lista - Lista de gastos
   * @returns {object} Objeto { categoria: totalValor }
   */
  calcularTotalPorCategoria(lista) {
    return lista.reduce((acc, gasto) => {
      acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.valor;
      return acc;
    }, {});
  }
};

// Compatibilidade Node.js (Jest) e navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GastosManager;
}
