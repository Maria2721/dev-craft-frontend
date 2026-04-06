# DevCraft

## About

**DevCraft** is a web application for **preparing for JavaScript and TypeScript technical interviews**, with a focus on **frontend** roles. It is built as a capstone team project: the UI talks to a **REST API** provided by a separate [backend service](https://github.com/Maria2721/dev-craft-backend) for authentication, structured learning content, and other server-driven features.

**Who it is for:** students and developers who want a **guided path**—from topic overview and interview-style questions to practical tasks—instead of a scattered set of links and notes.

**What you can do (product goal):** sign up and sign in, explore a **structured curriculum** (topics, theory, questions, and coding-style assignments), and use tooling that supports learning and practice. The team separates **data served from the API/database** from scenarios where an **AI** layer is appropriate (for example hints or chat-style help), so the experience stays predictable where content is curated and flexible where the model adds value.

**Why it exists:** to give learners one place to rehearse common interview themes, drill theory and code, and build confidence before real interviews.

## What we're proud of

We built a **structured knowledge layer** end to end: interview topics, theory questions, and code tasks live in the database and are served through a clear **REST API**, so the UI and automation always share the same source of truth. Learners can submit **question attempts** and use **AI-assisted checks** on code tasks—so model feedback stays tied to a concrete exercise, not only to open chat.

**Dify** is where we keep the heavy **AI** lifting—chat flows, prompts, and **retrieval over our knowledge base**—while the backend focuses on auth, content, throttling, and passing **task context** (topic, prompt, code snippet) into the model. The same ideas extend to a **Discord bot** that talks to **Dify**, with **speech-to-text** for voice messages and **chunked replies** for long answers, so the assistant is useful outside the browser too.

On the backend we expose an **MCP** server (Model Context Protocol): tools like **topic summary** read the same knowledge data as the app, which fits **AI-assisted workflows** in the IDE. We also publish **OpenAPI** and apply **rate limits** on AI-heavy routes so the surface stays clear and predictable as usage grows.

On the **frontend**, we invested in an **interactive roadmap** (topic graph), focused **topic** pages, **social login** alongside classic auth, and an **in-app AI assistant** that is grounded in what the user is studying—not a generic chat widget.

## Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Maria2721">
        <img src="https://github.com/Maria2721.png" width="60" height="60" alt="Maria" /><br/>
        Maria
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Andrey-Yurchuk">
        <img src="https://github.com/Andrey-Yurchuk.png" width="60" height="60" alt="Andrey" /><br/>
        Andrey
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Khabib1802">
        <img src="https://github.com/Khabib1802.png" width="60" height="60" alt="Khabib" /><br/>
        Khabib
      </a>
    </td>
  </tr>
</table>

## Meeting notes

- [2026-02-20 — Project kickoff](meeting-notes/2026-02-20-sync-project-kickoff.md)
- [2026-02-23 — Roadmap and UI](meeting-notes/2026-02-23-sync-roadmap-and-ui.md)
- [2026-03-17 — AI and knowledge base](meeting-notes/2026-03-17-sync-ai-and-knowledge.md)

## Deploy

- https://dev-craft-frontend.netlify.app/

## Demo video

- [DevCraft — demo | Interview prep (JavaScript & TypeScript)](https://youtu.be/yUDCdSWLbUo) (~7 min): main user path, client and backend stack.

## Week 5 proof video

- [Week 5 checkpoint demo](https://youtu.be/oC2j7znBVyA)

## Technology Stack

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
