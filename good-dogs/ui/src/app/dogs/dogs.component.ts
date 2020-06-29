import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit{

  public selectedDogName: string = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onDogSelected(dogName: string): void {
    this.selectedDogName = dogName;
  }
}
