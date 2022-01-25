import { DependencyService } from './../dependency/dependency.service';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-async-example',
  templateUrl: './async-example.component.html',
  styleUrls: ['./async-example.component.css'],
})
export class AsyncExampleComponent implements OnInit {
  name: string = '';
  constructor(private ds: DependencyService) {}

  ngOnInit(): void {}

  asyncExample(name?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!name) {
        reject('empty string');
        return;
      }
      setTimeout(() => resolve(name));
    });
  }

  sayHiAync(name: string): Promise<string> {
    return this.ds.asyncExample().then(
      (result) => {
        return `${result}, ${name}!`;
      },
      () => {
        return 'Return Error from Service';
      }
    );
  }

  promiseExample(name?: string): Promise<void> {
    return new Promise((resolve, refect) => {
      setTimeout(() => {
        if (!name) {
          refect('empty Name');
          return;
        }
        this.name = name;
        resolve();
      }, 3000);
    });
  }

  observableExample(name?: string): Observable<string> {
    if (!name) {
      return throwError('no name');
    }
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(name);
        observer.complete();
      }, 1000);
    });
  }
}
