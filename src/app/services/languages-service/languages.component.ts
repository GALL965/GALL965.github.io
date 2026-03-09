import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  languages: Language[] = []; 

  constructor(public languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languagesService.getLanguages().snapshotChanges().subscribe(data => {
      this.languages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Language;
      });
    });
  }
}
