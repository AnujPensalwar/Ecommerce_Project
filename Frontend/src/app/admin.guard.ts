import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      
      if (payload.authorities === 'ROLE_ADMIN') {
        return true;
      } else if (Date.now() >= expiry) {
  localStorage.removeItem('jwt');  
}
    } catch (e) {
      console.error("JWT Error in Guard", e);
    }
  }

  
  router.navigate(['/']);
  return false;
};