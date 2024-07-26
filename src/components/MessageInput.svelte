<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Textarea } from '$lib/components/ui/textarea';

  const dispatch = createEventDispatcher<{send: string}>();
  let message = '';

  function handleSubmit() {
    if (message.trim()) {
      dispatch('send', message);
      message = '';
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-2">
    <Textarea type="text" bind:value={message} placeholder="Type your message..." class="flex-grow" />
    <Button type="submit">Send</Button>
</form>
