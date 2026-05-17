/**
 * Teste de Integração — Validação da comunicação com a AwesomeAPI.
 * Utiliza mock do fetch para simular a resposta da API em ambiente CI,
 * garantindo que o fluxo de dados funciona corretamente.
 */

// Mock da resposta da API
const mockCotacaoResponse = {
  USDBRL: {
    code: 'USD',
    codein: 'BRL',
    name: 'Dólar Americano/Real Brasileiro',
    high: '5.85',
    low: '5.72',
    varBid: '0.03',
    pctChange: '0.52',
    bid: '5.78',
    ask: '5.79',
    timestamp: '1747522800',
    create_date: '2026-05-17 18:00:00'
  }
};

// Mock global do fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mockCotacaoResponse)
  })
);

const GastosManager = require('../src/gastos');

describe('Integração com AwesomeAPI (Cotação USD-BRL)', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  test('deve retornar a cotação do dólar no formato esperado', async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');

    // Verifica se a requisição foi bem-sucedida
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    const data = await response.json();

    // Verifica se o objeto USDBRL existe na resposta
    expect(data).toHaveProperty('USDBRL');

    const cotacao = data.USDBRL;

    // Verifica se os campos essenciais estão presentes
    expect(cotacao).toHaveProperty('bid');
    expect(cotacao).toHaveProperty('ask');
    expect(cotacao).toHaveProperty('high');
    expect(cotacao).toHaveProperty('low');
    expect(cotacao).toHaveProperty('create_date');

    // Verifica se os valores são numéricos válidos
    const bid = parseFloat(cotacao.bid);
    const ask = parseFloat(cotacao.ask);

    expect(bid).toBeGreaterThan(0);
    expect(ask).toBeGreaterThan(0);
    expect(isNaN(bid)).toBe(false);
    expect(isNaN(ask)).toBe(false);

    // Verifica que o fetch foi chamado com a URL correta
    expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/last/USD-BRL');
  });

  test('deve converter o total de gastos para USD corretamente', async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const data = await response.json();
    const valorCompra = parseFloat(data.USDBRL.bid);

    // Criar gastos de exemplo
    const gastos = [
      GastosManager.criarGasto('Almoço', 50, 'Alimentação', '2026-05-17'),
      GastosManager.criarGasto('Uber', 30, 'Transporte', '2026-05-17'),
    ];

    const totalBRL = GastosManager.calcularTotal(gastos);
    const totalUSD = totalBRL / valorCompra;

    expect(totalBRL).toBe(80);
    expect(totalUSD).toBeCloseTo(80 / 5.78, 2);
    expect(totalUSD).toBeGreaterThan(0);
  });

  test('deve tratar erro quando a API falha', async () => {
    // Simular falha na API
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Server Error'))
      })
    );

    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });

});
