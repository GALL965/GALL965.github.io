import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificate } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
})
export class CertificatesComponent {
  certificates: Certificate[] = [];

  constructor(private certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().subscribe((changes) => {
      this.certificates = changes.map((c) => ({
        id: c.payload.doc.id,
        ...c.payload.doc.data(),
      })) as Certificate[];
    });
  }
}
