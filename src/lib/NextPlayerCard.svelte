<script lang="ts">
	export let playerNames: string[] = []
    $: combinedNames = playerNames.join(' & ')
</script>

<div class="w-full bg-white rounded-2xl py-3 px-6 flex flex-col">
    <div class="text-sm">20:30</div>
    <div class="font-bold">
        {combinedNames}
    </div>
</div>