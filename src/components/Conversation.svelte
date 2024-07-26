<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card/index.js";
  import type { ChatMessage } from "../types/ChatMessage.js";
  import { marked } from "marked";
  import DOMPurify from "dompurify";

  export let chatHistory: ChatMessage[] = [];

  function renderMarkdown(content: string): string {
    const rawHtml = marked(content);
    return DOMPurify.sanitize(rawHtml);
  }
</script>

<Card class="mb-4">
    <CardContent class="h-[400px] overflow-y-auto p-4">
        {#each chatHistory as message}
            <div class="mb-2 {message.role === 'user' ? 'text-right' : 'text-left'}">
        <span class="inline-block px-2 py-1 rounded {message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'} chat-message">
          <strong>{message.role}:</strong>{@html renderMarkdown(message.content)}
        </span>
            </div>
        {/each}
    </CardContent>
</Card>

<style>
    :global(.chat-message p) {
        margin-bottom: 0.5em;
    }
    :global(.chat-message pre) {
        background-color: #f4f4f4;
        margin-bottom: 0.5em;
        padding: 0.5em;
        border-radius: 4px;
        overflow-x: auto;
    }
    :global(.chat-message code) {
        background-color: #f4f4f4;
        padding: 0.2em 0.4em;
        border-radius: 3px;
    }
</style>
