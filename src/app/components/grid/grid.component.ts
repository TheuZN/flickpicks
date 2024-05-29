import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { MoviesModel } from '../../modal/movies.interface';
import { GetMovieService } from '../../service/getMovie.service';
import { BannerComponent } from '../banner/banner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {

  modalOpen: boolean = false;

  moviesNow: MoviesModel[] = [];
  moviesTopRated: MoviesModel[] = [];
  moviesUpcoming: MoviesModel[] = [];
  moviesGeekFans: MoviesModel[] = [];
  moviesAnother: MoviesModel[] = [];
  moviesDevList: MoviesModel[] = [];

  imageModal: string = "";
  titleModal: string = "";
  averageModal: any;
  overviewModal: string = "";
  popularityModal: any;
  releaseModal: string = "";
  idModal: any = "";

  imagePath: string = "https://image.tmdb.org/t/p/w500";

  constructor(private getMovieService: GetMovieService, private router: Router){}

  ngOnInit() {
    this.getNow();
    this.getTopRated();
    this.getUpcoming();
    this.getGeekFans();
    this.getAnother();
    this.getDevList();
  }

  getNow() {
    this.getMovieService.getMoviesNow().subscribe(
      data => { if (Array.isArray(data)) { this.moviesNow = data; }});
  }

  getTopRated() {
    this.getMovieService.getMoviesTopRated().subscribe(
      data => { if (Array.isArray(data)) { this.moviesTopRated = data; }});
  }

  getUpcoming() {
    this.getMovieService.getMoviesUpcoming().subscribe(
      data => { if (Array.isArray(data)) { this.moviesUpcoming = data; }});
  }

  getGeekFans() {
    this.getMovieService.getMoviesGeekFans().subscribe(
      data => { if (Array.isArray(data)) { this.moviesGeekFans = data; }});
  }

  getAnother() {
    this.getMovieService.getMoviesAnother().subscribe(
      data => { if (Array.isArray(data)) { this.moviesAnother = data; }});
  }

  getDevList() {
    this.getMovieService.getMoviesDevList().subscribe(
      data => { if (Array.isArray(data)) { this.moviesDevList = data; }});
  }

  modalShow(image: string, title: string, average: number, overview: string, popularity: number, release: string, id: any){    
    this.imageModal = image;
    this.titleModal = title;
    this.averageModal = average;
    this.overviewModal = overview;
    this.popularityModal = popularity;
    this.releaseModal = release;
    this.idModal = id;

    this.modalOpen = true;
    document.body.classList.add('scrool-none');
  }

  modalClose(){
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
  }

  turnFalse(){
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
  }

  getDetail(){
    this.router.navigate(['detail', this.idModal]);
    document.body.classList.remove('scrool-none');
  }

}
