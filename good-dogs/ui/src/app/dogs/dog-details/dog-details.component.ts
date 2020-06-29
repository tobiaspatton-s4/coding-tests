import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../../shared/dog.service';
import { Dog } from '../../shared/model/dog';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {

  public dog: Dog = null;

  constructor(private dogService: DogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const breed = params.get('breed');
      if (breed !== null && breed !== '') {
        this.dogService.getDog(breed).subscribe(
            d => this.dog = d
          );
      } else {
        this.dog = null;
       }
    });
  }

}
