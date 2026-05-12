# 🏦 Parabank Automation Testing Framework

![CI/CD](https://github.com/trannhatduc2004/parabank-automation/actions/workflows/playwright.yml/badge.svg)

Hệ thống automation testing toàn diện cho ứng dụng banking **Parabank**, bao gồm E2E Testing, API Testing, Performance Testing và Security Testing.

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| E2E + API Testing | Playwright + TypeScript |
| Performance Testing | k6 |
| Schema Validation | Zod |
| Test Data | Faker.js |
| CI/CD | GitHub Actions |
| Reporting | Allure Report + HTML Report |
| AUT | Parabank (Demo Banking App) |

---

## 📊 Test Coverage

| Test Type | Số lượng | Browsers |
|-----------|----------|----------|
| E2E Tests | 33 | Chromium, Firefox, WebKit |
| API Tests | 6 | - |
| Security Tests | 6 | Chromium |
| **Total** | **45** | **3 browsers** |

---

## 🎯 Test Scenarios

### E2E Testing
- ✅ Authentication — Login/Logout, invalid credentials
- ✅ Account Overview — account list, balance display
- ✅ Fund Transfer — success, invalid amount
- ✅ User Registration — valid/invalid data

### API Testing
- ✅ Login API — get customer info
- ✅ Accounts API — get accounts, account detail
- ✅ Transfer API — fund transfer
- ✅ Transaction API — transaction history
- ✅ Deposit API — deposit funds

### Performance Testing (k6)
| Test Type | Virtual Users | p95 Response | Error Rate |
|-----------|--------------|--------------|------------|
| Load Test | 10 VUs | 6.31ms | 0% |
| Stress Test | 40 VUs | 4.42ms | 0% |
| Spike Test | 50 VUs | 3.97ms | 0% |

### Security Testing
| Test Case | Result |
|-----------|--------|
| SQL Injection | ✅ Protected |
| XSS Attack | ✅ Protected |
| Brute Force | ✅ Handled |
| Session Management | ⚠️ Vulnerability Found |
| API Authentication | ⚠️ Vulnerability Found |
| Path Traversal | ✅ Protected |

> ⚠️ **Security Findings**: Parabank có 2 vulnerabilities được phát hiện:
> 1. Session không được bảo vệ — có thể truy cập `/overview.htm` mà không cần login
> 2. API không yêu cầu authentication — `/services/bank/customers/:id/accounts` trả về 200 không cần credentials

---

## 🏛 Project Structure

\`\`\`
src/
├── e2e/
│   ├── pages/              # Page Object Model
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── AccountOverviewPage.ts
│   │   ├── TransferPage.ts
│   │   └── RegisterPage.ts
│   └── tests/              # E2E + Security test cases
│       ├── auth.spec.ts
│       ├── account.spec.ts
│       ├── transfer.spec.ts
│       ├── register.spec.ts
│       └── security.spec.ts
├── api/
│   ├── clients/            # API client wrapper
│   │   └── ParabankApiClient.ts
│   ├── schemas/            # Zod schema validation
│   │   └── account.schema.ts
│   └── tests/              # API test cases
│       └── banking.api.spec.ts
├── fixtures/               # Global setup & test data
│   └── globalSetup.ts
├── performance/            # k6 performance tests
│   ├── load-test.js
│   ├── stress-test.js
│   └── spike-test.js
└── types/                  # TypeScript interfaces
\`\`\`

---

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop
- k6 ([installation guide](https://k6.io/docs/get-started/installation/))

### Installation

\`\`\`bash
git clone https://github.com/trannhatduc2004/parabank-automation.git
cd parabank-automation
npm install
npx playwright install
\`\`\`

### Start AUT

\`\`\`bash
docker run -d -p 8080:8080 --name parabank parasoft/parabank
\`\`\`

Truy cập: `http://localhost:8080/parabank`

### Run Tests

\`\`\`bash
# Toàn bộ tests
npx playwright test

# E2E only
npx playwright test --project=chromium

# API only
npx playwright test --project=api

# Security tests
npx playwright test src/e2e/tests/security.spec.ts

# Smoke tests
npx playwright test --grep @smoke

# Regression tests
npx playwright test --grep @regression
\`\`\`

### Run Performance Tests

\`\`\`bash
# Load test (10 VUs, 2 minutes)
npm run perf:load

# Stress test (up to 40 VUs)
npm run perf:stress

# Spike test (up to 50 VUs)
npm run perf:spike
\`\`\`

### View Reports

\`\`\`bash
# HTML Report
npx playwright show-report reports/html

# Allure Report
npm run allure:serve
\`\`\`

---

## 🔄 CI/CD Pipeline

Pipeline tự động chạy khi push lên `main` hoặc tạo Pull Request:

\`\`\`
Push/PR → Start Parabank → Run API Tests → Run E2E Tests
       → Install k6 → Run Performance Tests → Upload Reports
\`\`\`

**Pipeline duration**: ~5 minutes

---

## 🎨 Design Patterns

- **Page Object Model (POM)** — tách biệt UI logic khỏi test logic
- **AAA Pattern** — Arrange, Act, Assert
- **Data-driven Testing** — Faker.js generate dynamic test data
- **Serial Execution** — API tests chạy tuần tự để đảm bảo data dependency
- **Global Setup** — tự động khởi tạo database trước khi test

---

## 📈 Key Achievements

- ✅ **57 automated test cases** across E2E, API, Security
- ✅ **3 browsers** — Chromium, Firefox, WebKit
- ✅ **3 performance test types** — Load, Stress, Spike
- ✅ **0% error rate** under 50 concurrent users
- ✅ **Sub-10ms response time** under stress
- ✅ **2 security vulnerabilities** discovered and documented
- ✅ **Full CI/CD pipeline** on GitHub Actions