import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroments/environment.development";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GetSearchService {

    apiKey = environment.apiKey;
    autorizationGeek = environment.AuthorizationGeek;

    private apiSearch = `https://api.themoviedb.org/3/search/movie?query=`;

    constructor(private http: HttpClient) { }

    getMovieSearch(search: any): Observable<any[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiSearch}${search}`, { headers }).pipe(
            map(response => {
                if (response && Array.isArray(response.results)) {
                    return response.results;
                }
            })
        );
    }



}
