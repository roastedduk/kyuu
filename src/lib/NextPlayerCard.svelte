<script lang="ts">
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'
	import dotsVertical from '@iconify/icons-tabler/dots-vertical'

	addIcon('dotsVertical', dotsVertical)

	export let playerNames: string[] = []
	$: combinedNames = playerNames.join(' & ')
</script>

<div class="w-full bg-white rounded-2xl py-3 px-6 flex items-center">
	<div class="w-full">
		<div class="text-sm">20:30</div>
		<div class="font-bold">
			{combinedNames}
		</div>
	</div>
	<div class="text-xl">
		<Icon icon={dotsVertical} />
	</div>
</div>
