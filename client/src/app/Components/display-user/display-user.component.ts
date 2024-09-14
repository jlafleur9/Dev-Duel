import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent {
  @Input() userData: any;
  @Input() differingFields: { [key: string]: boolean } = {};
}
