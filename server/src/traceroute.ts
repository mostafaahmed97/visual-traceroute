const Traceroute = require('./traceroute-lib/index');

import { Response } from 'express';
import { hopInfoFromIp, Hop } from './geo-locator';
import isPrivateIp from 'private-ip';

type ResponseMessage = {
  success: boolean;
  failureReason?: 'timeout' | 'private';
  hopInfo?: Hop;
};

export async function traceRoute(url: string, clientConnection: Response) {
  const tracer = new Traceroute();

  clientConnection.on('close', () => {
    try {
      if (processId) {
        console.log('Killing traceroute process');
        process.kill(processId);
      }
    } catch (error) {
      console.log({ error });
    }
  });

  console.log('Tracing: ', { url });

  let destinationIp: string;
  let processTerminated = false;
  let processId: number;

  tracer
    .on('pid', (pid) => {
      console.log(`pid: ${pid}`);
      processId = pid;
    })
    .on('destination', (destination) => {
      console.log(`destination: ${destination}`);
      destinationIp = destination;
    })
    .on('hop', async (hop) => {
      let response: ResponseMessage = {
        success: false,
      };

      console.log(`hop: ${JSON.stringify(hop)}`);

      const ip: string = hop.ip;

      if (ip == 'Request timed out.') {
        response.failureReason = 'timeout';
        publishEvent(response, clientConnection);
        return;
      }

      if(ip == '*'){
        return;
      }

      if (isPrivateIp(ip)) {
        response.failureReason = 'private';
        publishEvent(response, clientConnection);
        return;
      }

      const hopInfo = await hopInfoFromIp(ip);

      response.success = true;
      response.hopInfo = hopInfo;

      publishEvent(response, clientConnection);

      if (ip == destinationIp || processTerminated) {
        console.log('Finished');
        clientConnection.write(`data:${JSON.stringify({ type: 'close' })}\n\n`);
      }
    })
    .on('close', (code) => {
      console.log(`close: code ${code}`);
      // processTerminated = true;
    });

  tracer.trace(url);
}

function publishEvent(message: ResponseMessage, conn: Response) {
  conn.write(`data:${JSON.stringify(message)}\n\n`);
}
