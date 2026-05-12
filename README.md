 # 🏦 Parabank Automation Testing Framework

![CI/CD](https://github.com/trannhatduc2004/parabank-automation/actions/workflows/playwright.yml/badge.svg)

Hệ thống automation testing end-to-end cho ứng dụng banking Parabank.

## 🏗 Tech Stack
- **E2E + API Testing**: Playwright + TypeScript
- **AUT**: Parabank (Demo Banking Application)
- **Schema Validation**: Zod
- **Test Data**: Faker.js
- **CI/CD**: GitHub Actions
- **Report**: Allure Report + HTML Report

## 📊 Test Coverage
| Test Type | Số lượng | Browsers |
|-----------|----------|----------|
| E2E Tests | 27 | Chromium, Firefox, WebKit |
| API Tests | 6 | - |
| **Total** | **33** | **3 browsers** |

## 🎯 Test Scenarios
- ✅ Authentication (Login/Logout)
- ✅ Account Overview
- ✅ Fund Transfer
- ✅ User Registration
- ✅ Banking API (Accounts, Transactions, Transfer, Deposit)

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- Docker Desktop

### Installation
\`\`\`bash
git clone https://github.com/trannhatduc2004/parabank-automation.git
cd parabank-automation
npm install
npx playwright install
\`\`\`

### Run AUT
\`\`\`bash
docker run -d -p 8080:8080 --name parabank parasoft/parabank
\`\`\`

### Run Tests
\`\`\`bash
# All tests
npx playwright test

# E2E only
npx playwright test --project=chromium

# API only
npx playwright test --project=api

# Smoke tests
npx playwright test --grep @smoke

# View report
npx playwright show-report reports/html
\`\`\`
