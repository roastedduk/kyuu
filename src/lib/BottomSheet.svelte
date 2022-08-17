<script lang="ts">
	import ModalOverlay from './ModalOverlay.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let showHandle = false
    export let showOverlay = false
    let className = ''
    
    export { className as class }

    const overlayClick = () => dispatch('overlayClick')
</script>

<div
	class="bg-white w-full p-4 rounded-t-2xl sheet fixed max-w-lg transition-all ease-in-out duration-500 z-20 {className}"
>
	<div class="flex flex-col">
        {#if showHandle} 
            <div class="hover:cursor-grab w-full flex justify-center p-2">
                <div class="w-16 h-1 bg-gray-400 rounded-full" />
            </div>
        {/if}
		<slot/>
	</div>
</div>

<ModalOverlay hidden={!showOverlay} on:click={overlayClick} />

<style>
	.sheet {
		box-shadow: 0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
	}
</style>
