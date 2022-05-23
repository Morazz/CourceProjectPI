"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRussianPaginatorIntl = void 0;
var material_1 = require("@angular/material");
var russianRangeLabel = function (page, pageSize, length) {
    if (length == 0 || pageSize == 0) {
        return "0 van ".concat(length);
    }
    length = Math.max(length, 0);
    var startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    var endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return "".concat(startIndex + 1, " - ").concat(endIndex, " \u0438\u0437 ").concat(length);
};
function getRussianPaginatorIntl() {
    var paginatorIntl = new material_1.MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Элементов на страницу:';
    paginatorIntl.firstPageLabel = 'Первая страница';
    paginatorIntl.previousPageLabel = 'Предыдущая страница';
    paginatorIntl.nextPageLabel = 'Следующая страница';
    paginatorIntl.lastPageLabel = 'Последняя страница';
    paginatorIntl.getRangeLabel = russianRangeLabel;
    return paginatorIntl;
}
exports.getRussianPaginatorIntl = getRussianPaginatorIntl;
//# sourceMappingURL=russian-paginator-intl.js.map