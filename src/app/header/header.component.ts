import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';
import {
  DocumentChangeAction
} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header: Header | null = null;

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.getHeader().snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Header>[]) =>
        changes.map((c: DocumentChangeAction<Header>) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }) as Header)
      )
    ).subscribe((data: Header[]) => {
      this.header = data[0] || null;
      console.log('Header data:', this.header);
    });
  }
}
