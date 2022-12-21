import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  public olympics: Olympic[] = [];
  private sub: Subscription;
  
  constructor(private olympicService: OlympicService) {
    this.sub = olympicService.olympics.subscribe(olympics => this.olympics = olympics);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get data(): {"name": string, "value": number}[] {
    return this.olympics.map(olympic => {
      var totalMedals = 0;
      olympic.participations.forEach(participation => totalMedals += participation.medalsCount);
      return {"name": olympic.country, "value": totalMedals};
    });
  }

}
