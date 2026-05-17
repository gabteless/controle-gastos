/**
 * Teste de Integração — Validação da comunicação com a AwesomeAPI.
 * Verifica se a API de cotação retorna dados no formato esperado.
 */

describe('Integração com AwesomeAPI (Cotação USD-BRL)', () => {

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
    expect(cotacao).toHaveProperty('bid');       // valor de compra
    expect(cotacao).toHaveProperty('ask');       // valor de venda
    expect(cotacao).toHaveProperty('high');      // máxima do dia
    expect(cotacao).toHaveProperty('low');       // mínima do dia
    expect(cotacao).toHaveProperty('create_date'); // data da cotação

    // Verifica se os valores são numéricos válidos
    const bid = parseFloat(cotacao.bid);
    const ask = parseFloat(cotacao.ask);

    expect(bid).toBeGreaterThan(0);
    expect(ask).toBeGreaterThan(0);
    expect(isNaN(bid)).toBe(false);
    expect(isNaN(ask)).toBe(false);
  }, 10000); // timeout de 10s para requisição de rede

});
