<script lang="ts">
	import Branding from '$lib/assets/images/branding.svg'
	import Profile from '$lib/assets/images/profile.jpg'
	import arrowLeft from '@iconify/icons-tabler/arrow-left'
	import Icon, { addIcon } from '@iconify/svelte/dist/OfflineIcon.svelte'

	addIcon('arrowLeft', arrowLeft)
</script>

<div class="w-full h-full max-w-lg mx-auto flex justify-between items-center px-4">
	<div class="w-8 h-8 text-3xl opacity-0"><Icon icon={arrowLeft} /></div>
	<a href="/"><img width="100rem" src={Branding} alt="Kyuu" class="w-28" /></a>
	<img width="48rem" height="48rem" src={Profile} alt="Profile" class="rounded-full w-10 h-10" />
</div>
