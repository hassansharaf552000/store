export const AUTH_CONSTANTS = {
  USERNAME: 'your_username',
  PASSWORD: 'your_password',
  get CREDENTIALS(): string {
    return `${this.USERNAME}:${this.PASSWORD}`;
  }
};

export const TOKEN = "YWhtZWRfc2FuYWQ6QXNAMTIzNDU=";
