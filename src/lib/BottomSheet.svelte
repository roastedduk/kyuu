<script lang="ts">
	export let showHandle = false
	let className = ''

	export { className as class }
</script>

<div
	class="bg-white w-full p-4 rounded-2xl sheet max-w-lg transition-all ease-in-out duration-500 {className}"
>
	{#if showHandle}
		<div class="hover:cursor-grab w-full flex justify-center p-2">
			<div class="w-16 h-1 bg-gray-400 rounded-full" />
		</div>
	{/if}
	<slot />
</div>

<style>
	.sheet {
		box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
	}
</style>
