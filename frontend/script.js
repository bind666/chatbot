let typingTimeout;

async function handleUserInput() {
    const inputBox = document.getElementById("user-input");
    const query = inputBox.value.trim();
    if (!query) return;

    addMessage(query, "user");
    inputBox.value = "";

    showTypingIndicator(true);

    try {
        const res = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: query }),
        });

        const data = await res.json();

        showTypingIndicator(false);

        addMessage(data.reply || "🤖 No response", "bot");
    } catch (err) {
        showTypingIndicator(false);
        addMessage("❌ Error connecting to AI", "bot");
    }
}

function addMessage(text, sender) {
    const chatWindow = document.getElementById("chat-window");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerText = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator(show) {
    const chatWindow = document.getElementById("chat-window");
    let typingDiv = document.getElementById("typing-indicator");

    if (show) {
        if (!typingDiv) {
            typingDiv = document.createElement("div");
            typingDiv.id = "typing-indicator";
            typingDiv.className = "message bot typing";

            typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      `;

            chatWindow.appendChild(typingDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    } else {
        if (typingDiv) {
            chatWindow.removeChild(typingDiv);
        }
    }
}
