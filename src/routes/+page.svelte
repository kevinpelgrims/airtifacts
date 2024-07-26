<script lang="ts">
    import MessageInput from "../components/MessageInput.svelte";

    function handleSendMessage(event: CustomEvent<string>) {
        console.log(event.detail);
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<MessageInput on:send={handleSendMessage} />
