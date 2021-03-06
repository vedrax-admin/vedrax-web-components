import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(private snackBar: MatSnackBar) { }

    open(message: string): void {
        if (message) {
            this.snackBar.open(message, 'X', {
                duration: 2000
            });
        }
    }

    showError(message: string): void {
        if (message) {
            this.snackBar.open(message, 'X', {
                duration: 2000,
                panelClass: ['error']
            });
        }
    }

}