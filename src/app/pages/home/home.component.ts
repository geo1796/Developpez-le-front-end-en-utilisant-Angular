import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public faMedal = faMedal;
  public olympics: Olympic[] = [];
  private olympicsSub!: Subscription;
  public hasError: boolean = false;
  private errorSub!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympicsSub = this.olympicService.olympics.subscribe(olympics => this.olympics = olympics);
    this.errorSub = this.olympicService.hasError.subscribe(hasError => {
      this.hasError = hasError;
    });
  }

  ngOnDestroy(): void {
    this.olympicsSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  get data(): { "name": string, "value": number }[] {
    return this.olympics.map(olympic => {
      var totalMedals = 0;
      olympic.participations.forEach(participation => totalMedals += participation.medalsCount);
      return { "name": olympic.country, "value": totalMedals };
    });
  }

  get numberOfJOs(): number {
    var yearsOfJOs: number[] = [];
    this.olympics.forEach(olympic => {
      olympic.participations.forEach(participation => {
        if (!yearsOfJOs.find(year => participation.year === year)) {
          yearsOfJOs.push(participation.year);
        }
      });
    });
    return yearsOfJOs.length;
  }

  get numberOfCountries(): number {
    return this.olympics.length;
  }

  onSelect(country: { "name": string }) {
    this.router.navigateByUrl("/details?country=" + country.name);
  }
}
