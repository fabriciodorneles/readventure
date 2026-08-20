# Readventure 🦊📖

> 🇺🇸 [English version](README.md)

Um jogo de leitura para crianças onde **ler em voz alta é a mecânica principal**.

**Jogar agora**: https://fabriciodorneles.github.io/readventure/

A criança explora um mundo de aventura em seis missões — cada recurso é
conquistado lendo uma palavra ou frase em voz alta (reconhecimento de fala do
navegador), e o mundo muda visivelmente por causa da leitura:

1. **A Ponte Quebrada** 🪵 — 5 madeiras reconstroem a ponte → chapéu de aventureira
2. **O Jardim Seco** 🌱 — cada leitura faz um canteiro florescer → mochila de exploradora
3. **A Torre Trancada** 💎 — cada leitura acende um cristal na porta → capa mágica
4. **A Caverna Escura** 🏮 — cada lampião aceso clareia a caverna → botas velozes
5. **O Balão Furado** 🎈 — cada leitura cola um remendo até o balão encher → óculos mágicos
6. **O Arco-Íris Apagado** 🌈 — cada leitura pinta uma faixa do arco-íris → varinha de estrelas

Para abrir cada prêmio, a criança lê o nome dele em voz alta. As leituras são
sorteadas de um banco de textos (palavras, frases simples e frases longas), com
gradação de dificuldade dentro de cada missão e sem repetir textos já lidos.

**Idiomas**: Português (pt-BR) e Inglês (en-US) — configurável na área dos pais
(⚙), incluindo o idioma do reconhecimento de voz.

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

O deploy é automático via GitHub Actions para o GitHub Pages a cada push
(workflow em `.github/workflows/deploy.yml`).

> Configuração única necessária: em **Settings → Pages**, definir
> **Source: GitHub Actions**.

## Arquitetura (resumo)

- `src/game/` — máquina de estados das missões + persistência em localStorage
- `src/world/` — cenas SVG animadas (uma por missão)
- `src/avatar/` — avatar customizável e cosméticos equipáveis
- `src/reading/` — desafio de leitura; reconhecimento de fala isolado atrás da
  interface `SpeechRecognizer` e avaliação atrás de `SpeechEvaluator`
  (substituíveis por um serviço de avaliação de pronúncia no futuro)
- `src/content/` — prompts de leitura como dados estruturados (pt e en)
- `src/i18n/` — textos da interface em pt-BR e inglês
- `src/debug/` — painel de desenvolvimento (`?debug=true`)

Sem backend, sem contas, sem armazenamento de áudio. Licença [MIT](LICENSE).
