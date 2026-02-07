<template>
  <text
    class="input-display"
    ref="inputDisplay"
    :class="{ retry: props.isRetrying }"
    x="1424"
    y="480"
  >
    {{ props.displayText }}
  </text>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  displayText: {
    type: String,
    required: true,
  },
  isRetrying: {
    type: Boolean,
    required: true,
  },
})

const inputDisplay = ref(null)

let fadeTimeout = null

function forceTextReflow() {
  inputDisplay.value?.getBBox()
}

function glowText() {
  if (!inputDisplay.value) {
    return
  }

  if (fadeTimeout) {
    clearTimeout(fadeTimeout)
  }

  const lighterFill = props.isRetrying ? 'rgba(171, 210, 255, 0.89)' : 'rgba(0, 255, 64, 0.942)'

  inputDisplay.value.style.transition = 'none'
  inputDisplay.value.style.fill = lighterFill

  forceTextReflow()

  inputDisplay.value.style.transition = 'fill 0.3s ease'
  inputDisplay.value.style.fill = ''

  fadeTimeout = window.setTimeout(() => {
    inputDisplay.value.style.transition = 'none'
  }, 280)
}

defineExpose({
  glowText,
})
</script>

<style scoped>
.input-display {
  font-family: 'OCR A Extended';
  font-size: 66px;
  fill: rgba(54, 255, 104, 0.5);
  text-align: center;
  transform: scaleY(1.4);
  dominant-baseline: middle;
  text-anchor: middle;
}

.input-display.retry {
  fill: rgba(116, 181, 255, 0.7);
}
</style>
