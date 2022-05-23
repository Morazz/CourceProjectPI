"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile_placeholder = exports.hosp_type = exports.roles = exports.dialogConfig = void 0;
var material_1 = require("@angular/material");
exports.dialogConfig = new material_1.MatDialogConfig();
exports.dialogConfig.disableClose = true;
exports.dialogConfig.autoFocus = true;
exports.dialogConfig.minWidth = '25%';
exports.roles = ["Пациент", "Врач", "Администратор", "Модератор"];
exports.hosp_type = ["Взрослая", "Детская", "Специализированная"];
exports.profile_placeholder = "/assets/images/profile-placeholder.png";
//# sourceMappingURL=globals.js.map