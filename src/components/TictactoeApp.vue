<template>
	<h2>Tic Tac Toe - app component</h2>

	<div class="players__container">
		<BaseInput
			v-if="!playerX.isActive"
			v-model="playerX.playerName"
			label="Enter Player X name"
		/>

		<BaseInput
			v-else
			v-model="playerO.playerName"
			label="Enter Player O name"
		/>

		<button
			v-if="!playerX.isActive"
			@click="savePlayer(playerX)"
		>
			Enter
		</button>
		<button
			v-else
			@click="savePlayer(playerO)"
		>
			Play!
		</button>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import BaseInput from './base/BaseInput.vue';
	import { Player } from '../models/Player';

	/**
	 *  Player states, fixed for the purpose of the game.
	 */

	const playerX = ref<Player>({
		playerName: '',
		marker: 'X',
		isActive: false,
	});

	const playerO = ref<Player>({
		playerName: '',
		marker: 'O',
		isActive: false,
	});

	let players = [] as object[];

	const savePlayer = (player: Player) => {
		if (player.playerName === '') return;
		player.isActive = true;
		players = [...players, player];

		console.log(players);
	};
</script>

<style scoped>
	.players__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
