# LangChain and LangGraph Demo

A small TypeScript project that exposes a text transformation workflow in two ways: as a LangGraph graph and as a Fastify HTTP API. The graph recognizes requests for uppercase or lowercase conversion and returns a fallback message for other requests. It does not call an LLM.

## Requirements

- Node.js 20
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root. Add your LangSmith settings if you want tracing enabled:

```env
LANGSMITH_API_KEY=your_langsmith_api_key
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=my-langgraph-demo
```

Keep `.env` private; it is excluded from Git.

## Run the API

```bash
npm run dev
```

The Fastify server listens on `http://localhost:3000`. Send a `POST` request to `/chat` with a question:

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"question":"Please convert this to uppercase"}'
```

The `question` must contain `uppercase` or `lowercase` (including the spaced forms `upper case` and `lower case`). Other requests return `Unknown command. Please try again.`

## Run with LangGraph Studio

```bash
npm run langgraph:serve
```

The CLI loads the `agent` graph configured in `langgraph.json` and prints the local Studio URL. If Brave blocks Studio from reaching the local HTTP server, disable Shields for the Studio page and reload, or start with a tunnel:

```bash
npm run langgraph:serve -- --tunnel
```

## Tests

Run the tests once:

```bash
npm test
```

Run them in watch mode:

```bash
npm run test:dev
```

## Project layout

- `src/graph/graph.ts` defines and compiles the LangGraph workflow.
- `src/graph/nodes/` contains the intent, transformation, and response nodes.
- `src/graph/nodes/factory.ts` exports the graph factory used by `langgraph.json`.
- `src/server.ts` defines the Fastify `/chat` route.
- `src/index.ts` starts the HTTP server.
- `tests/` contains API tests.
