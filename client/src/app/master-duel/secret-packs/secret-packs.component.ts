import { Component, OnInit } from '@angular/core';
import { SecretPacksService } from 'src/app/_shared/secret-packs.service';
import { SecretPack } from 'src/app/models/secret_packs/SecretPack.model';

@Component({
  selector: 'app-secret-packs',
  templateUrl: './secret-packs.component.html',
  styleUrl: './secret-packs.component.css',
  standalone: false,
})
export class SecretPacksComponent implements OnInit {
  secretPacks: SecretPack[] = [];
  isLoading: boolean = true;

  constructor(private secretPacksService: SecretPacksService) {}

  ngOnInit(): void {
    this.secretPacksService.getSecretPacks().subscribe((secretPacks) => {
      this.secretPacks = secretPacks;
      this.isLoading = false;
    });
  }
}
