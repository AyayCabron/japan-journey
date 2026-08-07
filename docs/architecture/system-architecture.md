# Arquitetura do Sistema

## 1. Objetivo

Japan Journey é uma plataforma de planejamento de viagens ao Japão com foco em roteiro, mapas, lugares, orçamento, metas financeiras, participantes, clima, câmbio, passagens e organização da viagem.

O projeto utiliza uma arquitetura distribuída, com frontend, API, banco de dados e integrações externas desacoplados.

## 2. Visão geral

```text
Usuário
   ↓
Cloudflare Pages
   ↓
React + TypeScript
   ↓
API Client
   ↓
Cloudflare Worker
Python API
   ↓
┌───────────────────────────────┐
│ Supabase                      │
│ PostgreSQL                    │
│ Auth                          │
│ Storage                       │
└───────────────────────────────┘
   ↓
Integrações externas
   ├── Google Maps / Places
   ├── Câmbio
   ├── Clima
   └── Passagens
```

## 3. Monorepo

```text
japan-journey/
├── apps/
│   └── web/
├── services/
│   └── api/
├── packages/
│   ├── sdk/
│   ├── types/
│   └── ui/
├── supabase/
│   └── migrations/
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── decisions/
└── .github/
    └── workflows/
```

## 4. Frontend

### Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- TanStack Query
- React Hook Form
- Zod

### Responsabilidades

O frontend será responsável por:

- renderização da interface;
- navegação;
- gerenciamento de estado local;
- cache de requisições;
- formulários;
- validações de interface;
- visualização de mapas;
- visualização de gráficos.

O frontend não deverá conter regras de negócio sensíveis.

## 5. API

A API será executada em Cloudflare Workers utilizando Python.

### Responsabilidades

A API será responsável por:

- autenticação de requisições;
- validação JWT;
- autorização;
- regras de negócio;
- acesso ao banco de dados;
- integração com serviços externos;
- cache;
- rate limiting;
- normalização de respostas;
- logs estruturados.

## 6. Organização da API

```text
services/api/src/

api/
    health/
    auth/
    trips/
    places/
    finance/
    travelers/
    weather/
    exchange/
    flights/

core/
    config/
    security/
    errors/
    logging/

services/

repositories/

integrations/
    google/
    exchange/
    weather/
    flights/
    supabase/
```

## 7. Fluxo de requisição

```text
React
 ↓
HTTP Request
 ↓
Cloudflare Worker
 ↓
Middleware
 ↓
Autenticação
 ↓
Controller
 ↓
Service
 ↓
Repository ou Integration
 ↓
Resposta normalizada
```

## 8. Contrato de resposta

Respostas de sucesso:

```json
{
  "data": {}
}
```

Respostas com coleção:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

Respostas de erro:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resource not found"
  }
}
```

## 9. Versionamento da API

A API utilizará versionamento por URL:

```text
/api/v1/
```

Exemplos:

```text
GET /api/v1/health

GET /api/v1/trips

POST /api/v1/trips

GET /api/v1/trips/{tripId}

GET /api/v1/places/search

GET /api/v1/exchange-rates

GET /api/v1/weather

GET /api/v1/flights/search
```

## 10. Autenticação

A autenticação será realizada pelo Supabase Auth.

O usuário recebe um JWT após autenticação.

Fluxo:

```text
Usuário
 ↓
Supabase Auth
 ↓
JWT
 ↓
Frontend
 ↓
Authorization: Bearer <token>
 ↓
Cloudflare Worker
 ↓
Validação JWT
 ↓
Endpoint protegido
```

A API deverá validar:

- assinatura;
- emissor;
- expiração;
- audiência;
- usuário.

## 11. Autorização

As permissões de viagem utilizarão os seguintes papéis:

```text
owner
editor
viewer
```

### Owner

Pode:

- editar viagem;
- excluir viagem;
- adicionar participantes;
- alterar permissões;
- editar orçamento.

### Editor

Pode:

- editar roteiro;
- adicionar lugares;
- editar despesas.

### Viewer

Pode apenas visualizar dados.

## 12. Supabase

### PostgreSQL

Armazenará dados de domínio.

Principais entidades:

```text
profiles
trips
trip_members
places
trip_places
itinerary_days
itinerary_items
saving_goals
contributions
budget_categories
expenses
exchange_rates
flight_searches
flight_offers
checklist_items
documents
audit_logs
```

### Auth

Responsável por:

- cadastro;
- login;
- recuperação de senha;
- sessões;
- JWT.

### Storage

Responsável por:

- documentos;
- comprovantes;
- imagens adicionadas pelos usuários.

## 13. Row Level Security

RLS será habilitado nas tabelas associadas aos usuários.

Exemplo:

Um usuário somente poderá acessar uma viagem quando existir um registro correspondente em:

```text
trip_members
```

A proteção ocorrerá em duas camadas:

```text
Cloudflare Worker
+
Supabase RLS
```

## 14. Domínio Place

Place representa qualquer local físico utilizado pelo sistema.

Exemplos:

- Pokémon Center;
- restaurante;
- templo;
- hotel;
- estação;
- parque;
- loja.

Campos principais:

```text
id
name
city
district
category
latitude
longitude
external_provider
external_place_id
rating
website
maps_url
```

## 15. Google Maps e Places

Fluxo:

```text
Usuário seleciona lugar
 ↓
