import http from 'k6/http';
import { check, sleep } from 'k6';

// Spike test — đột ngột tăng tải
export const options = {
  stages: [
    { duration: '10s', target: 5  },  // Normal load
    { duration: '10s', target: 50 },  // Spike!
    { duration: '10s', target: 5  },  // Back to normal
    { duration: '10s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed:   ['rate<0.2'],
  },
};

const BASE_URL = 'http://localhost:8080/parabank/services/bank';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function () {
  const res = http.get(
    `${BASE_URL}/login/john/demo`,
    { headers: HEADERS }
  );

  check(res, {
    'status 200': (r) => r.status === 200,
  });

  sleep(0.5);
}