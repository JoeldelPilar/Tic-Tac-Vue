<template>
	<label for="username"> {{ label }} </label>
	<input
		id="username"
		v-bind="$attrs"
		:placeholder="label"
		:value="modelValue"
		@input="emitToParent"
	/>
</template>

<script setup lang="ts">
	const emits = defineEmits(['update:modelValue']);

	defineProps({
		label: {
			type: String,
			default: '',
		},
		modelValue: {
			type: [String, Number] || null,
			default: '',
		},
	});

	const emitToParent = (event: Event) => {
		const thisInputValue = (event.target as HTMLInputElement).value;
		emits('update:modelValue', thisInputValue);
	};
</script>

<style scoped>
	input {
		margin-block-end: 1rem;
	}
</style>
