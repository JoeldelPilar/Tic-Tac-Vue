<script setup lang="ts">
	import { ref } from 'vue';
	import TicTacBoard from './TicTacBoard.vue';
	import CreatePlayers from './CreatePlayers.vue';
	import ScoreBoard from './ScoreBoard.vue';
	import { score } from '../models/IScore';
	import { Player } from '../models/Player';

	const playersList = ref<Player[]>(
		JSON.parse(localStorage.getItem('players') || '[]')
	);
	const scoreboard = ref(false);
	const scoreboardValues = ref<score[]>([]);

	const setupGame = (players: Player[]) => {
		playersList.value = players;
		localStorage.setItem('players', JSON.stringify(playersList.value));
		console.log(playersList.value);
	};

	const showScoreboard = (score: score[]) => {
		scoreboard.value = !scoreboard.value;
		scoreboardValues.value = score;
		console.log('click');
	};

	const resetGame = () => {
		playersList.value = [];
	};
</script>

<template>
	<div v-if="playersList.length < 2">
		<CreatePlayers @startGame="setupGame" />
	</div>
	<div v-if="playersList.length === 2">
		<TicTacBoard
			:playersList="playersList"
			@showScoreboard="showScoreboard"
			@startOver="resetGame"
		/>
	</div>

	<teleport to="body">
		<div
			v-if="scoreboard"
			class="modal"
		>
			<ScoreBoard :scores="scoreboardValues" />
			<button
				class="close__scoreboard__btn"
				@click="scoreboard = false"
			>
				close
			</button>
		</div>
	</teleport>
</template>

<style scoped>
	.modal {
		position: absolute;
		inset: 0;
		margin: auto;
		background-color: hsla(211, 28%, 29%, 0.815);
		width: 50%;
		height: 50%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.close__scoreboard__btn {
		margin-block-start: 2rem;
	}
</style>
