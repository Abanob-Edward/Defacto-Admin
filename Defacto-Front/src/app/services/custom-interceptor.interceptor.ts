import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem('stringToken');
  const cloneRequest = req.clone({
     headers: req.headers.set('Authorization', `Bearer ${myToken}`)
  });
  return next(cloneRequest);
 };

