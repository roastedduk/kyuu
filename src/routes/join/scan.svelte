<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import { onMount } from 'svelte'

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
</script>

<div id="reader" class="h-full w-full" />
