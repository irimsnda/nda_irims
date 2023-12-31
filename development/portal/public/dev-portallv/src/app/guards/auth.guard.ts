import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn:any;
  constructor(private auth: AuthService, private myRoute: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let user = this.auth.getUserDetails();
    
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (this.isLoggedIn) {
      return true;
    } else {
      this.myRoute.navigate(["/"]);
      return false;
    }

  }
}
