<script lang="ts">
  import type { ChatMessage } from "../types/ChatMessage.js";
  import { marked } from "marked";
  import DOMPurify from "dompurify";
  import { afterUpdate } from "svelte";

  export let chatHistory: ChatMessage[] = [];

  let chatContainerElement: HTMLDivElement;
  let shouldAutoScroll = true;
  let previousScrollHeight = 0;
  let codeBlocks: { language: string; code: string}[] = [];

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

  function extractCodeBlocks(content: string): string {
    const codeBlockRegex = /```([\w]+)\n([\s\S]*?)\n```/g;
    let match;
    let processedContent = content;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'plaintext';
      const code = match[2].trim();

      codeBlocks = [...codeBlocks, { language, code }];

      // Replace the code with a placeholder
      processedContent = processedContent.replace(match[0], `[Code Block ${codeBlocks.length}]`);
    }

    return processedContent;
  }

  function processChatMessages(chatMessages: ChatMessage[]): ChatMessage[] {
    codeBlocks = [];
    return chatMessages.map(message => {
      if (message.role == 'assistant') {
        return {...message, content: extractCodeBlocks(message.content)};
      }

      return message;
    });
  }

  $: processedChatHistory = processChatMessages(chatHistory);
</script>

<div class="chat-interface">
    <div class="chat-history" bind:this={chatContainerElement} on:scroll={handleScroll}>
        {#each processedChatHistory as message}
            <div class="message {message.role}">
                <div class="message-content">
                    {@html renderMarkdown(message.content)}
                </div>
            </div>
        {/each}
    </div>
    <div class="artifacts-pane">
        <h2>Code</h2>
        {#each codeBlocks as {language, code}, index}
            <div class="code-block">
                <h3>Code Block {index + 1} ({language})</h3>
                <pre><code class={`language-${language}`}>{code}</code></pre>
            </div>
        {/each}
    </div>
</div>

<style>
    .chat-interface {
        display: flex;
        height: 100%;
        width: 100%;
    }

    .chat-history {
        flex: 2;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    .artifacts-pane {
        flex: 1;
        padding: 1rem;
        background-color: #f5f5f5;
        overflow-y: auto;
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

    .code-block {
        margin-bottom: 1rem;
    }

    .code-block h3 {
        margin-bottom: 0.5rem;
    }

    .code-block pre {
        margin: 0;
        padding: 0.5rem;
        border-radius: 0.3rem;
        background-color: #ffffff;
    }
</style>
