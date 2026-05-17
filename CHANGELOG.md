# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-05-17

### Adicionado
- Integração com AwesomeAPI para cotação do dólar (USD-BRL) em tempo real
- Seção na interface para consultar cotação e converter gastos para USD
- Teste de integração validando comunicação com a API
- Workflow de deploy automático para GitHub Pages
- Badge de CI no README
- Link da aplicação publicada no README

## [1.0.0] - 2026-05-17

### Adicionado
- Interface web completa para gerenciamento de gastos pessoais
- Cadastro de gastos com descrição, valor, categoria e data
- Listagem de gastos com filtro por categoria
- Remoção de gastos individuais
- Dashboard com total geral e resumo por categoria
- Persistência de dados via localStorage
- Testes automatizados com Jest (7 testes)
- Linting com ESLint
- Pipeline CI com GitHub Actions
- README.md completo com instruções de uso
