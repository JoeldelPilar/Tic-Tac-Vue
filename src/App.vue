<template>
	<main>
		<h1>
			Tic Tac
			<img
				src="./assets/vue.svg"
				alt="Letter V in green color"
			/>
		</h1>
		<TictactoeApp />
	</main>
</template>

<script setup lang="ts">
	import TictactoeApp from './components/TictactoeApp.vue';
</script>

<style scoped></style>
