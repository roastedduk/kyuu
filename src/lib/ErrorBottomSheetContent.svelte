<script lang="ts">
	import Button from './Button.svelte'
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
<Button on:click={onButtonClick} class="w-full">{buttonText}</Button>
