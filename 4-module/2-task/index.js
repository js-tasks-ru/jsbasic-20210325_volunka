function makeDiagonalRed(table) {
  let incline =
    (table.rows[table.rows.length - 1].cells.length - 1) / (table.rows.length - 1);
  for (let i = 0; i < table.rows.length; i++) {
    let cellIndex = incline * i;
    table.rows[i].cells[Math.round(cellIndex)].style.backgroundColor = 'red';
  }
}
