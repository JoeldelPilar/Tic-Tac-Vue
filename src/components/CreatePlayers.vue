<script setup lang="ts">
	import { ref } from 'vue';
	import BaseInput from './base/BaseInput.vue';
	import { Player } from '../models/Player';

	const emits = defineEmits(['startGame']);
	const props = defineProps();

	// Player states

	const playerX = ref<Player>({
		name: '',
		type: 'X',
		state: false,
	});
	const playerO = ref<Player>({
		name: '',
		type: 'O',
		state: false,
	});

	const startGame = () => {
		playerO.value.state = true;
		emits('startGame', [playerX, playerO]);
	};
</script>

<template>
	<section class="create__player__container">
		<BaseInput
			v-model="playerX.name"
			v-if="!playerX.state"
			label="Player X name"
		/>
		<BaseInput
			v-model="playerO.name"
			v-if="playerX?.state"
			label="Player O name"
		/>
		<button
			v-if="!playerX.state"
			@click="playerX.state = true"
		>
			Next Player
		</button>
		<button
			v-else
			@click="startGame"
		>
			Start Game
		</button>
	</section>
</template>

<style scoped>
	.create__player__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
