<script lang="ts">
	export let show = false
</script>

<div
	on:click
	class="bg-black w-screen h-screen fixed top-0 left-0 transition-opacity z-40 {!show
		? 'opacity-0 invisible'
		: 'opacity-50'}"
/>
