import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'good-dogs';

  public selectedDogName: string = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onDogSelected(dogName: string): void {
    this.selectedDogName = dogName;
  }
}
