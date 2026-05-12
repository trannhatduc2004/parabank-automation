import { request } from '@playwright/test';

async function globalSetup() {
  const context = await request.newContext({
    baseURL: 'http://localhost:8080/parabank',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  // Reset database
  try {
    await context.post('/services/bank/initializeDB');
    console.log('✅ Database initialized');
  } catch {
    console.log('ℹ️ Database init skipped');
  }

  // Verify test user — bỏ qua nếu connection failed
  try {
    const loginResponse = await context.get(
      `/services/bank/login/${process.env.TEST_USER}/${process.env.TEST_PASSWORD}`
    );
    if (loginResponse.status() === 200) {
      console.log('✅ Test user verified');
    }
  } catch {
    console.log('ℹ️ Test user verification skipped');
  }

  await context.dispose();
}

export default globalSetup;