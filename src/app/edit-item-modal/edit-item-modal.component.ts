import { Component, OnInit, Inject } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item-model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  // You need to put the info inside the forms now
  constructor(
    public dialogRef:MatDialogRef<EditItemModalComponent>,
    // Item injected through the modal
    @Inject(MAT_DIALOG_DATA) public item:BudgetItem
  ) { }

  ngOnInit(): void {
  }

  //When this close , ==> RESULT that will be passed in the subscribe function in Budget-item-list
  onSubmit(updatedItem:BudgetItem){
    this.dialogRef.close(updatedItem)
  }

}
