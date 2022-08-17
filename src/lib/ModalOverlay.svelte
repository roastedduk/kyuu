<script lang="ts">
	export let hidden = true
</script>

<div on:click class="bg-black w-screen h-screen fixed top-0 left-0 transition-opacity z-40 {hidden ? 'opacity-0 invisible' : 'opacity-50'}" />
