<script lang="ts">
  import type { ChatMessage } from "../types/ChatMessage.js";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import { afterUpdate } from "svelte";

  export let chatHistory: ChatMessage[] = [];

  let chatContainerElement: HTMLDivElement;
  let shouldAutoScroll = true;
  let previousScrollHeight = 0;

  afterUpdate(() => {
     if (shouldAutoScroll) {
       chatContainerElement.scrollTop = chatContainerElement.scrollHeight;
     } else if (chatContainerElement.scrollHeight > previousScrollHeight) {
         chatContainerElement.scrollTop += chatContainerElement.scrollHeight - previousScrollHeight;
     }
     previousScrollHeight = chatContainerElement.scrollHeight;
  });

  function isNearBottom(): boolean {
    const threshold = 100; // Pixels
    const position = chatContainerElement.scrollHeight - chatContainerElement.scrollTop - chatContainerElement.clientHeight;
    return position <= threshold;
  }

  function handleScroll() {
    shouldAutoScroll = isNearBottom();
  }

  function renderMarkdown(content: string): string {
    const rawHtml = marked(content);
    return DOMPurify.sanitize(rawHtml);
  }
</script>

<div class="chat-interface">
    <div class="chat-history" bind:this={chatContainerElement} on:scroll={handleScroll}>
        {#each chatHistory as message}
            <div class="message {message.role}">
                <div class="message-content">
                    {@html renderMarkdown(message.content)}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .chat-interface {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    .chat-history {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    .message {
        max-width: 80%;
        margin-bottom: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        word-wrap: break-word;
    }

    .user {
        align-self: flex-end;
        background-color: #e3f2fd;
    }

    .assistant {
        align-self: flex-start;
        background-color: #f1f8e9;
    }

    .message-content :global(p) {
        margin: 0 0 0.5em 0;
    }

    .message-content :global(pre) {
        background-color: #f4f4f4;
        padding: 0.5em;
        border-radius: 0.3rem;
        overflow-x: auto;
    }

    .message-content :global(code) {
        background-color: #f4f4f4;
        font-size: 0.9em;
    }
</style>
