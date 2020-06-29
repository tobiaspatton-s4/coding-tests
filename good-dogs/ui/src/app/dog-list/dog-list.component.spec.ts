import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DogListComponent } from './dog-list.component';
import { Subject, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { DogService } from '../shared/dog.service';
import { DogSummary } from '../shared/model/dog-summary';

describe('DogListComponent', () => {
  let component: DogListComponent;
  let fixture: ComponentFixture<DogListComponent>;
  let mockRouteParams: Subject<any>;
  let serviceSpy: { getAllDogBreeds: jasmine.Spy };

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj('DogService', ['getAllDogBreeds']);
    serviceSpy.getAllDogBreeds.and.returnValue(of([new DogSummary('a breed', 'a group')]));

    mockRouteParams = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DogListComponent],
      providers: [{
        provide: ActivatedRoute, useValue: {paramMap: mockRouteParams},
      }, {
        provide: DogService, useValue: serviceSpy
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all dogs from the service', () => {
    expect(serviceSpy.getAllDogBreeds.calls.count()).toBe(1);
  });

  it('should set the selected breed when the url param changes', () => {
    mockRouteParams.next(convertToParamMap({ breed: 'a big dog' }));
    expect(component.selectedBreed).toEqual('a big dog');
  });
});
