import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  private olympic?: Olympic;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe(params => {
      const country = params.get("country");
      if (country) {
        this.olympic = this.olympicService.getOlympicByCountry(country);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
