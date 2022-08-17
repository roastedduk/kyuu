<script lang="ts">
	import ModalOverlay from './ModalOverlay.svelte'
	import BottomSheet from './BottomSheet.svelte'

	let sheet: Element
	let minimized = true

	const expandCard = (event: Event) => {
		minimized = !minimized
	}
</script>

<BottomSheet showHandle={true} showOverlay={!minimized} on:overlayClick={expandCard} class={minimized ? '-bottom-20' : 'bottom-0'}>
	<div>content</div>
	<button on:click={expandCard}>Expand</button>
	<p>
		askdjaslkdjlkajsdkljalskjdlkjalsjdlkajskld jlkasjdlkjaslkd jklasjdlkajslkdjaklsjdlkaj
		sldkjaskljdlkajslkdjlakjslkdjslkjdklasjdlkajslkjd
	</p>
</BottomSheet>
