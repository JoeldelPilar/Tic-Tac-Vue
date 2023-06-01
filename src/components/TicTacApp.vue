<template>
	<h2>Let's Play!</h2>

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
			@click="nextPlayer"
		>
			Enter
		</button>
		<button
			v-else
			@click="startGame"
		>
			Play!
		</button>
	</div>

	<section
		v-else
		class="board__container"
	>
		<h2 v-if="!winner.isActive">
			{{ activePlayer.playerName }}'s turn to make a move!
		</h2>
		<h2 v-if="winner.isActive">{{ winner.playerName }} won, 🥳</h2>
		<div class="board__container--grid">
			<SingleSquare
				class="gameboard__square"
				v-for="square in board"
				:key="square.id"
				@click="handlePlayerMove(square.id)"
				:gamePiece="square.mark"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import BaseInput from './base/BaseInput.vue';
	import { Player } from '../models/Player';
	import { board } from '../models/Board';
	import SingleSquare from './SingleSquare.vue';

	/**
	 *  Player states, fixed for the purpose of the game.
	 */
	console.log(board);
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

	const activePlayer = ref<Player>({
		playerName: '',
		marker: '',
		isActive: false,
	});

	const currentGamePiece = ref('');

	// const playedSquares = ref(board);

	const winner = ref<Player>({
		playerName: '',
		marker: '',
		isActive: false,
	});

	const resetSquares = ref(false);

	/**
	 * Functions to get started with the game & interactivity for players during the game.
	 */

	const nextPlayer = () => {
		playerX.value.isActive = true;
	};

	const startGame = () => {
		playerO.value.isActive = true;
		activePlayer.value = playerX.value;
	};

	const startNewGame = () => {
		activePlayer.value = playerX.value;
		// playedSquares.value = [];
		resetSquares.value = true;
		winner.value = { playerName: '', marker: '', isActive: false };
		console.log('Click');
	};

	/**
	 * Function to switch player when current player made a move and check if there is a winner or not.
	 * @param id the specific square that was seleceed/cliked.
	 * @param player the marker ( X or O ) that made the click.
	 */
	const handlePlayerMove = (id: number) => {
		board.value = board.value.map((square) => {
			if (square.id === id) {
				return { ...square, mark: activePlayer.value.marker };
			}
		});
		activePlayer.value =
			activePlayer.value === playerX.value ? playerO.value : playerX.value;

		calculateWinner();
	};

	const calculateWinner = () => {
		const winningCombinations = [
			[1, 2, 3], // Horisontal lines
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7], // Vertical lines
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9], // Diagonal lines
			[3, 5, 7],
		];

		winningCombinations.forEach((combination) => {
			const [a, b, c] = combination;

			const squareA = board.value.find((square) => square.id === a);
			const squareB = board.value.find((square) => square.id === b);
			const squareC = board.value.find((square) => square.id === c);

			if (
				squareA &&
				squareB &&
				squareC &&
				squareA.mark === squareB.mark &&
				squareA.mark === squareC.mark
			) {
				if (squareA.mark === 'X') {
					winner.value = playerX.value;
				} else if (squareA.mark === 'O') {
					winner.value = playerO.value;
				} else {
					return;
				}
			}
		});
	};
</script>

<style scoped>
	.players__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.board__container {
		position: relative;
	}
	.board__container--grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
		padding: 3rem;
		border: 2px solid hsl(153, 47%, 49%);
		border-radius: 1rem;
	}

	.gameboard__square {
		border: 2px solid hsl(211, 28%, 29%);
		padding: 3rem;
		font-size: 2rem;
		font-weight: bold;
	}

	.current__player__text {
		font-size: 2rem;
		text-transform: uppercase;
	}

	.game__over {
		pointer-events: none;
	}
</style>
