import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {
  username: string = "";
  userData: any = null;  // Store the user data here
  errorMessage: string = "";
  hasSubmitted: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.hasSubmitted = true;
    this.userData = null;
    this.errorMessage = "";
    
    this.userService.inspectUser(this.username)
      .then((data: any) => {
        this.userData = data;
      })
      .catch((error: any) => {
        this.errorMessage = `Error: ${this.username} not found`;  // Custom error message
        console.error('Error fetching user data:', error);
      });
  }
}
