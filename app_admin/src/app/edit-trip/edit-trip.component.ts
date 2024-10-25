import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { formatDate } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})


export class EditTripComponent implements OnInit {
  public editForm!:FormGroup;
  trip!: Trip;
  submitted = false;
  message: string='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authorizationService: AuthenticationService
  ){}

  ngOnInit(): void {
      //Retrieve stashed trip ID
      let tripCode = localStorage.getItem("tripCode");
      let startDate = JSON.stringify(localStorage.getItem('startDate'));
      startDate = JSON.parse(startDate);
      startDate = formatDate(startDate, 'yyyy-MM-dd', 'en');

      if(!tripCode){
        alert("Something wrong, couldn't find where I stashed tripCode!");
        this.router.navigate(['']);
        return;
      }
      //Uncomment following lines for debugging
      // console.log('EditTripComponent::ngOnInit');
      // console.log('tripCode:' + tripCode);

      this.editForm = this.formBuilder.group({
        _id: [],
        code: [tripCode, Validators.required],
        name: ["", Validators.required],
        length: ["", Validators.required],
        start:  ["", Validators.required],
        resort: ["", Validators.required],
        perPerson: ["", Validators.required],
        image: ["", Validators.required],
        description: ["", Validators.required]
      })

      this.tripDataService.getTrip(tripCode)
        .subscribe({
          next:(value: any) => {
            this.trip = value;
            value[0].start = startDate;
            //Populate our record into the form
            this.editForm.patchValue(value[0]);
            if(!value)
            {
              this.message = 'No Trip Retrieved!';
            }
            else{
              this.message = 'Trip: ' + tripCode + ' retrieved';
            }
            console.log(this.message);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
  }

  public onSubmit()
  {
    this.submitted = true;

    if(this.editForm.valid)
    {
      this.tripDataService.updateTrip(this.editForm.value, this.authorizationService.getToken())
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls;}

}
