import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { Authresponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  url= 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';
    getTrips() : Observable<Trip[]> {

      return this.http.get<Trip[]>(this.url);
    }

    addTrip(formData: Trip,  token: string) : Observable<Trip> {
      let headers = new HttpHeaders({
        'Authorization': token  
      });

      return this.http.post<Trip>(this.url, formData, {headers: headers});
    }

    getTrip(tripCode: string) : Observable<Trip[]> {
      //console.log('Inside TripDataService::getTrip');
      return this.http.get<Trip[]>(this.url + '/' + tripCode);
    }

    updateTrip(formData: Trip, token: string) : Observable<Trip> {
      //console.log('Inside TripDataService::updateTrip');
      let headers = new HttpHeaders({
        'Authorization': token  
      });

      return this.http.put<Trip>(this.url + '/' + formData.code, formData, {headers: headers});
    }

    login(user: User) : Promise<Authresponse> {
      console.log('in trip-data login');
      return this.handleAuthAPICall('login', user);
    }

    register(user: User) : Promise<Authresponse> {
      return this.handleAuthAPICall('register', user);
    }

    handleAuthAPICall(endpoint: string, user: User) : Promise<Authresponse>{
      const useURL: string = `${this.baseUrl}/${endpoint}`;
      //const token = this.authenticationService.getToken();
      return this.http
        .post(useURL, user)
        .toPromise()
        .then();
    }
    

}
