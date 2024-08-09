# AIrtifacts

AIrtifacts is a chat window for LLMs that provides a pane for code samples rather than inlining code in the chat window with all the surrounding text.

It is currently only using OpenAI's API. Other LLMs could be supported rather easily by creating a new service and tweaking it to the specific API.

## What is this for?

This was made just for fun to get to know Svelte and do something useful with the OpenAI API.

## Development

Add your OpenAI API key to a `.env` file in the root of the project.

Install dependencies with `npm install` and start a development server with `npm run dev`.
You're now up and running!

## TODO

It would be nice to:
* Add syntax highlighting
* Implement smart scrolling in the code pane when clicking a code block reference in the chat window
* Add a "copy to clipboard" button to code blocks
