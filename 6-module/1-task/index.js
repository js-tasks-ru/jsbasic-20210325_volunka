/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this._render();

  }
  _render() {
    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    let tableRow = document.createElement("tr");
    let tableData = document.createElement("td");

    // Создаём шапку таблицы
    tableRow.innerHTML = `<th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>`;
    tableHead.prepend(tableRow);
    table.prepend(tableHead);
    table.append(tableBody);


    // Создаём тело таблицы
    for (let elem of this.rows) {
      tableRow = document.createElement("tr");
      tableRow.innerHTML = `
      <td>${elem.name}</td>
      <td>${elem.age}</tdh>
      <td>${elem.salary}</td>
      <td>${elem.city}</td>
      <td><button>X</button></td>`;
      tableBody.append(tableRow);
    }


    document.body.addEventListener("click", (event) => {
      let target = event.target;
      if (target.tagName == "BUTTON") {
        target.closest("tr").remove();
      }
    });
    return table;
  }

}
