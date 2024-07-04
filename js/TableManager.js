import { Table } from './Table.js';

export
class TableManager {
  constructor(container) {
    this.container = container;
    this.tables = [];
    this.addTableBtn = document.createElement('button');
    this.addTableBtn.textContent = 'Добавить таблицу';
    this.addTableBtn.addEventListener('click', () => this.addTable());
    this.container.appendChild(this.addTableBtn);
  }

  addTable() {
    const title = prompt('Введите название новой таблицы:');
    if (title) {
      const tableContainer = document.createElement('div');
      this.container.appendChild(tableContainer);
      const table = new Table(tableContainer, title);
      this.tables.push(table);
    }
  }
}

