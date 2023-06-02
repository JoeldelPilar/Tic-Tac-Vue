<script setup lang="ts">
	import { PropType } from 'vue';
	import { score } from '../models/IScore';

	const props = defineProps({
		scores: Array as PropType<score[]>,
	});
</script>

<template>
	<div
		class="scores__text"
		v-for="prop in props.scores"
		:key="prop.name"
	>
		{{ prop.name }} {{ prop.points }}
	</div>
</template>

<style scoped>
	.scores__text {
		font-size: 2rem;
		font-weight: 700;
	}
</style>
