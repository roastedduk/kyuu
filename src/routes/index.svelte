<script lang="ts">
import PlayerCard from "../lib/PlayerCard.svelte";
import NextPlayerCard from "../lib/NextPlayerCard.svelte";

let playerNames = [
    'ayamg0rengkr1spy',
    'Jane Doe',
]
</script>

<div class="mx-4">
    <div class="w-full flex flex-col items-center space-y-8">
        <div class="w-full flex flex-col items-center space-y-4">
            <h1 class="text-2xl">🎮 Now playing</h1>
            <PlayerCard playerNames="{playerNames}"/>
        </div>
        <div class="w-full flex flex-col items-center space-y-4">
            <h1 class="text-2xl">▶️ Up next (3)</h1>
            <NextPlayerCard playerNames="{playerNames}"/>
            <NextPlayerCard playerNames="{playerNames}"/>
            <NextPlayerCard playerNames="{playerNames}"/>
        </div>
    </div>
</div>