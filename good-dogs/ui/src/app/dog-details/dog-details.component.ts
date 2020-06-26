import { Component, OnInit, Input } from '@angular/core';
import { DogService } from '../shared/dog.service';
import { Dog } from '../shared/model/dog';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {

  @Input() set selectedDogName(value: string) {
    if (value !== null && value !== '') {
      this.dogService.getDog(value).subscribe(
        d => this.dog = d
      );
    } else {
      this.dog = null;
     }
  }

  public dog: Dog = null;

  constructor(private dogService: DogService) { }

  ngOnInit(): void {
  }

}
