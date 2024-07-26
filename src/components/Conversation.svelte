<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card/index.js";
  import type { ChatMessage } from "../types/ChatMessage.js";

  export let chatHistory: ChatMessage[] = [];
</script>

<Card class="mb-4">
    <CardContent class="h-[400px] overflow-y-auto p-4">
        {#each chatHistory as message}
            <div class="mb-2 {message.role === 'user' ? 'text-right' : 'text-left'}">
        <span class="inline-block px-2 py-1 rounded {message.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}">
          <strong>{message.role}:</strong> {message.content}
        </span>
            </div>
        {/each}
    </CardContent>
</Card>
