import { MatPaginatorIntl } from '@angular/material';

const russianRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 van ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
}

export function getRussianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Элементов на страницу:';
  paginatorIntl.firstPageLabel = 'Первая страница';
  paginatorIntl.previousPageLabel = 'Предыдущая страница';
  paginatorIntl.nextPageLabel = 'Следующая страница';
  paginatorIntl.lastPageLabel = 'Последняя страница';
  paginatorIntl.getRangeLabel = russianRangeLabel;

  return paginatorIntl;
}
