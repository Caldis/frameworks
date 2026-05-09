# Copilot Instructions for SDFrame

SDFrame is a static, public, read-only reference of software design frameworks.

When working in this repository:

- Keep framework records, generated API files, Markdown docs, and well-known discovery files consistent.
- Run `node scripts/generate-all.js` after changing data or generator scripts.
- Run `npm run build` before publishing.
- Do not add claims that are not true in production. In particular, do not claim OAuth, paid plans, private accounts, SDK packages, CLI tools, MCP registry listings, verified AI-platform integrations, or a live MCP/WebMCP transport unless they actually exist.
- For AI-agent changes, update the relevant public files: `llms.txt`, `llms-full.txt`, `SKILL.md`, `AGENTS.md`, `/openapi.json`, and `/.well-known/*`.

