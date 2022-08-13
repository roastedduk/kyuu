<script>
	import '$lib/assets/css/app.css'
	import '@fontsource/plus-jakarta-sans/400.css'
	import '@fontsource/plus-jakarta-sans/700.css'
	import Header from '$lib/Header.svelte'
</script>

<header class="h-20 w-full fixed top-0 bg-slate-100">
	<Header/>
</header>

<section class="max-w-lg mx-auto mt-24">
	<slot />
</section>
