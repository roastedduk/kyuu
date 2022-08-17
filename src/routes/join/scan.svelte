<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import type { CameraDevice } from 'html5-qrcode/esm/core'

	import { onMount, onDestroy } from 'svelte'
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'
	import cameraRotate from '@iconify/icons-tabler/camera-rotate'
	import BottomSheet from '$lib/BottomSheet.svelte'
	import ErrorBottomSheetContent from '$lib/ErrorBottomSheetContent.svelte'
	import ModalOverlay from '$lib/ModalOverlay.svelte'

	import Squint from '$lib/assets/images/squint.png'
	import Surprised from '$lib/assets/images/surprised.png'

	addIcon('cameraRotate', cameraRotate)

	enum ErrorCodes {
		NO_CAMERA = 1,
		PERMISSION_DENIED = 2,
		UNKNOWN = 3
	}

	let html5QrCode: Html5Qrcode
	let cameras: CameraDevice[] | undefined = []
	let selectedCamera: number = 0
	let isScanning = false
	let errorCode: ErrorCodes
	let showBottomSheet = false

	let bottomSheetClasses = '-bottom-full'

	// animation delay for bottom sheet
	$: {
		if (showBottomSheet) {
			setTimeout(() => {
				bottomSheetClasses = '-bottom-4'
			}, 50)
		}
	}

	const hideBottomSheet = () => {
		bottomSheetClasses = '-bottom-full'

		setTimeout(() => {
			showBottomSheet = false
		}, 300)
	}

	const qrCodeSuccessCallback = async (decodedText: string) => {
		await stopScanner()
		console.log(decodedText)
	}

	const qrScannerConfig = {
		fps: 30,
		qrbox: { width: 250, height: 250 }
	}

	const stopScanner = async () => {
		if (html5QrCode) await html5QrCode.stop()
		isScanning = false
	}

	const startScanner = async (useEnvironmentCamera?: boolean) => {
		return new Promise<void>((resolve) => {
			html5QrCode
				.start(
					useEnvironmentCamera ? { facingMode: 'environment' } : cameras![selectedCamera].id,
					qrScannerConfig,
					qrCodeSuccessCallback,
					() => {} // ignore errors
				)
				.then(() => {
					isScanning = true
					resolve()
				})
				.catch(handleCameraError)
		})
	}

	const handleCameraError = (error: string) => {
		if (error.includes('NotAllowedError')) errorCode = ErrorCodes.PERMISSION_DENIED
		console.log(error)
		showBottomSheet = true
	}

	const changeCamera = async () => {
		cameras = await getCameras() // reload cameras
		if (selectedCamera < cameras!.length - 1) selectedCamera++
		else selectedCamera = 0
		stopScanner()
		startScanner()
	}

	const getCameras = () => {
		return new Promise<CameraDevice[] | undefined>((resolve) => {
			Html5Qrcode.getCameras().then(resolve).catch(handleCameraError)
		})
	}

	onMount(async () => {
		html5QrCode = new Html5Qrcode('reader')
		cameras = await getCameras()
		await startScanner(true)
	})

	onDestroy(() => {
		stopScanner()
	})
</script>

<div class="w-full h-screen flex flex-col -mt-20">
	<div class="h-4/5 bg-black flex items-center overflow-hidden relative">
		<div class="absolute top-28 text-center w-full z-10 text-white">
			<h1 class="text-2xl">Scan your friend's QR code</h1>
		</div>
		<div class="flex flex-col w-full items-center bottom-28 absolute z-10">
			<button
				on:click={changeCamera}
				class="text-white disabled:opacity-30 transition-all"
				disabled={!isScanning}
			>
				<Icon class="text-5xl p-2 bg-white/[.2] rounded-full" icon={cameraRotate} />
			</button>
		</div>

		<div id="reader" class="w-full max-h-full" />
	</div>
	<div class="flex p-6 h-1/5">
		<h1 class="text-2xl">Or input username manually</h1>
	</div>
</div>

{#if showBottomSheet}
	<BottomSheet
		class="fixed z-50 flex flex-col items-center space-y-4 pb-8 {bottomSheetClasses}"
	>
		{#if errorCode === ErrorCodes.PERMISSION_DENIED}
			<ErrorBottomSheetContent
				title="Seriously? No camera?"
				message="You're not making this easy are you? How can I scan the code then?"
				buttonText="sorry uwu i'll input manually"
				image={Squint}
				on:click={hideBottomSheet}
			/>
		{:else if errorCode === ErrorCodes.NO_CAMERA}
			<ErrorBottomSheetContent
				title="Can't find any camera"
				message="It seems like you don't have any camera installed."
				buttonText="Input username manually"
				image={Squint}
				on:click={hideBottomSheet}
			/>
		{:else}
			<ErrorBottomSheetContent
				title="Something went wrong"
				message="Can't use the camera. Do you have any installed?"
				buttonText="Input username manually"
				image={Surprised}
				on:click={hideBottomSheet}
			/>
		{/if}
	</BottomSheet>
	<ModalOverlay show={true} on:click={hideBottomSheet} />
{/if}
