import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DraftingService {
  packsToOpen: string[] = [];

  constructor() {}
}
