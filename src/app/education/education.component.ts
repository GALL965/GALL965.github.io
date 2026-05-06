import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  private normalizeAccomplishments(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value
        .map(v => (typeof v === 'string' ? v.trim() : ''))
        .filter(Boolean);
    }
    if (typeof value === 'string') {
      return value
        .split(/\r?\n|,/g)
        .map(v => v.trim())
        .filter(Boolean);
    }
    return [];
  }

  constructor(private educationService: EducationService) { }

  ngOnInit(): void {
    this.educationService.getEducation().snapshotChanges().subscribe(data => {
      this.education = data.map(e => {
        const payloadData: any = e.payload.doc.data();
        return {
          id: e.payload.doc.id,
          ...payloadData,
          accomplishments: this.normalizeAccomplishments(payloadData?.accomplishments)
        } as Education;
      });
    });
  }
}
