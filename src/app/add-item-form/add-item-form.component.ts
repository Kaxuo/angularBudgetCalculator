import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItem } from 'src/shared/models/budget-item-model'

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

  // Bind the HTML to the Models in shared with [ngModel] , item below is the one getting added
  @Input() item:BudgetItem = new BudgetItem('', null);
  // Create eventemitter when form is submitted, which will send the values
  @Output() formSubmit:EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();

  isNewItem:boolean

  constructor() { }

  ngOnInit(): void {
    // if Item has a value
    if (this.item.description){
      // this means that an existing item object was passed into this component therefore this is not a new item
      this.isNewItem = false
    } else {
      this.isNewItem = true
    }
    console.log(this.item.description)
  }

  onSubmit(form:NgForm){
    // will send the values to who is listening to this formsubmit function, go check in main page .ts
    this.formSubmit.emit(form.value)
    // reset
    form.reset()
  }

}
