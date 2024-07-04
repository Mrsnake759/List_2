import { TableManager } from './TableManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  const tableManager = new TableManager(container);
});
