<template>
	<button>
		<span>
			{{ gamePiece }}
		</span>
	</button>
</template>

<script setup lang="ts">
	defineProps<{ gamePiece: string }>();
</script>

<style scoped>
	button {
		position: relative;
	}

	button:disabled {
		color: hsl(153, 47%, 49%);
	}

	span {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
