<script lang="ts">
	import ModalOverlay from './ModalOverlay.svelte'
	import BottomSheet from './BottomSheet.svelte'
	import { onMount } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	let minimized = true
	let bottomSheet: HTMLElement
	let hammer: HammerManager

	let viewportHeight = 0
	let bottomSheetClass = '-bottom-20'

	let lastActionType = ''
	let enableAnimation = false

	onMount(async () => {
		await import('hammerjs').then((Hammer) => {
			if (bottomSheet) {
				hammer = new Hammer.default(bottomSheet, {
					recognizers: [
						[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
						[Hammer.Tap]
					]
				})
				hammer.on('panstart panup pandown', (event) => {
					enableAnimation = false
					bottomSheet.style.transform = `translateY(${event.deltaY}px)`
				})
				hammer.on('panend panup pandown', (event) => {
					if (event.type === 'panend') {
						if (lastActionType === 'panup') expandCard()
						else minimizeCard()
						bottomSheet.style.transform = `translateY(0px)`
						enableAnimation = true
					} else {
						lastActionType = event.type
					}
					// console.log({ type: event.type, velocity: event.velocityY })
				})
				hammer.on('tap', () => {
					enableAnimation = true
					minimized = !minimized // toggle state
				})
			}
		})
	})

	const expandCard = () => {
		minimized = false
	}

	const minimizeCard = () => {
		minimized = true
	}

	$: {
		if (minimized) {
			bottomSheetClass = '-bottom-[12rem]'
			dispatch('minimize')
		} else {
			bottomSheetClass = '-bottom-4'
			dispatch('expand')
		}
	}
</script>

<svelte:window bind:innerHeight={viewportHeight} />

<div
	bind:this={bottomSheet}
	class="fixed z-50 w-full {enableAnimation && 'transition-all duration-500'} {bottomSheetClass}"
>
	<BottomSheet showHandle={true} on:overlayClick={minimizeCard} class="pb-16">
		<div class=" flex flex-col space-y-6">
			<div class="flex justify-between w-full">
				<div>
					<div class="text-sm">Your position:</div>
					<div class="text-xl font-bold">4</div>
				</div>
				<div>
					<div class="text-sm">Est. wait time:</div>
					<div class="text-xl font-bold">45 mins</div>
				</div>
			</div>
			<div>
				<div class="text-sm">Players:</div>
				<ul class="font-bold">
					<li>RoastedDuck</li>
					<li>Yehez</li>
				</ul>
			</div>
			<button class="self-center uppercase text-red-500 font-bold text-sm">Stop queuing</button>
		</div>
	</BottomSheet>
</div>
<ModalOverlay show={!minimized} on:click={minimizeCard} />
