import { reactive } from 'vue';
import { updateGlobeData } from '../components/globe';
import { GlobeLabel, GlobeState, Hop, ResponseMessage } from '@/types';

import { mockHops } from './data';

let eventSource;

const state: GlobeState = reactive({
  hops: [],
  globePoints: [],
  globeArcs: [],
  globeLabels: [],
  isLoading: false,
});

function startTrace(url: string) {
  try {
    state.isLoading = true;

    eventSource = new EventSource(`http://localhost:3000/trace/${url}`);

    state.hops = [];
    state.globeArcs = [];
    state.globeLabels = [];
    state.globePoints = [];

    syncGlobeToState();

    eventSource.onerror = () => eventSource.close();

    eventSource.onmessage = (ev) => {
      const payload = JSON.parse(ev.data);

      console.log({ ev, payload });

      if (payload.type == 'close') {
        eventSource.close();
        state.isLoading = false;
        return;
      }

      const hop: any = payload;
      state.hops.push(hop);

      if (!hop.success) return;

      const { hopInfo } = hop;
      state.globePoints.push(hopInfo);

      const newLabel: GlobeLabel = {
        size: 1,
        lat: hopInfo.lat,
        lng: hopInfo.lng,
        city: hopInfo.city,
      };

      state.globeLabels.push(newLabel);

      syncGlobeToState();

      // We have a previous successful hop
      // after we added the last
      if (state.globePoints.length >= 2) {
        const lastpoint = state.globePoints[state.globePoints.length - 2];

        if (lastpoint.lat == hopInfo.lat && lastpoint.lng == hopInfo.lng)
          return;

        const newArc = {
          startLat: lastpoint.lat,
          startLng: lastpoint.lng,
          endLat: hopInfo.lat,
          endLng: hopInfo.lng,
        };

        state.globeArcs.push(newArc);
        syncGlobeToState();
      }

      return;
    };
  } catch (error) {
    console.log({ error });
    state.isLoading = false;

    throw error;
  }
}

function cancelTrace() {
  state.isLoading = false;
  if (eventSource) eventSource.close();
}

export function syncGlobeToState() {
  updateGlobeData({
    globeArcs: state.globeArcs,
    globePoints: state.globePoints,
    globeLabels: state.globeLabels,
  });
}

export function useGlobeStore() {
  return {
    state,
    startTrace,
    cancelTrace,
  };
}
