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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.userService.inspectUser(this.username)
      .then((data: any) => {
        this.userData = data;  // Assign the response data
      })
      .catch((error: any) => {
        console.error('Error fetching user data:', error);  // Error handling
      });
  }
}
