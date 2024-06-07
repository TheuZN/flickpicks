import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GetDetailMovieService } from '../../service/getDetail.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailMovieModel } from '../../modal/detail.interface';
import { CreditsDetailModel, DetailImageModel, RecommendationDetailModel, ReviewDetailModel } from '../../modal/movies.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  modalOpen: boolean = false;

  currentIndex = 0;

  idSession: number | undefined = undefined;

  limiteCaracteres: number = 500;
  textOver: string = "";

  constructor(private getDetailMovieService: GetDetailMovieService, private router: Router, private route: ActivatedRoute) { }

  moviesDetail: DetailMovieModel[] = [];
  moviesImage: DetailImageModel[] = [];
  moviesRecommendations: RecommendationDetailModel[] = [];
  moviesReviews: ReviewDetailModel[] = [];
  moviesCredits: CreditsDetailModel[] = [];

  imageModal: string = "";
  titleModal: string = "";
  averageModal: number | undefined = undefined;
  overviewModal: string = "";
  popularityModal: number | undefined = undefined;
  releaseModal: string = "";
  idModal: number | undefined = undefined;

  imagePath: string = "https://image.tmdb.org/t/p/w500";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.idSession = idParam !== null ? Number(idParam) : undefined;
      if (this.idSession !== undefined) {
        this.getDetails(this.idSession);
        this.getImage(this.idSession);
        this.getRecommendations(this.idSession);
        this.getReviews(this.idSession);
        this.getCredit(this.idSession);
        this.scrollToTop();
      }
    });
  }

  getDetails(idSession: number): void {
    this.getDetailMovieService.getDetailMovies(idSession).subscribe(
      data => {
        this.moviesDetail = [data];
      }
    );
  }

  getImage(idSession: number) {
    this.getDetailMovieService.getImageMovies(idSession).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.moviesImage = data;
        }
      });
  }

  getRecommendations(idSession: number) {
    this.getDetailMovieService.getRecommendationMovies(idSession).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.moviesRecommendations = data;
        }
      });
  }

  getReviews(idSession: number) {
    this.getDetailMovieService.getReviewMovies(idSession).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.moviesReviews = data;
        }
      });
  }

  getCredit(idSession: number) {
    this.getDetailMovieService.getCredits(idSession).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.moviesCredits = data;
        }
      });
  }

  modalShow(image: string, title: string, average: number, overview: string, popularity: number, release: string, id: number) {
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

  modalClose() {
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
  }

  turnFalse() {
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
  }

  getDetail() {
    this.router.navigate(['detail', this.idModal]);
    document.body.classList.remove('scrool-none');
    this.modalOpen = false;
  }

  getTextoLimitado(text: string): string {
    if (text.length > this.limiteCaracteres) {
      return text.substring(0, this.limiteCaracteres) + '...';
    }
    return text;
  }

  getBack() {
    this.router.navigate(['home']);
  }

  scrollToTop() {
    window.scrollTo({ top: 0});
  }

  getActor(person: number) {
    this.router.navigate(['person', person]);
  }

  prevReview() {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.moviesReviews.length - 1 : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }
  
  nextReview() {
    const isLastSlide = this.currentIndex === this.moviesReviews.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

}
