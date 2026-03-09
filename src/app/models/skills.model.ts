export class Skill {
  skillName?: string = 'Nombre de la habilidad';
  proficiency?: string = 'Nivel';
  description?: string = 'item1, item2, item n';

  constructor(init?: Partial<Skill>) {
    Object.assign(this, init);
  }
}
