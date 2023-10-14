import axios from 'axios';
import config from './config';

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

export async function hopInfoFromIp(ip: string): Promise<Hop> {
  try {
    const { data } = await axios.get(config.ipLookupServiceUrl + ip);

    return {
      ip: data.query,
      city: data.city,
      region: data.region,
      organization: data.org,
      country: data.country,
      lat: data.lat,
      lng: data.lon,
      ISP: data.isp,
    };
  } catch (error) {
    throw error;
  }
}
