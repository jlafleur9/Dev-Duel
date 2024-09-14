import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  userDataOne: any = null;
  userDataTwo: any = null;
  errorMessage: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  onSubmit() {
    this.errorMessage = "";
    this.userDataOne = null;
    this.userDataTwo = null;

    Promise.allSettled([
        this.userService.inspectUser(this.usernameOne),
        this.userService.inspectUser(this.usernameTwo)
    ])
    .then((results: any[]) => {
        // Handle the result of the first promise (usernameOne)
        if (results[0].status === 'fulfilled') {
            this.userDataOne = results[0].value;
        } else {
            this.errorMessage += `Error: ${this.usernameOne} not found. `;
        }

        // Handle the result of the second promise (usernameTwo)
        if (results[1].status === 'fulfilled') {
            this.userDataTwo = results[1].value;
        } else {
            this.errorMessage += `Error: ${this.usernameTwo} not found.`;
        }

        // Determine the winner if both users are valid
        if (this.userDataOne && this.userDataTwo) {
            if (this.userDataOne.followers > this.userDataTwo.followers) {
                this.userDataOne.winner = true;
                this.userDataTwo.winner = false;
            } else if (this.userDataTwo.followers > this.userDataOne.followers) {
                this.userDataOne.winner = false;
                this.userDataTwo.winner = true;
            } else {
                this.userDataOne.winner = false;
                this.userDataTwo.winner = false; // Tie
            }
        }
    });
}
}
