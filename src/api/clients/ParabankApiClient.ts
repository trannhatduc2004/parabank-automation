import { APIRequestContext } from '@playwright/test';

export class ParabankApiClient {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;
  private readonly headers: Record<string, string>;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = process.env.API_URL || 'http://localhost:8080/parabank/services/bank';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async login(username: string, password: string) {
    return this.request.get(
      `${this.baseURL}/login/${username}/${password}`,
      { headers: this.headers }
    );
  }

  async getAccounts(customerId: number) {
    return this.request.get(
      `${this.baseURL}/customers/${customerId}/accounts`,
      { headers: this.headers }
    );
  }

  async getAccount(accountId: number) {
    return this.request.get(
      `${this.baseURL}/accounts/${accountId}`,
      { headers: this.headers }
    );
  }

  async transfer(fromAccountId: number, toAccountId: number, amount: number) {
    return this.request.post(
      `${this.baseURL}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`,
      { headers: this.headers }
    );
  }

  async deposit(accountId: number, amount: number) {
    return this.request.post(
      `${this.baseURL}/deposit?accountId=${accountId}&amount=${amount}`,
      { headers: this.headers }
    );
  }

  async getTransactions(accountId: number) {
    return this.request.get(
      `${this.baseURL}/accounts/${accountId}/transactions`,
      { headers: this.headers }
    );
  }

  async createAccount(customerId: number, type: number, fromAccountId: number) {
    return this.request.post(
      `${this.baseURL}/createAccount?customerId=${customerId}&newAccountType=${type}&fromAccountId=${fromAccountId}`,
      { headers: this.headers }
    );
  }
}