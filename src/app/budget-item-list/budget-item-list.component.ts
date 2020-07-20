import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item-model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
})


export class BudgetItemListComponent implements OnInit {
  // We need to create an event emitter AGAIN because the main array is above us (main.ts)
  
  @Input() budgetItems: BudgetItem[];
  // we pass the budgeitem , cause the parent needs to know what item we pass in
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  // We need to create a new interface since the edit and update will take 2 parameters (old and new one )
  @Output() editAndUpdate: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  // Try to understand the different emitter that event and in budget item card
  onDeleteButton(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClick(item: BudgetItem) {
    // display the edit modal
    // pass Component first , second parameter is the configuration(object style) data would mean the item that we would click
    // show the dialog
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item,
    });
    // subscribe to the event when it's closed, we get an observable when closed
    dialogRef.afterClosed().subscribe((result) => {
      // Check if result has value
      if (result) {
        // result is the updated budget item
        // replace the item with the updated/submitted item from the form
        // this.budgetItems[this.budgetItems.indexOf(item)] = result

        // Updated code with the edit and update
        this.editAndUpdate.emit({
          // What's passed in it ( previous data)
          old:item,
          // updated data
          new:result
        })
      }
    });
  }
}


export interface UpdateEvent {
  old:BudgetItem;
  new:BudgetItem
}