import { TestBed } from '@angular/core/testing';

import { DogService } from './dog.service';
import { HttpClient } from '@angular/common/http';
import { DogSummary } from './model/dog-summary';
import { defer, Observable } from 'rxjs';
import { Dog } from './model/dog';

function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

function asyncError(): Observable<any> {
  return defer(() => Promise.reject('mock error'));
}

describe('DogService', () => {
  let service: DogService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(DogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all dogs', async () => {
    const expectedDogs: DogSummary[] = [
      {
        name: 'a good dog',
        group: 'best group'
      },
      {
        name: 'also good dog',
        group: 'best group'
      }
    ];
    httpClientSpy.get.and.returnValue(asyncData(expectedDogs));
    const dogs = service.getAllDogBreeds().subscribe(
      d => expect(d).toEqual(expectedDogs)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('it should thow if there is an error getting all dogs', async () => {
    httpClientSpy.get.and.returnValue(asyncError());
    const dogs = service.getAllDogBreeds().subscribe(
      d => { },
      e => expect(e).toEqual('mock error')
    );
  });

  it('should get details for one dog', async () => {
    const payload: any =
    {
      name: 'The Goodest Dog',
      life_expectancy: [9, 99],
      group: 'awesome',
      other_names: ['Also a good name', 'hello fren'],
      weight_pounds: [5.0, 55.0],
      height_inches: [11.0, 78.0]
    };

    httpClientSpy.get.and.returnValue(asyncData(payload));

    const expectedDog = new Dog('The Goodest Dog', 'awesome', 5.0, 55.0, 11.0, 78.0, 9, 99, ['Also a good name', 'hello fren']);

    service.getDog('The Goodest Dog').subscribe(dog => {
      // A simple deep-equal comparison using JSON.stringify
      expect(JSON.stringify(dog)).toEqual(JSON.stringify(expectedDog));
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('it should thow if there is an error getting details for a dogs', async () => {
    httpClientSpy.get.and.returnValue(asyncError());
    const dogs = service.getDog('The Goodest Dog').subscribe(
      d => { },
      e => expect(e).toEqual('mock error')
    );
  });
});
