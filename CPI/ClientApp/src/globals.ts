import { MatDialogConfig } from "@angular/material";

export const dialogConfig = new MatDialogConfig();

dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.minWidth = '25%';

export const roles: string[] = ["Пациент", "Врач", "Администратор", "Модератор"];
export const hosp_type: string[] = ["Взрослая", "Детская", "Специализированная"];
