import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/collections/UserCollection.model';
import { AuthService } from 'src/app/_shared/auth.service';
import { CollectionsService } from 'src/app/_shared/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  collections: UserCollection[] = [];
  loading: boolean = true;

  constructor(
    private collectionsService: CollectionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userID = this.authService.getUser().user_id;
    this.collectionsService
      .getUserCollections(userID)
      .subscribe((collections) => {
        this.collections = collections;
        this.loading = false;
      });
  }

  onCollectionDeleted(collection: UserCollection) {
    this.collections = this.collections.filter(
      (c) => c.collection_id !== collection.collection_id
    );
  }
}
