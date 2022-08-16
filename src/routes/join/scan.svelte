<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode'
	import { onMount, onDestroy } from 'svelte'
    import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'
	import cameraRotate from '@iconify/icons-tabler/camera-rotate'

    addIcon('cameraRotate', cameraRotate)

	let html5QrCode: Html5Qrcode
    let cameraId: any
    let cameraIdPosition: number = 0 

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
				cameraId,
				qrScannerConfig,
				qrCodeSuccessCallback,
				() => {} // ignore errors
			)
			.catch((err) => {
				// if start failed, handle it.
				console.error(err)
			})
	}

    const changeCamera = () => {
        cameraIdPosition++
        html5QrCode.stop()
        checkCameraId()
    }

    const checkCameraId = async () => {
        await Html5Qrcode
                .getCameras()
                .then(devices => {
                    if (devices && devices.length) {
                        if(cameraIdPosition === devices.length) {
                            cameraIdPosition = 0
                        }
                        cameraId = devices[cameraIdPosition].id
                        startScanner()
                    }
                })
    }

	onMount(async () => {
		html5QrCode = new Html5Qrcode('reader')
        await checkCameraId()
	})

	onDestroy(() => {
		if (html5QrCode) html5QrCode.stop()
	})
</script>

<div class="w-full h-screen flex flex-col -mt-20">
	<div class="h-4/5 bg-black flex items-center overflow-hidden relative">
		<div class="absolute top-28 text-center w-full z-10 text-white"><h1 class="text-2xl">Scan your friend's QR code</h1></div>
		<div on:click={changeCamera} class="absolute bottom-28 flex flex-col items-center w-full z-10 text-white "><Icon class="text-4xl p-1 bg-white/[.08] rounded-full" icon={cameraRotate} /></div>
		<div id="reader" class="w-full max-h-full" />
	</div>
	<div class="flex p-6 h-1/5">
		<h1 class="text-2xl">Or input username manually</h1>
	</div>
</div>
