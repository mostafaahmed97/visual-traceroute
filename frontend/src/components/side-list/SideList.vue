<template>
  <div class="side-list card">
    <div class="card-content">
      <div v-if="globeState.hops.length == 0" class="information-text">
        Trace information will be displayed here
      </div>
      <trace-step v-else v-for="hop in globeState.hops" :hop="hop">
      </trace-step>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TraceStep from '../trace-step/TraceStep.vue';
import { useGlobeStore } from '../../store/globe';

const { state: globeState } = useGlobeStore();
</script>

<style lang="scss">
.card {
  position: absolute;
  right: 0px;
  top: 50%;
  right: 50px;
  transform: translate(-0%, -50%);

  width: 250px;
  height: 66vh;
  border-radius: 20px;
  padding: 5px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);

  .card-content {
    background: rgb(5, 6, 45);
    border-radius: 17px;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
  }

  .information-text {
    margin: auto 1rem;
    color: #afafaf;
    font-size: small;
    align-self: center;
    width: 66%;
    text-align: center;
    font-style: italic;
  }
}
</style>
