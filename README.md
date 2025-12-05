# AI Code Review Assistant

A full-stack MERN application that uses AI (Gemini) to analyze source code, detect bugs, flag security issues, and provide improved code suggestions in clean Markdown with syntax highlighting.

This project was built as part of an AI Builder Assignment to demonstrate end-to-end development, AI integration, and a working user flow.

Live Demo: [AI Code Review Assistant](https://ai-code-review-app-1-rvyl.onrender.com/)

server : https://ai-code-review-app-3e4y.onrender.com
## What the App Does

Paste or write code in a Monaco (VS Code-like) editor

Select the programming language

Click Review → AI generates:

Bug detection

Security concerns

Performance recommendations

Best-practice violations

Suggested corrected version of the code

Review result is rendered beautifully using Markdown + syntax highlighting

Users can:

Copy code

Copy review

Download review as .md

Save and view past reviews (history page)(upcoming)

## Why I Built This

Developers often copy/paste code to ChatGPT to ask “What’s wrong here?”
This project turns that into a focused, dedicated tool with:

A real editor

Structured review output

Saved history

A real backend

Authenticated workflows

A clean UI

This makes the project both practical and production-like.

## Tech Stack
Frontend

React

TailwindCSS

Monaco Editor

React Markdown + Prism Syntax Highlighter

Axios

Backend

Node.js + Express

JWT Authentication

MongoDB + Mongoose

AI Integration (Google Gemini)

AI Model

You may choose:

Gemini 1.5 Flash / 2.0 Flash


Flow:

User pastes code → selects language

Sends request → backend calls AI

AI responds with structured review

Review saved in MongoDB

Frontend displays formatted result

## Environment Variables

Create a .env file in the backend:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

```

## Local Setup
### Clone the repo
```
git clone https://github.com/yourname/ai-code-review.git
cd ai-code-review
```
### Install backend deps
```
cd backend
npm install
npm start
```
### Install frontend deps
```
cd frontend
npm install
npm run dev
```

