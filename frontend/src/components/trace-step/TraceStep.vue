<template>
  <div class="trace-step">
    <div class="notification">
      <div class="notiglow"></div>

      <div class="notiborderglow"></div>

      <div class="notititle">{{ hopTitle }}</div>

      <div v-if="isSuccessful" class="notibody">
        <span v-show="hopInfo.ip"> <b>IP: </b> {{ hopInfo.ip }} <br /> </span>

        <span v-show="hopInfo.ISP">
          <b>ISP: </b> {{ hopInfo.ISP }} <br />
        </span>

        <span v-show="hopInfo.organization">
          <b>Organization: </b> {{ hopInfo.organization }} <br />
        </span>
      </div>
      <div v-else class="notibody">
        {{ failureDescription }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Hop } from '@/types';
import { computed, defineProps } from 'vue';

const props = defineProps(['hop']);

const isSuccessful = computed(() => {
  return props.hop.success || false;
});

const hopInfo = computed(() => props.hop.hopInfo);

const hopTitle = computed(() => {
  if (!props.hop.success) {
    const reason = props.hop.failureReason;

    if (reason == 'timeout') return 'Timed out';
    if (reason == 'private') return 'Private';

    return '';
  } else {
    const info: Hop = props.hop.hopInfo;

    if (!info) return '';

    return `${info.city} - ${info.country}`;
  }
});

const failureDescription = computed(() => {
  const reason = props.hop.failureReason;

  if (reason == 'timeout') return 'Request exceeded time limit.';
  if (reason == 'private') return 'Hop is a private router.';
});
</script>

<style lang="scss">
.trace-step {
  padding: 0.5rem;
  color: #fff;
}

.notification {
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: 100%;
  height: fit-content;
  padding-top: 0.25rem;
  padding-bottom: 1.5rem;
  background: #29292c;
  border-radius: 1rem;
  overflow: hidden;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: small;
  --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
  --color: #32a6ff;
}

.notification:before {
  position: absolute;
  content: '';
  inset: 0.0625rem;
  border-radius: 0.9375rem;
  background: #18181b;
  z-index: 2;
}

.notification:after {
  position: absolute;
  content: '';
  width: 0.25rem;
  inset: 0.65rem auto 0.65rem 0.5rem;
  border-radius: 0.125rem;
  background: var(--gradient);
  transition: transform 300ms ease;
  z-index: 4;
}

.notification:hover:after {
  transform: translateX(0.15rem);
}

.notititle {
  color: var(--color);
  padding: 0.65rem 0.25rem 0.4rem 1.25rem;
  font-weight: 500;
  font-size: 1.1rem;
  transition: transform 300ms ease;
  z-index: 5;
}

.notification:hover .notititle {
  transform: translateX(0.15rem);
}

.notibody {
  color: #99999d;
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
}

.notification:hover .notibody {
  transform: translateX(0.25rem);
}

.notiglow,
.notiborderglow {
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle closest-side at center,
    white,
    transparent
  );
  opacity: 0;
  transition: opacity 300ms ease;
}

.notiglow {
  z-index: 3;
}

.notiborderglow {
  z-index: 1;
}

.notification:hover .notiglow {
  opacity: 0.1;
}

.notification:hover .notiborderglow {
  opacity: 0.1;
}

.note {
  color: var(--color);
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 0.9rem;
  width: 75%;
}
</style>
