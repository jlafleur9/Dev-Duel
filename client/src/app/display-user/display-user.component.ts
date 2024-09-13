import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
  @Input() userData: any;

  constructor() { }

  get hasUserData(): boolean {
    return this.userData && Object.keys(this.userData).length > 0;
  }
}
