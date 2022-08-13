<script lang="ts">
import PlayerCard from "../lib/PlayerCard.svelte";

let playerNames = [
    'ayamg0rengkr1spy',
    'Jane Doe',
]
</script>

<div class="mx-4">
    <div class="w-full flex flex-col items-center space-y-6">
        <h1 class="text-2xl">🎮 Now playing</h1>
        <PlayerCard playerNames="{playerNames}"/>
    </div>
</div>