<template>
  <div class="contadores">
    <app-contador :key="c" v-for="c in 5" />
  </div>
</template>

<script>
import Contador from "./Contador.vue";

export default {
  components: { "app-contador": Contador },
};
</script>

<style></style>
