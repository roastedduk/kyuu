<script lang="ts">
	let className = ''
	export { className as class }
</script>

<button
	on:click
	{...$$restProps}
	class="w-full py-2 px-6 bg-sky-500 text-white rounded-full font-bold shadow-lg shadow-sky-200 transition-all hover:bg-sky-600 active:scale-95 {className}"
	><slot />
</button>
