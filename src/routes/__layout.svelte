<script>
	import '$lib/assets/css/app.css'
	import '@fontsource/plus-jakarta-sans/400.css'
	import '@fontsource/plus-jakarta-sans/700.css'
	import Header from '$lib/Header.svelte'
</script>

<header class="h-14 w-full fixed top-0 bg-slate-100 backdrop-blur-xl bg-opacity-70 z-30">
	<Header />
</header>

<section class="max-w-lg mx-auto mt-20">
	<slot />
</section>
