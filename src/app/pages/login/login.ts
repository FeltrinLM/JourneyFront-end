import { Component } from '@angular/core';
import { AuthCardComponent } from '../../shared/components/auth-card/auth-card.component';

@Component({
  selector: 'app-login',
  imports: [AuthCardComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
