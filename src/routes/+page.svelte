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

<h1>Welcome to Airtifacts v0.1</h1>

<Conversation {chatHistory} />
<MessageInput on:send={handleSendMessage} />