Frontend
 ↓
GET /api/v1/places/search
 ↓
Cloudflare Worker
 ↓
Google Places
 ↓
Normalização
 ↓
Frontend
 ↓
Mapa + fotos + informações
```

O frontend não dependerá diretamente da estrutura de resposta do Google.

Formato interno esperado:

```json
{
  "id": "string",
  "name": "Pokemon Center Shibuya",
  "address": "string",
  "location": {
    "latitude": 0,
    "longitude": 0
  },
  "rating": 4.8,
  "ratingCount": 1000,
  "photos": [],
  "mapsUrl": "string"
}
```

## 16. Fotos

As fotos externas serão tratadas como referências temporárias.

A aplicação deverá:

- evitar armazenamento permanente desnecessário;
- utilizar fallback quando nenhuma foto estiver disponível;
- respeitar regras do provedor;
- aplicar lazy loading.

## 17. Câmbio

A API fornecerá:

```text
GET /api/v1/exchange-rates
```

Exemplo:

```text
/api/v1/exchange-rates?base=BRL&symbols=JPY,USD
```

Resposta:

```json
{
  "data": {
    "base": "BRL",
    "rates": {
      "JPY": 28.4,
      "USD": 0.18
    },
    "updatedAt": "..."
  }
}
```

As cotações serão armazenadas temporariamente em cache.

## 18. Clima

Endpoint:

```text
GET /api/v1/weather
```

Parâmetros:

```text
city
latitude
longitude
```

A API será responsável por consultar e normalizar o provedor meteorológico.

## 19. Passagens

A arquitetura deverá permitir múltiplos provedores.

Interface conceitual:

```text
FlightProvider

searchFlights()
getOffer()
```

Implementações futuras:

```text
ProviderA
ProviderB
ProviderC
```

O frontend não deverá saber qual provedor está sendo utilizado.

## 20. Cache

Dados com alto volume de consultas externas deverão utilizar cache.

Possíveis estratégias:

```text
Cloudflare Cache API
Cloudflare KV
Supabase
```

Exemplos:

```text
Câmbio
TTL: 1 hora

Clima
TTL: 30 minutos

Place Details
TTL: 24 horas

Place Search
TTL: 12 horas
```

## 21. Rate limiting

Endpoints externos deverão possuir controle de uso.

Exemplos:

```text
/places/search

/flights/search

/weather
```

O objetivo é:

- evitar abuso;
- proteger cotas das APIs;
- reduzir custos.

## 22. Logs

A API utilizará logs estruturados.

Exemplo:

```json
{
  "level": "info",
  "requestId": "uuid",
  "method": "GET",
  "path": "/api/v1/places/search",
  "status": 200,
  "durationMs": 120
}
```

Credenciais e JWTs nunca deverão aparecer nos logs.

## 23. Segurança

O projeto deverá seguir as seguintes regras:

- nenhuma credencial no Git;
- secrets armazenados no Cloudflare;
- variáveis públicas claramente separadas;
- validação de entrada;
- sanitização;
- JWT validado na API;
- RLS no banco;
- CORS restritivo;
- rate limiting;
- logs sem informações sensíveis.

## 24. Ambientes

Teremos:

```text
development
staging
production
```

### Development

Ambiente local.

### Staging

Testes integrados antes da produção.

### Production

Aplicação pública.

## 25. Deploy

Frontend:

```text
GitHub
 ↓
GitHub Actions
 ↓
Cloudflare Pages
```

API:

```text
GitHub
 ↓
GitHub Actions
 ↓
Cloudflare Workers
```

Banco:

```text
Supabase migrations
 ↓
Supabase PostgreSQL
```

## 26. CI

Pull requests deverão executar:

```text
Frontend

lint
typecheck
build

Backend

lint
tests
```

Deploy somente deverá ocorrer após validação bem-sucedida.

## 27. Estratégia de desenvolvimento

As funcionalidades deverão ser implementadas verticalmente.

Exemplo:

```text
Feature: Places

1. domínio
2. banco
3. endpoint
4. service
5. integração externa
6. frontend
7. testes
8. documentação
```

Essa estratégia reduz implementações incompletas espalhadas pelo sistema.

## 28. Próximas etapas

Ordem recomendada:

```text
1. Health API

2. Cliente HTTP React → Worker

3. Supabase

4. Auth JWT

5. Trips

6. Places

7. Google Maps / Places

8. Finance

9. Exchange Rates

10. Weather

11. Flights

12. CI/CD

13. Observabilidade

14. Deploy
```
