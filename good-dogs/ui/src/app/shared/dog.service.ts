import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dog } from './model/dog';
import { DogSummary } from './model/dog-summary';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private httpClient: HttpClient) {
    console.log('foo');
  }

  public getAllDogBreeds(): Observable<Array<DogSummary>> {
    return this.httpClient.get<Array<DogSummary>>('/api/dogs')
      .pipe(
        catchError(err => {
          // TODO: Generalized mechanism for displaying errors, etc.
          alert('There was an error getting the list of dog breeds');
          throw err;
        })
      );
  }

  public getDog(breedName: string): Observable<Dog> {
    return this.httpClient.get<any>(`/api/dogs/${breedName}`)
      .pipe(
        catchError(err => {
          // TODO: Generalized mechanism for displaying errors, etc.
          alert('There was an error getting details for the dog breed');
          throw err;
        }),
        map(dog => new Dog(dog.name,
          dog.group,
          dog.weight_pounds[0],
          dog.weight_pounds[1],
          dog.height_inches[0],
          dog.height_inches[1],
          dog.life_expectancy[0],
          dog.life_expectancy[1],
          dog.other_names))
      );
  }
}
