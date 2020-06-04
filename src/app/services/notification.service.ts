import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

// const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'

  };

  config2: MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition: 'bottom'

  };

  inProgress(msg) {
    this.snackbar.open(msg, '', this.config2);
  }
  success(msg) {
    this.config.panelClass = ['success'];
    this.snackbar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config.panelClass = ['warn'];
    this.snackbar.open(msg, '', this.config);
  }
}

