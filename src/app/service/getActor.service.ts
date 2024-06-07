import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroments/environment.development";
import { Observable, map } from "rxjs";
import { ImagesDetailModel, PersonCreditModel, PersonDetailModel } from "../modal/person.interface";

@Injectable({
    providedIn: 'root'
})
export class GetPersonService {

    apiKey = environment.apiKey;
    autorizationGeek = environment.AuthorizationGeek;

    private apiUrlPerson = `https://api.themoviedb.org/3/person/`;
    private movieCredits = `/movie_credits`;
    private imagePerson = `/images`;

    constructor(private http: HttpClient) { }

    getDetailPerson(person: number): Observable<PersonDetailModel> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });
        return this.http.get<PersonDetailModel>(`${this.apiUrlPerson}${person}`, { headers });
    }

    getImagePerson(person: number): Observable<ImagesDetailModel[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlPerson}${person}${this.imagePerson}`, { headers }).pipe(
            map(response => {
                if (response && Array.isArray(response.profiles)) {
                    return response.profiles.slice(0, 10);
                }
            })
        );
    }

    getCreditsPerson(person: number): Observable<PersonCreditModel[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlPerson}${person}${this.movieCredits}`, { headers }).pipe(
            map(response => {
                if (response && Array.isArray(response.cast)) {
                    return response.cast.slice(0, 20);
                }
            })
        );
    }
}