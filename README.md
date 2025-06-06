🧠 Chatbot: Features & Logic Overview
✅ Key Features:
Interactive Chat UI

Stylish chatbot widget with chat bubbles

Clean and responsive design (HTML, CSS)

Scrollable chat window with auto-scroll

Typing Effect

Displays “Typing…” message before showing bot response for better UX

Basic AI Integration

Uses OpenRouter API with a free AI model (like mistral/mistral-7b-instruct)

Asks questions and gets meaningful replies in real-time

Dynamic Messaging Logic

Differentiates between user and bot messages

Automatically adds new messages to the chat window

Backend API

Node.js + Express server handles POST requests from frontend

Makes secure API call to OpenRouter using environment key (.env)

Embeddable Widget

Can be added to any site via iframe or script tag

Works as a standalone floating assistant

⚙️ Logic Used:
Frontend (JavaScript):

Listens to user input via input box & send button

Sends a POST request to the backend API with the user’s question

Shows "typing..." effect before displaying the response

Backend (Node.js/Express):

Accepts the user query from the frontend

Forwards it to OpenRouter API with AI model details

Sends AI-generated reply back to the frontend

AI Model (via OpenRouter):

Processes natural language queries like:

“How to send money on Paytm?”
“What is Google Maps used for?”

Returns easy, conversational answers
