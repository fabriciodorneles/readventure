# Readventure 🦊📖

Um jogo de leitura para crianças onde **ler em voz alta é a mecânica principal**.

A criança explora um mundo de aventura, encontra uma ponte quebrada e precisa
juntar 5 madeiras — cada madeira é conquistada lendo uma palavra ou frase em voz
alta (reconhecimento de fala em pt-BR). A ponte se reconstrói visivelmente,
revela uma nova área e um baú com um chapéu de aventureira. 🎩

## Rodando localmente

```bash
npm install
npm run dev
```

Abra a URL indicada (o reconhecimento de fala funciona melhor no **Chrome/Edge**;
o microfone exige `localhost` ou HTTPS).

## Modo debug

Adicione `?debug=true` à URL para ver o painel de desenvolvimento:
texto esperado, texto reconhecido, similaridade, e botões para simular
acerto/erro sem usar o microfone.

## Deploy

O deploy é automático via GitHub Actions para o GitHub Pages a cada push na
branch `main` (workflow em `.github/workflows/deploy.yml`).

> Configuração única necessária: em **Settings → Pages**, definir
> **Source: GitHub Actions**.

## Arquitetura (resumo)

- `src/game/` — máquina de estados do jogo + persistência em localStorage
- `src/world/` — cena SVG animada (ponte, rio, raposa, baú, nova área)
- `src/avatar/` — avatar customizável e cosméticos
- `src/reading/` — desafio de leitura; reconhecimento de fala isolado atrás da
  interface `SpeechRecognizer` e avaliação atrás de `SpeechEvaluator`
  (substituíveis por um serviço de avaliação de pronúncia no futuro)
- `src/content/` — prompts de leitura como dados estruturados
- `src/debug/` — painel de desenvolvimento (`?debug=true`)

Sem backend, sem contas, sem armazenamento de áudio.
