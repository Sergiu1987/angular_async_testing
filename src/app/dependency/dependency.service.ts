import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DependencyService {
  constructor() {}

  asyncExample(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Neatza Lume');
      }, 3000);
    });
  }
}
