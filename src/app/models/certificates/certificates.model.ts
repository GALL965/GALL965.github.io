export class Certificate {
  id?: string;
  name?: string = 'Nombre del certificado';
  issuingOrganization?: string = 'Entidad emisora';
  issueDate?: string = 'mmm-yyyy';
  expirationDate?: string = 'mmm-yyyy';
}
