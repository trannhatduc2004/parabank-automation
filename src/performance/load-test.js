import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('error_rate');
const loginDuration = new Trend('login_duration');
const accountsDuration = new Trend('accounts_duration');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 5  },  // Ramp up
    { duration: '1m',  target: 10 },  // Stay at 10 users
    { duration: '30s', target: 0  },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% requests < 2s
    http_req_failed:   ['rate<0.01'],  // Error rate < 1%
    error_rate:        ['rate<0.05'],  // Custom error < 5%
  },
};

const BASE_URL = 'http://localhost:8080/parabank/services/bank';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function () {
  // Test 1: Login
  const loginStart = Date.now();
  const loginRes = http.get(
    `${BASE_URL}/login/john/demo`,
    { headers: HEADERS }
  );
  loginDuration.add(Date.now() - loginStart);

  const loginOk = check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'login response time < 1s': (r) => r.timings.duration < 1000,
    'login has customerId': (r) => {
      try {
        return JSON.parse(r.body).id !== undefined;
      } catch {
        return false;
      }
    },
  });

  errorRate.add(!loginOk);

  if (loginRes.status !== 200) {
    sleep(1);
    return;
  }

  // Lấy customerId
  const customer = JSON.parse(loginRes.body);
  const customerId = customer.id;

  // Test 2: Get Accounts
  const accountsStart = Date.now();
  const accountsRes = http.get(
    `${BASE_URL}/customers/${customerId}/accounts`,
    { headers: HEADERS }
  );
  accountsDuration.add(Date.now() - accountsStart);

  const accountsOk = check(accountsRes, {
    'accounts status 200': (r) => r.status === 200,
    'accounts response time < 1s': (r) => r.timings.duration < 1000,
    'has accounts': (r) => {
      try {
        return JSON.parse(r.body).length > 0;
      } catch {
        return false;
      }
    },
  });

  errorRate.add(!accountsOk);

  sleep(1);
}