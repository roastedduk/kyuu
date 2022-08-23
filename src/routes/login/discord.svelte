<script lang="ts">
    import { page } from '$app/stores'

    const fragment = new URLSearchParams($page.url.toString().slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    const loggedIn = !accessToken;

    let id = ""

    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            id = response.id;
        })
        .catch(console.error);


</script>

<div>
    {#if loggedIn}
        <a href="https://discord.com/api/oauth2/authorize?client_id=1011621759281283103&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin%2Fdiscord&response_type=token&scope=identify">Log
            in</a>
    {/if}
</div>