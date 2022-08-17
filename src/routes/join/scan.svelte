<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import type { CameraDevice } from 'html5-qrcode/esm/core'

	import { onMount, onDestroy } from 'svelte'
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'
	import cameraRotate from '@iconify/icons-tabler/camera-rotate'
	import BottomSheet from '$lib/BottomSheet.svelte'

	addIcon('cameraRotate', cameraRotate)

	enum ErrorCodes {
		NO_CAMERA = 1,
		PERMISSION_DENIED = 2,
		UNKNOWN = 3
	}

	let html5QrCode: Html5Qrcode
	let cameras: CameraDevice[] = []
	let selectedCamera: number = 0
	let isScanning = false
	let errorCode: ErrorCodes;
	let showBottomSheet = false;

	let bottomSheetClasses = '-bottom-full'

	// animation delay for bottom sheet
	$: {
		if (showBottomSheet) {
			setTimeout(() => {
				bottomSheetClasses = 'bottom-0'
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
		await html5QrCode.start(
			useEnvironmentCamera ? { facingMode: "environment" } : cameras[selectedCamera].id,
			qrScannerConfig,
			qrCodeSuccessCallback,
			() => {} // ignore errors
		)
		isScanning = true
	}

	const changeCamera = async () => {
		cameras = await getCameras() // reload cameras
		if (selectedCamera < cameras.length - 1) selectedCamera++
		else selectedCamera = 0
		stopScanner()
		startScanner()
	}

	const getCameras = async () => {
		return await Html5Qrcode.getCameras()
	}

	onMount(async () => {
		html5QrCode = new Html5Qrcode('reader')
		try {
			cameras = await getCameras()
			await startScanner(true)
		} catch (error) {
			if ((error as string).includes('NotAllowedError')) errorCode = ErrorCodes.PERMISSION_DENIED
			console.log(error)
			showBottomSheet = true
		}
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
	<BottomSheet class="fixed z-50 flex flex-col items-center space-y-4 {bottomSheetClasses}" showOverlay={true}>
		<h1 class="text-2xl">Oops!</h1>
		{#if errorCode === ErrorCodes.PERMISSION_DENIED}
			<p>Please grant access to your camera to allow QR scanning.</p>
		{:else if errorCode === ErrorCodes.NO_CAMERA}
			<p>It seems like you don't have any camera installed.</p>
		{:else}
			<p>Something went wrong while turning on the camera. Do you have any installed?</p>
		{/if}
		<button on:click={hideBottomSheet} class="w-full p-2 bg-cyan-500 text-white rounded-full font-bold">Dismiss</button>
	</BottomSheet>
{/if}