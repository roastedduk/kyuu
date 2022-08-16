<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import { onMount, onDestroy } from 'svelte'

	let html5QrCode: Html5Qrcode

	const qrCodeSuccessCallback = (decodedText: string) => {
		html5QrCode
			.stop()
			.then((ignore) => {
				console.log(decodedText, 'scan complete')
			})
			.catch((err) => {
				// Stop failed, handle it.
			})
	}

	const qrScannerConfig = {
		fps: 30,
		qrbox: { width: 250, height: 250 }
	}

	const startScanner = async () => {
		await html5QrCode
			.start(
				{ facingMode: 'environment' },
				qrScannerConfig,
				qrCodeSuccessCallback,
				() => {} // ignore errors
			)
			.catch((err) => {
				// if start failed, handle it.
				console.error(err)
			})
	}

	onMount(() => {
		html5QrCode = new Html5Qrcode('reader')
		startScanner()
	})

	onDestroy(() => {
		if (html5QrCode) html5QrCode.stop()
	})
</script>

<div class="w-full h-screen flex flex-col -mt-20">
	<div class="h-4/5 bg-black flex items-center overflow-hidden relative">
		<div class="absolute top-28 text-center w-full z-10 text-white"><h1 class="text-2xl">Scan your friend's QR code</h1></div>
		<div id="reader" class="w-full max-h-full" />
	</div>
	<div class="flex p-6 h-1/5">
		<h1 class="text-2xl">Or input username manually</h1>
	</div>
</div>
