# Integração com Google Maps e lugares

## Status

Aprovado.

## Contexto

A aplicação precisa enriquecer o planejamento da viagem com informações visuais e geográficas dos locais cadastrados no roteiro.

Itens como lojas, restaurantes, parques, templos, hotéis e atrações não devem ser exibidos apenas como textos estáticos.

Ao selecionar um local, a aplicação deverá apresentar sua posição no mapa e informações obtidas por meio de um provedor externo.

## Decisão

A aplicação terá integração com a plataforma Google Maps para pesquisa, localização e apresentação de estabelecimentos e atrações.

A integração deverá permitir:

- pesquisar lugares por nome;
- localizar o resultado no mapa;
- exibir marcador do local selecionado;
- obter endereço e coordenadas;
- exibir fotos disponíveis do estabelecimento;
- exibir avaliação e quantidade de avaliações quando disponíveis;
- abrir o local no Google Maps;
- associar o local encontrado a um item do roteiro;
- salvar o identificador externo do lugar no banco de dados.

Exemplo de uso:

Ao selecionar o item `Pokémon Center`, a aplicação deverá pesquisar o estabelecimento correspondente, centralizar o mapa no local e apresentar suas fotos e informações.

## Arquitetura

O frontend não deverá controlar diretamente regras de integração ou armazenar credenciais privadas.

O fluxo previsto será:

```text
Card ou item do roteiro
        ↓
Serviço do frontend
        ↓
API do projeto
        ↓
Provedor de mapas e lugares
        ↓
Resposta normalizada
        ↓
Mapa, galeria e detalhes do local
```

A API deverá normalizar a resposta externa para evitar dependência direta do formato do provedor.

## Modelo de dados

Os locais salvos deverão permitir os seguintes campos:

```text
id
trip_id
external_provider
external_place_id
name
formatted_address
latitude
longitude
rating
user_rating_count
website_url
maps_url
photo_references
created_at
updated_at
```

## Componentes previstos

```text
PlaceSearch
PlaceCard
PlaceDetails
PlacePhotoGallery
TripMap
MapMarker
MapInfoWindow
RouteMap
```

## Experiência de uso

Os cartões de experiências deverão ser interativos.

Ao selecionar um cartão:

1. O item se torna ativo.
2. O mapa centraliza no lugar correspondente.
3. Um marcador é exibido.
4. As fotos disponíveis são carregadas.
5. Um painel mostra nome, endereço e detalhes.
6. O usuário pode adicionar o lugar ao roteiro.
7. O usuário pode abrir o lugar diretamente no Google Maps.

## Segurança

- Nenhuma chave privada deverá ser versionada.
- Variáveis de ambiente deverão ser utilizadas.
- O domínio do frontend deverá ser restringido nas credenciais aplicáveis.
- Requisições sensíveis deverão passar pela API.
- Limites, cache e tratamento de erros deverão ser implementados.
- Referências de fotos deverão ser armazenadas com cuidado, respeitando validade e regras do provedor.

## Evolução futura

A camada de integração deverá permitir a inclusão de provedores alternativos sem alterar os componentes de domínio da aplicação.

Interfaces previstas:

```text
MapProvider
PlaceSearchProvider
PlaceDetailsProvider
PlacePhotoProvider
RouteProvider
```

## Critérios de aceite

- Clicar em um local exibe sua posição no mapa.
- O mapa centraliza no local selecionado.
- Fotos disponíveis aparecem no painel de detalhes.
- É possível abrir o resultado no Google Maps.
- O local pode ser salvo no roteiro.
- Falhas da API exibem uma mensagem adequada.
- A ausência de fotos utiliza uma imagem de fallback.
- As credenciais não aparecem no repositório.
