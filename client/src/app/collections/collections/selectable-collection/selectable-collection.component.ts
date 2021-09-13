import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserCollection } from 'src/app/models/collections/UserCollection.model';
import { CollectionsService } from 'src/app/_shared/collections.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectable-collection',
  templateUrl: './selectable-collection.component.html',
  styleUrls: ['./selectable-collection.component.css'],
})
export class SelectableCollectionComponent {
  @Input() collection!: UserCollection;
  @Output() onDeleted = new EventEmitter<UserCollection>();

  constructor(
    private router: Router,
    private collectionService: CollectionsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  deleteCollection() {
    this.collectionService
      .deleteCollection(this.collection.collection_id)
      .subscribe(
        () => {
          this.onDeleted.emit(this.collection);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error deleting collection',
          });
        }
      );
  }

  confirmDelete(event: Event) {
    if (event.target) {
      console.log(event.target);
      this.confirmationService.confirm({
        target: event.target,
        message: `Are you sure you want to delete this collection?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteCollection();
        },
      });
    }
    event.preventDefault();
    event.stopPropagation();
  }

  openCollection() {
    this.router.navigate([
      "['/collections/collection/' + collection.collection_id]",
    ]);
  }
}
