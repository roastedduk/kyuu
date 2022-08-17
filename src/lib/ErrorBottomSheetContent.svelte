<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let title = 'Oops. An error occured.'
	export let message = 'Something went wrong.'
	export let buttonText = 'OK'
    export let image = ''

	export let onButtonClick = () => dispatch('click')
</script>

{#if image.length > 0}
    <img src={image} class="w-48" alt={title} />
{/if}
<h1 class="text-2xl">{title}</h1>
<p>
	{message}
</p>
<button on:click={onButtonClick} class="w-full p-2 bg-cyan-500 text-white rounded-full font-bold"
	>{buttonText}</button
>
