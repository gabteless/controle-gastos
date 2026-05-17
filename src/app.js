/* global GastosManager */

/**
 * app.js — Lógica de interface do Controle de Gastos.
 * Gerencia interações com o DOM, localStorage e renderização.
 */
document.addEventListener('DOMContentLoaded', () => {

  // ===== Estado =====
  let gastos = JSON.parse(localStorage.getItem('gastos') || '[]');
  let filtroAtual = 'todas';

  // ===== Elementos do DOM =====
  const form = document.getElementById('form-gasto');
  const inputDescricao = document.getElementById('input-descricao');
  const inputValor = document.getElementById('input-valor');
  const inputCategoria = document.getElementById('input-categoria');
  const inputData = document.getElementById('input-data');
  const feedback = document.getElementById('form-feedback');
  const totalGeral = document.getElementById('total-geral');
  const contador = document.getElementById('contador-gastos');
  const categoriasResumo = document.getElementById('categorias-resumo');
  const listaContainer = document.getElementById('lista-gastos');
  const filtroSelect = document.getElementById('filtro-categoria');

  // ===== Inicialização =====
  inputData.value = new Date().toISOString().split('T')[0];
  atualizarInterface();

  // ===== Eventos =====
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const gasto = GastosManager.criarGasto(
      inputDescricao.value,
      inputValor.value,
      inputCategoria.value,
      inputData.value
    );

    const resultado = GastosManager.adicionarGasto(gastos, gasto);

    if (!resultado.sucesso) {
      mostrarFeedback(resultado.erros.join('. '), 'error');
      return;
    }

    gastos = resultado.lista;
    salvar();
    atualizarInterface();
    form.reset();
    inputData.value = new Date().toISOString().split('T')[0];
    mostrarFeedback('Gasto adicionado com sucesso!', 'success');
  });

  filtroSelect.addEventListener('change', () => {
    filtroAtual = filtroSelect.value;
    renderizarLista();
  });

  listaContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-remover');
    if (!btn) return;
    const item = btn.closest('.gasto-item');
    if (!item) return;
    const id = item.dataset.id;
    const resultado = GastosManager.removerGasto(gastos, id);
    if (resultado.sucesso) {
      gastos = resultado.lista;
      salvar();
      atualizarInterface();
      mostrarFeedback('Gasto removido.', 'success');
    }
  });

  // ===== Funções =====
  function salvar() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }

  function atualizarInterface() {
    const total = GastosManager.calcularTotal(gastos);
    totalGeral.textContent = formatarMoeda(total);
    contador.textContent = gastos.length + (gastos.length === 1 ? ' item' : ' itens');
    renderizarCategorias();
    atualizarFiltroOpcoes();
    renderizarLista();
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatarData(dataStr) {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  function renderizarCategorias() {
    const porCategoria = GastosManager.calcularTotalPorCategoria(gastos);
    const categorias = Object.keys(porCategoria);

    if (categorias.length === 0) {
      categoriasResumo.innerHTML = '<p class="empty-hint">Adicione gastos para ver o resumo</p>';
      return;
    }

    categoriasResumo.innerHTML = categorias
      .sort((a, b) => porCategoria[b] - porCategoria[a])
      .map(cat => `
        <div class="cat-row">
          <span class="cat-name">${cat}</span>
          <span class="cat-valor">${formatarMoeda(porCategoria[cat])}</span>
        </div>
      `).join('');
  }

  function atualizarFiltroOpcoes() {
    const categorias = GastosManager.obterCategorias(gastos);
    const valorAtual = filtroSelect.value;
    filtroSelect.innerHTML = '<option value="todas">Todas as categorias</option>';
    categorias.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      filtroSelect.appendChild(opt);
    });
    filtroSelect.value = valorAtual;
  }

  function renderizarLista() {
    const gastosFiltrados = GastosManager.filtrarPorCategoria(gastos, filtroAtual);

    if (gastosFiltrados.length === 0) {
      const msg = filtroAtual === 'todas'
        ? 'Nenhum gasto registrado ainda. Comece adicionando acima! 🚀'
        : 'Nenhum gasto nesta categoria.';
      listaContainer.innerHTML = '<p class="empty-message">' + msg + '</p>';
      return;
    }

    listaContainer.innerHTML = gastosFiltrados
      .slice()
      .reverse()
      .map((gasto, i) => {
        const badgeClass = 'badge-' + normalizarCategoria(gasto.categoria);
        return '<div class="gasto-item" data-id="' + gasto.id + '" style="animation-delay:' + (i * 0.05) + 's">' +
          '<div class="gasto-info">' +
            '<span class="gasto-descricao">' + escapeHtml(gasto.descricao) + '</span>' +
            '<span class="badge ' + badgeClass + '">' + escapeHtml(gasto.categoria) + '</span>' +
            '<span class="gasto-data">' + formatarData(gasto.data) + '</span>' +
          '</div>' +
          '<div class="gasto-acoes">' +
            '<span class="gasto-valor">- ' + formatarMoeda(gasto.valor) + '</span>' +
            '<button class="btn-remover" title="Remover gasto" aria-label="Remover ' + escapeHtml(gasto.descricao) + '">🗑</button>' +
          '</div>' +
        '</div>';
      }).join('');
  }

  function normalizarCategoria(cat) {
    return cat
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function mostrarFeedback(msg, tipo) {
    feedback.textContent = msg;
    feedback.className = 'form-feedback show ' + tipo;
    setTimeout(() => {
      feedback.className = 'form-feedback';
    }, 3000);
  }
});
