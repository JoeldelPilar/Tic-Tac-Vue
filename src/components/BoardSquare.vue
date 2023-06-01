<template>
	<button
		@click="handleClick"
		:class="{ disabled: gotSelected }"
	>
		<span>{{ marker }}</span>
	</button>
</template>

<script setup lang="ts">
	import { ref, toRef, watch } from 'vue';

	const emits = defineEmits(['changePlayer']);

	const props = defineProps({
		index: Number,
		reset: Boolean,
		player: Object,
	});

	const id = props.index;
	const gotSelected = ref(false);
	const marker = toRef('');
	const reset = toRef(props.reset);

	watch(reset, (isReseted, isNotReseted) => {
		console.log(isNotReseted, isReseted);
		if (isReseted) {
			reset.value = true;
			marker.value = '';
		}
	});

	const handleClick = () => {
		marker.value = props.player?.marker;
		gotSelected.value = true;
		emits('changePlayer', id, marker);
	};
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

	.disabled {
		pointer-events: none;
	}
</style>
