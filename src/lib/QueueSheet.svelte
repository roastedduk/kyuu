<script lang="ts">
	import ModalOverlay from './ModalOverlay.svelte'

	let sheet: Element
	let minimized = true

	const expandCard = (event: Event) => {
		minimized = !minimized
	}
</script>

<div
	class="bg-white w-full p-4 rounded-t-2xl sheet fixed max-w-lg transition-all ease-in-out duration-500 z-20 {minimized
		? '-bottom-20'
		: 'bottom-0'}"
	bind:this={sheet}
>
	<div class="flex flex-col">
		<div class="hover:cursor-grab w-full flex justify-center p-2">
			<div class="w-16 h-1 bg-gray-400 rounded-full" />
		</div>
		<div>content</div>
		<button on:click={expandCard}>Expand</button>
		<p>
			askdjaslkdjlkajsdkljalskjdlkjalsjdlkajskld jlkasjdlkjaslkd jklasjdlkajslkdjaklsjdlkaj
			sldkjaskljdlkajslkdjlakjslkdjslkjdklasjdlkajslkjd
		</p>
	</div>
</div>

<ModalOverlay hidden={minimized} />

<style>
	.sheet {
		box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
	}
</style>
