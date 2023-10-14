export type Hop = {
  ip: string;
  city: string;
  region: string;
  organization: string;
  country: string;
  lat: number;
  lng: number;
  ISP: string;
};

export type ResponseMessage = {
  success: boolean;
  failureReason?: 'timeout' | 'private';
  hopInfo?: Hop;
};

export type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

export type GlobeLabel = {
  lat: number;
  lng: number;
  size: number;
  city: string;
};

export type GlobeState = {
  isLoading: boolean;
  hops: Array<ResponseMessage>;
  globePoints: Array<Hop>;
  globeArcs: Array<GlobeArc>;
  globeLabels: Array<GlobeLabel>;
};
