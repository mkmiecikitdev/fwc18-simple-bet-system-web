import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Bet} from '../bet-details/bet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  bets: Bet[] = [];

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {


    if (DataService.isUserLogin()) {
      this.loadBets();
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  loadBets() {
    this.dataService.bets()
      .subscribe(response => this.bets = response);
  }

  logout() {
    DataService.logout();
    this.router.navigateByUrl('/login');
  }

}
