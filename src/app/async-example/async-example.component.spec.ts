import { DependencyService } from './../dependency/dependency.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncExampleComponent } from './async-example.component';
import { map, Observable, of, throwError } from 'rxjs';

describe('AsyncExampleComponent', () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  const fakeDependencyService = jasmine.createSpyObj('fakeDepService', [
    'asyncExample',
    'observableExample',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncExampleComponent],
      providers: [
        {
          provide: DependencyService,
          useValue: fakeDependencyService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('asyncExample return Promise with specific parameter - async/await', async () => {
    const result = await component.asyncExample('Grivei');
    expect(result).toBe('Grivei');
  });

  it('asyncExample reject Promise without parameter - async/await', async () => {
    try {
      await component.asyncExample();
    } catch (err) {
      expect(err).toBe('empty string');
    }
  });

  it('sayHiAsyc, retrun Neata Lume based on name parameter', async () => {
    fakeDependencyService.asyncExample.and.returnValue(
      Promise.resolve('Neatza Lume')
    );
    const result = await component.sayHiAync('din Moldova');
    expect(result).toBe('Neatza Lume, din Moldova!');
  });

  it('sayHiAsyc, retrun Service Error ', async () => {
    fakeDependencyService.asyncExample.and.returnValue(Promise.reject());
    const result = await component.sayHiAync('din Moldova');
    expect(result).toBe('Return Error from Service');
  });

  it('asyncExample return Promise if specific parameter - promise', () => {
    return component.asyncExample('Catzelush').then((result) => {
      expect(result).toBe('Catzelush');
    });
  });

  it('asyncExample, retrun Service Error - promise ', () => {
    return component.asyncExample().then(undefined, (error) => {
      expect(error).toBe('empty string');
    });
  });

  it('promiseExample attached field name  to class - promise ', () => {
    return component.promiseExample('Dan').then(() => {
      expect(component.name).toBe('Dan');
    });
  });

  it('sayHiAsyc, retrun neata lume for name  - promise ', () => {
    fakeDependencyService.asyncExample.and.returnValue(
      Promise.resolve('Neatza Lume')
    );
    return component.sayHiAync('din Moldova').then((result) => {
      expect(result).toBe('Neatza Lume, din Moldova!');
    });
  });

  it('asyncExample return Promise with specific parameter - callBack Done', (done) => {
    component.asyncExample('Grivei').then((result) => {
      expect(result).toBe('Grivei');
      done();
    });
  });

  it('asyncExample reject Promise without parameter - callBack Done', (done) => {
    component.asyncExample().then(
      (result) => {
        expect(result).toBe('Grivei');
      },
      (error) => {
        expect(error).toBe('empty string');
        done();
      }
    );
  });

  it('observableExample return given parameter - observable callBack Done ', (done) => {
    component.observableExample('Bai Wickea').subscribe((result) => {
      expect(result).toBe('Bai Wickea');
      done();
    });
  });

  it("observableExample return Error if given parameter doesn't exist - observable callBack Done ", (done) => {
    component.observableExample().subscribe(undefined, (error) => {
      expect(error).toBe('no name');
      done();
    });
  });

  it('subjecExample return Name from class - callBack Done', (done) => {
    component.subjectName.subscribe((result) => {
      expect(result).toBe('Giku');
      done();
    });
    component.subjectExample('Giku');
  });

  it('sayHiObservable return hello with specific name - callBack Done', (done) => {
    fakeDependencyService.observableExample.and.returnValue(of('Hello'));
    component.sayHiObservable('Dan').subscribe((result) => {
      expect(result).toBe('Hello, Dan!');
      done();
    });
  });

  it('sayHiObservable ERROR return  - callBack Done', (done) => {
    fakeDependencyService.observableExample.and.returnValue(
      throwError('service timeout')
    );
    component.sayHiObservable('Dan').subscribe(undefined, (error) => {
      expect(error).toBe('service timeout');
      done();
    });
  });

  it('setNameAfterMinute return name after 1 min - clock()', () => {
    jasmine.clock().install();
    component.setNameAfterMinute(' Dai Foiala');
    jasmine.clock().tick(60000);
    expect(component.name).toBe(' Dai Foiala');
    jasmine.clock().uninstall();
  });
});
