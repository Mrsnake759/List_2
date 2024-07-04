export class Table {
  constructor(container, title) {
    this.container = container;
    this.title = title;
    this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    this.render();
  }


  render() {
    this.container.innerHTML = `
            <h2>${this.title} <button class="toggle-btn">Свернуть/Развернуть</button></h2>
            <div class="table-content">
                <div class="controls">
                    <select class="month-filter">
                        <option value="all">Все месяцы</option>
                        ${this.months.map((month, index) => `<option value="${index}">${month}</option>`).join('')}
                    </select>
                    <input type="text" class="search-input" placeholder="Поиск по названию">
                    <button class="add-row-btn">Добавить строку</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Комментарий</th>
                            ${this.months.map(month => `<th class="month">${month}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `;

    this.tbody = this.container.querySelector('tbody');
    this.addEventListeners();
    this.addInitialRows();
  }

  addEventListeners() {
    this.container.querySelector('.toggle-btn').addEventListener('click', () => this.toggleTable());
    this.container.querySelector('.month-filter').addEventListener('change', (e) => this.filterByMonth(e.target.value));
    this.container.querySelector('.search-input').addEventListener('input', (e) => this.searchByName(e.target.value));
    this.container.querySelector('.add-row-btn').addEventListener('click', () => this.addRow());
    this.tbody.addEventListener('click', (e) => {
      if (e.target.classList.contains('month')) {
        this.toggleHighlight(e.target);
      }
    });
  }

  addInitialRows() {
    for (let i = 0; i < 3; i++) {
      this.addRow();
    }
  }
  addRow() {
    const row = this.tbody.insertRow();
    const nameCell = row.insertCell();
    const commentCell = row.insertCell();
    nameCell.contentEditable = true;
    commentCell.contentEditable = true;
    nameCell.textContent = '';
    commentCell.textContent = '';

    for (let i = 0; i < 12; i++) {
      const cell = row.insertCell();
      cell.classList.add('month');
    }
  }

  toggleHighlight(cell) {
    cell.classList.toggle('highlighted-green');
    cell.classList.toggle('highlighted-red');
  }

  toggleTable() {
    const content = this.container.querySelector('.table-content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  }

  filterByMonth(selectedMonth) {
    const rows = this.tbody.querySelectorAll('tr');
    const headers = this.container.querySelectorAll('th.month');

    headers.forEach((header, index) => {
      header.style.display = selectedMonth === 'all' || index == selectedMonth ? '' : 'none';
    });

    rows.forEach(row => {
      const cells = row.querySelectorAll('td.month');
      cells.forEach((cell, index) => {
        cell.style.display = selectedMonth === 'all' || index == selectedMonth ? '' : 'none';
      });
    });
  }


  searchByName(searchTerm) {
    const rows = this.tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const nameCell = row.querySelector('td');
      const name = nameCell.textContent.toLowerCase();
      row.style.display = name.includes(searchTerm.toLowerCase()) ? '' : 'none';
    });
  }
}
