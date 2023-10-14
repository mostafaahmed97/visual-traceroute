import { Router } from 'express';
import { traceRoute } from './traceroute';

const router = Router();

router.get('/trace/:url', function (req, res) {
  const { url } = req.params;

  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);

  traceRoute(url, res);
});

export default router;
