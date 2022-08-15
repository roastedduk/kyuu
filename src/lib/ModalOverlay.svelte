<script lang="ts">
	export let hidden = true
</script>

<div on:click class="bg-black opacity-50 w-screen h-screen fixed top-0 left-0 {hidden && 'hidden'}" />
