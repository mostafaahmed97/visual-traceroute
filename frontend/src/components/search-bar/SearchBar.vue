<template>
  <div class="search-bar">
    <input
      v-model="state.url"
      type="text"
      placeholder="Type a url... (Ex: github.com)"
      @keyup:enter="start()"
    />
    <button v-if="!globeState.isLoading" class="ctrl-btn" @click="start()">
      Trace
    </button>

    <button v-if="globeState.isLoading" class="ctrl-btn" @click="cancel()">
      Stop
    </button>

    <div v-if="globeState.isLoading" class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useGlobeStore } from '../../store/globe';

const state = reactive({
  url: '',
});

const { startTrace, cancelTrace, state: globeState } = useGlobeStore();

function start() {
  if (!state.url) return;
  startTrace(state.url);
}

function cancel() {
  cancelTrace();
}
</script>

<style lang="scss" scoped>
.search-bar {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50px;
  left: 50%;
  transform: translate(-50%);

  .ctrl-btn {
    position: relative;
    padding: 10px 20px;
    border-radius: 7px;
    border: 1px solid rgb(61, 106, 255);
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    background: #000;
    color: #fff;
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;

    &:hover {
      background: rgb(61, 106, 255);
      box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
    }

    &::before {
      -webkit-animation: sh02 0.5s 0s linear;
      -moz-animation: sh02 0.5s 0s linear;
      animation: sh02 0.5s 0s linear;
    }

    &::before {
      content: '';
      display: block;
      width: 0px;
      height: 86%;
      position: absolute;
      top: 7%;
      left: 0%;
      opacity: 0;
      background: transparent;
      box-shadow: 0 0 50px 30px #fff;
      -webkit-transform: skewX(-20deg);
      -moz-transform: skewX(-20deg);
      -ms-transform: skewX(-20deg);
      -o-transform: skewX(-20deg);
      transform: skewX(-20deg);
    }

    &:active {
      box-shadow: 0 0 0 0 transparent;
      -webkit-transition: box-shadow 0.2s ease-in;
      -moz-transition: box-shadow 0.2s ease-in;
      transition: box-shadow 0.2s ease-in;
    }
  }

  input {
    width: 100%;
    min-width: 200px;
    max-width: 220px;
    padding: 12px;
    border-radius: 12px;
    border: 1.5px solid lightgrey;
    outline: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0px 0px 20px -18px;

    margin-bottom: 1rem;

    &:hover {
      border: 2px solid lightgrey;
      box-shadow: 0px 0px 20px -17px;
    }

    // &:active {
    //   transform: scale(0.95);
    // }

    &:focus {
      border: 2px solid grey;
    }

    @keyframes sh02 {
      from {
        opacity: 0;
        left: 0%;
      }

      50% {
        opacity: 1;
      }

      to {
        opacity: 0;
        left: 100%;
      }
    }
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 18px;
    left: 18px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 36px;
    height: 36px;
    opacity: 0;
  }
}
</style>
