import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {
  workExperience: WorkExperience[] = [];

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

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data(),
          accomplishments: this.normalizeAccomplishments((c.payload.doc.data() as any)?.accomplishments)
        }))
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }
}
