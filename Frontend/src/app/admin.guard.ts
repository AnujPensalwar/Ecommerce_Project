import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt');

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // The Guard should check the JWT directly for the fastest check
      if (payload.authorities === 'ROLE_ADMIN') {
        return true;
      }
    } catch (e) {
      console.error("JWT Error in Guard", e);
    }
  }

  // If not admin, send to home
  router.navigate(['/']);
  return false;
};