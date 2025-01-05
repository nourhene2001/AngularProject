import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone:false,
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css'
})
export class ConfirmDeleteModalComponent {



  //forcage de type
  constructor( public dialogRef:MatDialogRef<ConfirmDeleteModalComponent>){
    
  }
}