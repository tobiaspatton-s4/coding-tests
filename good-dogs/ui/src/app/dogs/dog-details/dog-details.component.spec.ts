import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDetailsComponent } from './dog-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Subject, from } from 'rxjs';
import { Dog } from '../../shared/model/dog';
import { DogService } from '../../shared/dog.service';

describe('DogDetailsComponent', () => {
  let component: DogDetailsComponent;
  let fixture: ComponentFixture<DogDetailsComponent>;
  let mockRouteParams: Subject<any>;
  let serviceSpy: { getDog: jasmine.Spy };

  const mockDog = new Dog('The best dog', 'the best group', 10, 20, 15, 30, 1, 99, ['one other name']);

  beforeEach(async(() => {
    mockRouteParams = new Subject<any>();
    serviceSpy = { getDog: jasmine.createSpy() };
    serviceSpy.getDog.and.returnValue(from([mockDog]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DogDetailsComponent],
      providers: [{
        provide: ActivatedRoute, useValue: { paramMap: mockRouteParams }
      }, {
        provide: DogService, useValue: serviceSpy
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the breed details when the url param changes', () => {
    mockRouteParams.next(convertToParamMap({ breed: 'a big dog' }));
    expect(serviceSpy.getDog.calls.count()).toBe(1);
    expect(component.dog).toEqual(mockDog);
  });
});
