import { Injectable } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Ejemplo de variable para mostrar en el componente
  accesoHeader: string = 'Texto de prueba desde HeaderService';

  constructor(public headerService: HeaderService)
 {
   console.log(this.headerService);
 }

