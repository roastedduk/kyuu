<script lang="ts">
	import PlayerCard from '$lib/PlayerCard.svelte'
	import NextPlayerCard from '$lib/NextPlayerCard.svelte'
	import QueueSheet from '$lib/QueueSheet.svelte'
	import Button from '$lib/Button.svelte'
	import { goto } from '$app/navigation'

	let playerNames = ['ayamg0rengkr1spy', 'Jane Doe']

	let queueSheetExpanded = false

	const joinQueue = () => {
		goto('/join/scan')
	}
</script>

<div class="mx-4 mb-48">
	<div class="w-full flex flex-col items-center space-y-8">
		<div class="w-full flex flex-col items-center space-y-4">
			<h1 class="text-2xl">🎮 Now playing</h1>
			<PlayerCard {playerNames} />
		</div>
		<div class="w-full flex flex-col items-center space-y-4">
			<h1 class="text-2xl">▶️ Up next (3)</h1>
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
			<NextPlayerCard {playerNames} />
		</div>
		<div
			class="fixed z-50 w-full max-w-lg mx-auto flex justify-end transition-all duration-500"
			style="bottom: {queueSheetExpanded ? '18rem' : '7rem'};"
		>
			<div class="w-full pointer-events-none" />
			<Button
				class="w-auto shrink-0 mr-4 sm:mr-0 {queueSheetExpanded && 'shadow-black/20'}"
				on:click={joinQueue}>Join queue</Button
			>
		</div>
	</div>
</div>

<QueueSheet
	on:expand={() => (queueSheetExpanded = true)}
	on:minimize={() => (queueSheetExpanded = false)}
/>
