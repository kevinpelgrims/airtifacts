<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Textarea } from '$lib/components/ui/textarea';
  import { SendHorizontal } from "lucide-svelte";

  const dispatch = createEventDispatcher<{send: string}>();
  let message = '';

  function handleSubmit() {
    if (message.trim()) {
      dispatch('send', message);
      message = '';
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          handleSubmit();
      }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-2">
    <Textarea bind:value={message} placeholder="Type your message..." class="flex-grow" on:keydown={handleKeyDown} />
    <Button type="submit" class="self-center">
        Send
        <SendHorizontal class="ms-2 h-4 w-4" />
    </Button>
</form>
