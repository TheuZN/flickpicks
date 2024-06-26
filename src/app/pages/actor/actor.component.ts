import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPersonService } from '../../service/getActor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {

  modalOpen: boolean = false;

  idPerson: number | undefined = undefined;

  imagePath: string = "https://image.tmdb.org/t/p/w500";

  constructor(private getPersonService: GetPersonService, private route: ActivatedRoute, private router: Router ) {}

  personDetail: any[] = [];
  personImages: any[] = [];
  personCredits: any[] = [];

  imageModal: string = "";
  titleModal: string = "";
  averageModal: number | undefined = undefined;
  overviewModal: string = "";
  popularityModal: number | undefined = undefined;
  releaseModal: string = "";
  idModal: number | undefined = undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPersonParam = params.get('idPerson');
      this.idPerson = idPersonParam !== null ? Number(idPersonParam) : undefined;
      if (this.idPerson !== undefined) {
        this.scrollToTop();
        this.getDetailsPerson(this.idPerson);
        this.getImagesPerson(this.idPerson);
        this.getCreditsPerson(this.idPerson);
      }
    });
  }
  
  getDetailsPerson(idPerson: number): void {
    this.getPersonService.getDetailPerson(idPerson).subscribe(
      data => {
        this.personDetail = [data];
        console.log(this.personDetail)
      }
    );
  }

  getImagesPerson(idPerson: number): void {
    this.getPersonService.getImagePerson(idPerson).subscribe(
      data => {
        this.personImages = data;
        console.log(this.personImages)
      }
    );
  }

  getCreditsPerson(idPerson: number): void {
    this.getPersonService.getCreditsPerson(idPerson).subscribe(
      data => {
        this.personCredits = data;
        console.log(this.personCredits)
      }
    );
  }

  scrollToTop() {
    window.scrollTo({ top: 0});
  }

  getBack() {
    this.router.navigate(['home']);
  }

  modalClose() {
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
  }

  turnFalse() {
    this.modalOpen = false;
    document.body.classList.remove('scrool-none');
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

  getDetail() {
    this.router.navigate(['detail', this.idModal]);
    document.body.classList.remove('scrool-none');
    this.modalOpen = false;
  }
}
