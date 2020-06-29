import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DogListComponent } from './dog-list.component';
import { Subject, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { DogService } from '../shared/dog.service';
import { DogSummary } from '../shared/model/dog-summary';

describe('DogListComponent', () => {
  let component: DogListComponent;
  let fixture: ComponentFixture<DogListComponent>;
  let mockRouteParams: Subject<any>;
  let routerSpy: { navigate: jasmine.Spy };
  let serviceSpy: { getAllDogBreeds: jasmine.Spy };

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj('DogService', ['getAllDogBreeds']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    serviceSpy.getAllDogBreeds.and.returnValue(of([new DogSummary('a breed', 'a group')]));

    mockRouteParams = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DogListComponent],
      providers: [{
        provide: ActivatedRoute, useValue: { paramMap: mockRouteParams },
      }, {
        provide: DogService, useValue: serviceSpy
        }, {
        provide: Router, useValue: routerSpy
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

  describe('when a keyboard event is captured', () => {
    beforeEach(() => {
      component.allDogs = [
        { name: 'breed 1', group: 'group' },
        { name: 'breed 2', group: 'group' },
        { name: 'breed 3', group: 'group' }
      ];
    });

    it('should select the last dog when up arrow is pressed with no selection', () => {
      component.selectedBreed = '';
      component.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.argsFor(0)).toEqual([['dogs', 'breed 3']]);
    });

    it('should select the previous dog when up arrow is pressed with aselection', () => {
      component.selectedBreed = 'breed 2';
      component.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.argsFor(0)).toEqual([['dogs', 'breed 1']]);
    });

    it('should select the first dog when down arrow is pressed with no selection', () => {
      component.selectedBreed = '';
      component.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.argsFor(0)).toEqual([['dogs', 'breed 1']]);
    });

    it('should select the next dog when down arrow is pressed with aselection', () => {
      component.selectedBreed = 'breed 2';
      component.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.argsFor(0)).toEqual([['dogs', 'breed 3']]);
    });
  });
});
