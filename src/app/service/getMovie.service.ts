import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../enviroments/environment.development";
import { Observable, map } from "rxjs";
import { MoviesModel } from "../modal/movies.interface";

@Injectable({
    providedIn: 'root'
})
export class GetMovieService {

    apiKey = environment.apiKey;
    autorizationGeek = environment.AuthorizationGeek;

    private apiUrlNow = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2&api_key=${this.apiKey}`;
    private apiUrlTopRated = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${this.apiKey}`;
    private apiUrlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${this.apiKey}`;
    private apiUrlGeekFans = `https://api.themoviedb.org/3/account/20162127/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`;
    private apiUrlAnother = `https://api.themoviedb.org/3/account/20162127/watchlist/movies?language=en-US&page=2&sort_by=created_at.asc`;
    private apiUrlDevList = `https://api.themoviedb.org/3/account/20162127/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`;

    constructor(private http: HttpClient) { }

    getMoviesNow(): Observable<MoviesModel[]> {
        return this.http.get<any>(`${this.apiUrlNow}`).pipe(
            map(response => response.results)
        );
    }

    getMoviesTopRated(): Observable<MoviesModel[]> {
        return this.http.get<any>(`${this.apiUrlTopRated}`).pipe(
            map(response => response.results)
        );
    }

    getMoviesAnother(): Observable<MoviesModel[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlAnother}`, { headers }).pipe(
            map(response => response.results)
        );
    }

    getMoviesUpcoming(): Observable<MoviesModel[]> {
        return this.http.get<any>(`${this.apiUrlUpcoming}`).pipe(
            map(response => response.results)
        );
    }

    getMoviesGeekFans(): Observable<MoviesModel[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlGeekFans}`, { headers }).pipe(
            map(response => response.results)
        );
    }

    getMoviesDevList(): Observable<MoviesModel[]> {
        const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `${this.autorizationGeek}`
        });

        return this.http.get<any>(`${this.apiUrlDevList}`, { headers }).pipe(
            map(response => response.results)
        );
    }

}
