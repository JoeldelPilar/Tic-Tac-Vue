<template>
	<h2>Tic Tac Toe - app component</h2>
	<form
		class="players__container"
		@submit.prevent="savePlayer"
	>
		<BaseInput
			v-model="player"
			label="Enter Player X name"
		/>
		<button>Enter</button>
	</form>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import BaseInput from './base/BaseInput.vue';

	const player = ref<String>('');
	const players = [] as Array<String>;

	const savePlayer = () => {
		if (player === null) return;
		players.push(player.value);
		console.log(players);
		player.value = '';
	};
</script>

<style scoped>
	.players__container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
