import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public router: Router) {}
  logout(){
	 localStorage.removeItem('meantoken');
	 this.router.navigateByUrl('/');
	 this.auth.logout();
   }

}
