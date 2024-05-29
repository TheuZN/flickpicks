import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroments/environment.development";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GetDetailMovieService {

    apiKey = environment.apiKey;
    autorizationGeek = environment.AuthorizationGeek;

    private apiUrlDetailList = `https://api.themoviedb.org/3/movie/`;
    private image = `/images`;
    private recommendation = `/recommendations`;
    private reviews = `/reviews`;
    private credits = `/credits`;

    constructor(private http: HttpClient) { }

    getDetailMovies(id: string): Observable<any> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });
        return this.http.get<any>(`${this.apiUrlDetailList}${id}`, { headers });
    }

    getImageMovies(id: any): Observable<any[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlDetailList}${id}${this.image}`, { headers }).pipe(
            map(response => {
                if (response && Array.isArray(response.backdrops)) {
                    return response.backdrops.slice(0, 10);
                }
            })
        );
    }

    getRecommendationMovies(id: any): Observable<any[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlDetailList}${id}${this.recommendation}`, { headers }).pipe(
            map(response => response.results)
        );
    }

    getReviewMovies(id: any): Observable<any[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlDetailList}${id}${this.reviews}`, { headers }).pipe(
            map(response => response.results.slice(0, 3))
        );
    }

    getCredits(id: any): Observable<any[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlDetailList}${id}${this.credits}`, { headers }).pipe(
            map(response => {
                if (response && Array.isArray(response.cast)) {
                    return response.cast.slice(0, 20);
                }
            })
        );
    }
}