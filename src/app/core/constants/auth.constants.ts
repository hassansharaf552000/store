export const AUTH_CONSTANTS = {
  USERNAME: 'your_username',
  PASSWORD: 'your_password',
  TOKEN: 'token',
  get CREDENTIALS(): string {
    return `${this.USERNAME}:${this.PASSWORD}`;
  }
};
