import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService } from '../shared/dog.service';
import { DogSummary } from '../shared/model/dog-summary';
import * as _ from 'lodash';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  public allDogs: Array<DogSummary> = [];
  public selectedBreed: string;

  constructor(private dogService: DogService, private route: ActivatedRoute, private router: Router) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.allDogs.length === 0) {
      return;
    }

    let nextBreed = '';
    const idx = _(this.allDogs).findIndex(d => d.name === this.selectedBreed);

    if (event.code === 'ArrowDown') {
      if (idx === -1 || idx === this.allDogs.length - 1) {
        nextBreed = this.allDogs[0].name;
      } else  {
        nextBreed = this.allDogs[idx + 1].name;
      }
    } else if (event.code === 'ArrowUp') {
      if (idx === -1 || idx === 0) {
        nextBreed = this.allDogs[this.allDogs.length - 1].name;
      } else  {
        nextBreed = this.allDogs[idx - 1].name;
      }
    }

    if (nextBreed !== '') {
      this.router.navigate(['dogs', nextBreed]);
    }
  }

  ngOnInit(): void {
    this.dogService.getAllDogBreeds().subscribe(dogs => this.allDogs = dogs);
    this.route.paramMap.subscribe(params => {
      this.selectedBreed = params.get('breed');
    });
  }
}
