import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('error_rate');

// Stress test — tìm điểm giới hạn của hệ thống
export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 20 },
    { duration: '30s', target: 30 },
    { duration: '30s', target: 40 },
    { duration: '30s', target: 0  },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed:   ['rate<0.1'],
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

  const ok = check(res, {
    'status 200': (r) => r.status === 200,
    'response time acceptable': (r) => r.timings.duration < 5000,
  });

  errorRate.add(!ok);
  sleep(0.5);
}