<script lang="ts">
    import MessageInput from "../components/MessageInput.svelte";
    import Conversation from "../components/Conversation.svelte";
    import type { ChatMessage } from "../types/ChatMessage.js";
    import { OpenAiClient } from "../services/openai.js";

    async function handleSendMessage(event: CustomEvent<string>) {
        const message = event.detail;
        chatHistory = [...chatHistory, { role: 'user', content: message }];

        try {
          const response = await OpenAiClient.sendMessage(chatHistory);
          chatHistory = [...chatHistory, { role: 'assistant', content: response }];
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    let chatHistory: ChatMessage[] = [];
</script>

<main>
    <div class="header">
        <h1>Welcome to Airtifacts v0.1</h1>
    </div>
    <div class="chat-container">
        <Conversation {chatHistory} />
    </div>
    <div class="chat-input">
        <MessageInput on:send={handleSendMessage} />
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    .header {
        padding: 1rem;
        background-color: #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-container {
        flex-grow: 1;
        overflow: hidden;
    }

    .chat-input {
        padding: 1rem;
        background-color: #f0f0f0;
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
    }
</style>
