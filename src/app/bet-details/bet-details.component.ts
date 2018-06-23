import {Component, Input, OnInit} from '@angular/core';
import {Bet} from './bet';
import {BetForm} from './bet.form';
import {DataService} from '../data.service';

@Component({
  selector: 'app-bet-details',
  templateUrl: './bet-details.component.html',
  styleUrls: ['./bet-details.component.css']
})
export class BetDetailsComponent implements OnInit {

  @Input() bet: Bet;

  betForm: BetForm = {
    team1Bet: null,
    team2Bet: null
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }


  sendBet() {
    if(this.canSend()) {
      this.dataService.sendBet(this.bet.id, this.betForm)
        .subscribe(response => this.bet = response );
    }
  }

  canSend() {
    return this.bet && this.betForm && this.betForm.team1Bet && this.betForm.team2Bet;
  }

}
