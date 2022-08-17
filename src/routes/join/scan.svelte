<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import type { CameraDevice } from 'html5-qrcode/esm/core'

	import { onMount, onDestroy } from 'svelte'
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'
	import cameraRotate from '@iconify/icons-tabler/camera-rotate'

	addIcon('cameraRotate', cameraRotate)

	let html5QrCode: Html5Qrcode
	let cameras: CameraDevice[] = []
	let selectedCamera: number = -1
	let isScanning = false

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
		if (selectedCamera !== -1 && selectedCamera < cameras.length - 1) selectedCamera++
		else selectedCamera = 0
		stopScanner()
		startScanner()
	}

	const getCameras = async () => {
		return await Html5Qrcode.getCameras()
	}

	onMount(async () => {
		html5QrCode = new Html5Qrcode('reader')
		cameras = await getCameras()
		await startScanner()
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
