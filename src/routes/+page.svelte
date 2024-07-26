<script lang="ts">
    import MessageInput from "../components/MessageInput.svelte";
    import Conversation from "../components/Conversation.svelte";
    import type { ChatMessage } from "../types/ChatMessage.js";

    function handleSendMessage(event: CustomEvent<string>) {
        console.log(event.detail);
    }

    let chatHistory: ChatMessage[] = [];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Conversation {chatHistory} />
<MessageInput on:send={handleSendMessage} />
