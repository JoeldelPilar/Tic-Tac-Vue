<template>
	<h2>Tic Tac Toe - app component</h2>

	<div
		class="players__container"
		v-if="!(playerX.isActive && playerO.isActive)"
	>
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
	<!-- Skicka ner spelar namnet och markören till GameBoard -->
	<!-- Ta emot den klickade rutan och skicka till beräkning -->
	<GameBoard
		v-else
		:playerName="currentPlayer.playerName"
		:marker="currentPlayer.marker"
		@playerMove="handlePlayerMove"
	/>
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

	let players: Player[] = [];

	const currentPlayer = ref({
		playerName: '',
		marker: '',
	});

	const savePlayer = (player: Player) => {
		if (player.playerName === '') return;
		player.isActive = true;
		players = [...players, player];
		currentPlayer.value.playerName = players[0].playerName;

		console.log(currentPlayer);
	};

	const handlePlayerMove = (position: number, player: string) => {
		currentPlayer.value.marker = player;
		console.log('klick');
	};
</script>

<style scoped>
	.players__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
