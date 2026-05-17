# 💰 Controle de Gastos Pessoais

> Aplicação web simples e gratuita para gerenciamento de gastos pessoais, voltada a pessoas de baixa renda e microempreendedores que precisam organizar suas finanças no dia a dia.

🔗 **[Acesse a aplicação online](https://gabteless.github.io/controle-gastos/)**

[![CI](https://github.com/gabteless/controle-gastos/actions/workflows/ci.yml/badge.svg)](https://github.com/gabteless/controle-gastos/actions/workflows/ci.yml)
![Version](https://img.shields.io/badge/versão-1.1.0-blue)
![License](https://img.shields.io/badge/licença-MIT-green)
![Tests](https://img.shields.io/badge/testes-8%20passando-brightgreen)

---

## 📌 O Problema

Segundo dados do SPC Brasil, **mais de 60% dos brasileiros não controlam suas finanças pessoais**. A falta de organização financeira leva ao endividamento, atrasos no pagamento de contas e impacto direto na qualidade de vida. Muitas ferramentas disponíveis exigem cadastro, instalação de aplicativos pesados ou possuem interfaces complexas — o que dificulta o acesso para pessoas com pouca familiaridade tecnológica.

## 💡 A Solução

O **Controle de Gastos Pessoais** é uma aplicação web leve, 100% gratuita e que funciona diretamente no navegador, sem necessidade de cadastro ou instalação. O usuário pode:

- Registrar gastos com descrição, valor, categoria e data
- Visualizar o total de gastos e o resumo por categoria
- Filtrar gastos por categoria
- Remover gastos individualmente
- Ter seus dados salvos automaticamente no navegador (localStorage)

## 👥 Público-Alvo

- Pessoas de baixa renda que precisam de controle financeiro básico
- Microempreendedores que desejam acompanhar gastos do negócio
- Estudantes que querem organizar suas despesas mensais
- Qualquer pessoa que busque uma ferramenta simples e sem burocracia

## 🚀 Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| ➕ Adicionar gasto | Cadastro com descrição, valor, categoria e data |
| 📋 Listar gastos | Visualização dos gastos registrados, ordenados do mais recente |
| 🗑️ Remover gasto | Exclusão individual de um gasto |
| 📊 Dashboard | Total geral e totais por categoria |
| 🔍 Filtro | Filtrar gastos por categoria |
| 💾 Persistência | Dados salvos automaticamente via localStorage |
| 💱 Cotação USD | Consulta cotação do dólar em tempo real (AwesomeAPI) |
| 🔄 Conversão | Converte total de gastos de BRL para USD |

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Estilização moderna com dark theme e glassmorphism
- **JavaScript (Vanilla)** — Lógica de negócio e interface
- **Jest** — Testes automatizados
- **ESLint** — Análise estática / linting
- **GitHub Actions** — Integração Contínua (CI)

## 📂 Estrutura do Projeto

```
controle-gastos/
├── src/
│   ├── index.html          # Interface principal (GUI)
│   ├── style.css            # Estilização
│   ├── app.js               # Lógica da interface (DOM) + integração API
│   └── gastos.js            # Lógica de negócio (testável)
├── tests/
│   ├── gastos.test.js       # Testes unitários
│   └── api.test.js          # Teste de integração (API)
├── .github/
│   └── workflows/
│       ├── ci.yml           # Pipeline CI
│       └── deploy.yml       # Deploy GitHub Pages
├── package.json             # Manifesto + dependências + versão
├── .eslintrc.json           # Configuração do ESLint
├── .gitignore               # Arquivos ignorados pelo Git
├── README.md                # Este arquivo
├── CHANGELOG.md             # Registro de mudanças
└── LICENSE                  # Licença MIT
```

## 📦 Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- [Git](https://git-scm.com/)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/gabteless/controle-gastos.git

# 2. Entre na pasta do projeto
cd controle-gastos

# 3. Instale as dependências
npm install
```

## ▶️ Execução

Para utilizar a aplicação, basta abrir o arquivo `src/index.html` em qualquer navegador moderno:

```bash
# No Linux
xdg-open src/index.html

# No macOS
open src/index.html

# No Windows
start src/index.html
```

Ou simplesmente abra o arquivo `src/index.html` arrastando para o navegador.

## 🧪 Executar os Testes

```bash
npm test
```

**Saída esperada:**
```
PASS tests/gastos.test.js
  GastosManager
    ✓ deve adicionar um gasto válido corretamente
    ✓ deve rejeitar gasto com valor negativo
    ✓ deve rejeitar gasto com campos obrigatórios vazios
    ✓ deve calcular o total de gastos corretamente
    ✓ deve filtrar gastos por categoria corretamente
    ✓ deve remover um gasto existente
    ✓ deve retornar erro ao tentar remover gasto inexistente

Tests: 8 passed, 8 total
```

## 🔍 Executar o Lint

```bash
npm run lint
```

Para corrigir problemas automaticamente:

```bash
npm run lint:fix
```

## 📋 Versão Atual

**v1.1.0** — Consulte o [CHANGELOG.md](CHANGELOG.md) para o histórico de mudanças.

O projeto segue o padrão de [Versionamento Semântico](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`).

## 👤 Autor

**Gabriel** — Estudante de Análise e Desenvolvimento de Sistemas

## 🔗 Links

- **Repositório**: [github.com/gabteless/controle-gastos](https://github.com/gabteless/controle-gastos)
- **Aplicação online**: [gabteless.github.io/controle-gastos](https://gabteless.github.io/controle-gastos/)

## 📄 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.
