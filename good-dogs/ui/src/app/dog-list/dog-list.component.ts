import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DogService } from '../shared/dog.service';
import { DogSummary } from '../shared/model/dog-summary';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.scss']
})
export class DogListComponent implements OnInit {

  public allDogs: Array<DogSummary> = [];
  public selectedIdx?: number = null;

  @Output() selected = new EventEmitter<string>();

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
    this.dogService.getAllDogBreeds().subscribe(dogs => this.allDogs = dogs);
  }

  public clickRow(index: number): void {
    if (this.selectedIdx === index) {
      // Clicking on the selected row deselects it
      this.selectedIdx = null;
    } else {
      this.selectedIdx = index;
    }
    const dogName = this.selectedIdx !== null ? this.allDogs[this.selectedIdx].name : null;
    this.selected.emit(dogName);
  }
}
