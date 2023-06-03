<script setup lang="ts">
	import { PropType, onMounted, ref } from 'vue';
	import { Square, squares } from '../models/Squares';
	import { Player } from '../models/Player';
	import { score } from '../models/IScore';

	onMounted(() => {
		const savedBoard = JSON.parse(
			localStorage.getItem('gameBoard') || `${squares}`
		);
		calculateWinner(savedBoard);
	});

	interface TicTacToeBoardProps {
		playersList: Player[];
	}

	const emits = defineEmits(['showScoreboard', 'startOver']);

	const props = defineProps<TicTacToeBoardProps>();
	// playerX: Player,
	// playerO: Player,

	const gameBoard = ref<Square[]>(
		JSON.parse(localStorage.getItem('gameBoard') || `${squares}`)
	);

	const playerX = props.playersList[0];
	const playerO = props.playersList[1];
	const player = ref(
		JSON.parse(localStorage.getItem('activePlayer') || `${playerX}`)
	);
	const winner = ref<Player>({
		name: '',
		type: '',
		state: false,
	});
	const draw = ref(false);
	const scores = ref<score[]>(
		JSON.parse(localStorage.getItem('scores') || '[]')
	);

	console.log(playerX, playerO);

	const handlePlayerMove = (squareId: number) => {
		player.value = player.value === playerX ? playerO : playerX;
		const placeMarker = gameBoard.value.map((square) => {
			if (square.id === squareId) {
				return {
					...square,
					mark: player.value === playerX ? 'O' : 'X',
					disabled: true,
				};
			}
			localStorage.setItem('activePlayer', JSON.stringify(player.value));
			return square;
		});
		gameBoard.value = placeMarker;
		localStorage.setItem('gameBoard', JSON.stringify(gameBoard.value));
		calculateWinner(placeMarker);
	};

	const calculateWinner = (gameboard: Square[]) => {
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

			const squareB = gameboard.find((square) => square.id === b);
			const squareC = gameboard.find((square) => square.id === c);
			const squareA = gameboard.find((square) => square.id === a);

			if (
				squareA &&
				squareB &&
				squareC &&
				squareA.mark === squareB.mark &&
				squareA.mark === squareC.mark
			) {
				if (squareA.mark === 'X') {
					winner.value = playerX;
				} else if (squareA.mark === 'O') {
					winner.value = playerO;
				} else {
					return;
				}
				setScore(winner.value.name);
			}

			const itsDraw = gameboard.every((square) => square.disabled);
			if (itsDraw) {
				draw.value = true;
			}
		});
	};

	const setScore = (winner: string) => {
		const player = scores.value?.find((player) => player.name === winner);
		if (player) {
			player.points += 1;
		} else {
			scores.value = [...scores.value, { name: winner, points: 1 }];
		}
		localStorage.setItem('scores', JSON.stringify(scores.value));
	};

	const startNewGame = () => {
		gameBoard.value.map((square) => {
			square.disabled = false;
			square.mark = '';
			draw.value = false;
			winner.value = { name: '', type: '', state: false };
		});
	};

	const openScoreboard = () => {
		emits('showScoreboard', scores.value);
	};

	const totalResetGame = () => {
		emits('startOver');
		scores.value = [];
		localStorage.removeItem('scores');
		localStorage.removeItem('players');
		localStorage.removeItem('gameBoard');
		startNewGame();
	};
</script>

<template>
	<!-- Messages to players, depending on state of the game -->
	<h2 v-if="winner.state === false && draw === false">
		{{ player?.name }}'s turn to move
	</h2>
	<h2 v-else-if="winner.state === true || draw === false">
		{{ winner.name }} is the Winner!, 🥳
	</h2>
	<h2 v-else>Its a Draw ⚒️</h2>

	<div class="tic__tac__board">
		<button
			class="square"
			v-for="square in gameBoard"
			:key="square.id"
			:disabled="square.disabled || winner.state"
			@click="handlePlayerMove(square.id)"
		>
			<span class="square__marker">
				{{ square.mark }}
			</span>
		</button>
	</div>
	<div class="button__container">
		<button
			class="player__interactive__btn"
			@click="startNewGame"
		>
			new game
		</button>
		<button
			class="player__interactive__btn"
			@click="openScoreboard"
		>
			Scoreboard
		</button>
		<button
			class="player__interactive__btn reset__btn"
			@click="totalResetGame"
		>
			reset game
		</button>
	</div>
</template>

<style scoped>
	.tic__tac__board {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.5rem;
		padding: 2rem;
		border: 2px solid #42b883;
		border-radius: 1rem;
		margin-block-end: 2rem;
	}
	.square {
		position: relative;
		border: 2px solid #42b883;
		padding: 3rem;
	}

	.square__marker {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	button:disabled {
		color: #42b883;
		font-size: 3rem;
	}

	.button__container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.player__interactive__btn {
		text-transform: uppercase;
	}

	.reset__btn {
		background-color: #b84a42;
	}
</style>
