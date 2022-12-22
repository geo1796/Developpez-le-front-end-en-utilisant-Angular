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

  private countrySub!: Subscription;
  private olympicSub!: Subscription;
  private country: string = "";
  public olympic?: Olympic;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countrySub = this.route.queryParamMap.subscribe(params => {
      const country = params.get("country");
      if (country) {
        this.country = country;
      }
    });
    this.olympicSub = this.olympicService.getOlympicByCountry(this.country)
      .subscribe(olympic => this.olympic = olympic);
  }

  ngOnDestroy(): void {
    this.countrySub.unsubscribe();
    this.olympicSub.unsubscribe();
  }

  get data(): { "name": string, "series": { "name": string, "value": number }[] }[] {
    const series: { "name": string, "value": number }[] = [];
    this.olympic!.participations.forEach(participation => {
      series.push({ "name": "" + participation.year, "value": participation.medalsCount });
    });
    return [{ "name": this.olympic!.country, "series": series }];
  }

  get totalMedals(): number {
    var total = 0;
    this.olympic!.participations.forEach(participation => total += participation.medalsCount);
    return total;
  }

  get totalAthletes(): number {
    var total = 0;
    this.olympic!.participations.forEach(participation => total += participation.athleteCount);
    return total;
  }
}
