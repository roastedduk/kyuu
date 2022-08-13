<script lang="ts">
	export let playerNames: string[] = []
</script>

<div class="w-full bg-sky-200 rounded-2xl p-6 flex flex-col items-center text-sky-800 font-bold text-xl space-y-2">
    {#each playerNames as name}
        <div>{name}</div>
    {/each}
</div>