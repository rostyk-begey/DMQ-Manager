export const API_URL = 'https://jsonplaceholder.typicode.com/';

const { location } = window;

export const MANAGER_URL = `${location.protocol}//${location.hostname}${
  location.port ? `:${location.port}` : ''
}`;
