import { Component, OnInit } from '@angular/core';
import { DogService } from '../shared/dog.service';
import { DogSummary } from '../shared/model/dog-summary';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  public allDogs: Array<DogSummary> = [];
  public selectedBreed: string;

  constructor(private dogService: DogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dogService.getAllDogBreeds().subscribe(dogs => this.allDogs = dogs);
    this.route.paramMap.subscribe(params => {
      this.selectedBreed = params.get('breed');
    });
  }
}
