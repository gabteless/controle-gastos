const GastosManager = require('../src/gastos');

describe('GastosManager', () => {

  // ===== Teste 1: Caminho feliz — adicionar gasto válido =====
  test('deve adicionar um gasto válido corretamente', () => {
    const gasto = GastosManager.criarGasto('Almoço', 25.50, 'Alimentação', '2026-05-17');
    const resultado = GastosManager.adicionarGasto([], gasto);

    expect(resultado.sucesso).toBe(true);
    expect(resultado.erros).toHaveLength(0);
    expect(resultado.lista).toHaveLength(1);
    expect(resultado.lista[0].descricao).toBe('Almoço');
    expect(resultado.lista[0].valor).toBe(25.50);
    expect(resultado.lista[0].categoria).toBe('Alimentação');
  });

  // ===== Teste 2: Entrada inválida — valor negativo =====
  test('deve rejeitar gasto com valor negativo', () => {
    const gasto = GastosManager.criarGasto('Teste', -10, 'Outros', '2026-05-17');
    const resultado = GastosManager.adicionarGasto([], gasto);

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erros).toContain('Valor deve ser positivo');
    expect(resultado.lista).toHaveLength(0);
  });

  // ===== Teste 3: Entrada inválida — campos vazios =====
  test('deve rejeitar gasto com campos obrigatórios vazios', () => {
    const gasto = GastosManager.criarGasto('', '', '', '');
    const resultado = GastosManager.adicionarGasto([], gasto);

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erros.length).toBeGreaterThanOrEqual(3);
    expect(resultado.erros).toContain('Descrição é obrigatória');
    expect(resultado.erros).toContain('Categoria é obrigatória');
    expect(resultado.erros).toContain('Data é obrigatória');
  });

  // ===== Teste 4: Cálculo — total correto =====
  test('deve calcular o total de gastos corretamente', () => {
    const gastos = [
      GastosManager.criarGasto('A', 10.50, 'Alimentação', '2026-01-01'),
      GastosManager.criarGasto('B', 20.00, 'Transporte', '2026-01-02'),
      GastosManager.criarGasto('C', 30.75, 'Moradia', '2026-01-03'),
    ];
    const total = GastosManager.calcularTotal(gastos);

    expect(total).toBeCloseTo(61.25);
  });

  // ===== Teste 5: Filtro — filtrar por categoria =====
  test('deve filtrar gastos por categoria corretamente', () => {
    const gastos = [
      GastosManager.criarGasto('Almoço', 15, 'Alimentação', '2026-01-01'),
      GastosManager.criarGasto('Uber', 12, 'Transporte', '2026-01-02'),
      GastosManager.criarGasto('Jantar', 30, 'Alimentação', '2026-01-03'),
    ];
    const filtrados = GastosManager.filtrarPorCategoria(gastos, 'Alimentação');

    expect(filtrados).toHaveLength(2);
    expect(filtrados.every(g => g.categoria === 'Alimentação')).toBe(true);
  });

  // ===== Teste 6: Remoção — remover gasto existente =====
  test('deve remover um gasto existente', () => {
    const gasto = GastosManager.criarGasto('Café', 5, 'Alimentação', '2026-01-01');
    const { lista } = GastosManager.adicionarGasto([], gasto);
    const resultado = GastosManager.removerGasto(lista, gasto.id);

    expect(resultado.sucesso).toBe(true);
    expect(resultado.lista).toHaveLength(0);
  });

  // ===== Teste 7: Caso limite — remover gasto inexistente =====
  test('deve retornar erro ao tentar remover gasto inexistente', () => {
    const resultado = GastosManager.removerGasto([], 'id-que-nao-existe');

    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toBe('Gasto não encontrado');
  });

});
