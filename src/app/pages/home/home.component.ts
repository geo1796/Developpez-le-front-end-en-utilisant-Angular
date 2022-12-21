import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
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
}
