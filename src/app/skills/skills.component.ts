import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skill } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills: Skill[] = [];

  constructor(public skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Skill>[]) =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }) as Skill)
      )
    ).subscribe((data: Skill[]) => {
      this.skills = data;
      console.log('Skills:', this.skills);
    });
  }
}
