# Teachy - Sistema de Autenticação e Gerenciamento de Sessões

Este projeto foi desenvolvido para a plataforma educacional **Teachy**, com o objetivo de implementar um sistema robusto de autenticação e gerenciamento de sessões. A arquitetura foi projetada para garantir **segurança**, **escalabilidade** e **flexibilidade**, oferecendo uma experiência de login suave e segura para os usuários. O sistema suporta múltiplas escolas, login via Google e autenticação de dois fatores (2FA).

---

## Tecnologias Utilizadas

### Linguagem: **TypeScript**
- **Motivo**: Oferece tipagem estática, facilitando a manutenção e o desenvolvimento de um código limpo.

---

### Backend Framework: **NestJS**
- **Motivo**: Estrutura modular e escalável, ideal para criar sistemas robustos de autenticação e gerenciamento de sessões com integração nativa ao TypeScript.
- **Vantagem**: Controle de rotas gerenciado de forma abstrata, superando alternativas como Express.js.
- **Alternativas Consideradas**:
  - **Express.js**: Descartado devido à necessidade de configurações extensivas para alcançar o mesmo nível de modularidade.

---

### Autenticação e Gestão de Sessões: **Passport.js**
- **Motivo**: Controle interno de autenticação, garantindo maior segurança e menor custo em comparação com soluções externas.
- **Vantagens**:
  - Suporte a múltiplas estratégias de autenticação, incluindo OAuth (para Google) e 2FA.
- **Alternativas Consideradas**:
  - **Auth0**: Menos controle interno e potencialmente mais caro em grande escala.
  - **Firebase Auth**: Menos controle interno e potencialmente mais caro em grande escala.

---

### Banco de Dados: **PostgreSQL** e **Redis**
- **Motivo**: Uso combinado para atender às necessidades do sistema:
  - **PostgreSQL**: Base robusta para armazenamento de dados relacionais.
  - **Redis**: Cache em memória para melhorar o desempenho e reduzir a carga de I/O no banco de dados principal.
- **Cenário**: O sistema espera um volume elevado de requisições, e o Redis é utilizado para armazenar dados frequentemente acessados, otimizando o desempenho.

---

### ORM: **TypeORM**
- **Motivo**: Escolhido por sua maturidade no mercado, capacidade de lidar com relacionamentos complexos e facilidade no gerenciamento de migrações.
- **Alternativas Consideradas**:
  - **Prisma**: Embora amplamente adotado, ainda está em fase de aprimoramentos pela equipe mantenedora.
- **Observação**: É importante testar ambas as abordagens para avaliar a performance das queries em diferentes cenários.

---

## Segurança

A segurança do sistema é aprimorada através de:
- **Criptografia**: Utilização de Bcrypt para proteger senhas.
- **Proteção CSRF/XSS**: Implementação de medidas contra ataques comuns.
- **Gerenciamento de Sessões**: Utilização de JWT (JSON Web Tokens) para autenticação segura.

---

## Funcionalidades Principais

- Suporte a múltiplas escolas.
- Login via Google.
- Autenticação de dois fatores (2FA).
- Gerenciamento de sessões com Redis para cache e PostgreSQL para persistência.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).