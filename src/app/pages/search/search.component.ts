import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { GetSearchService } from '../../service/getSearch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  querySearch: any;

  moviesSearch: any[] = [];

  imagePath: string = "https://image.tmdb.org/t/p/w500";

  constructor(private route: ActivatedRoute, private getSearchService: GetSearchService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.querySearch = params.get('query');
      this.getMovieSearch(this.querySearch);
      this.scrollToTop();
    });
  }

  getMovieSearch(search: any){
    this.getSearchService.getMovieSearch(search).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.moviesSearch = data;
        }
      });
  }

  getDetail(id: any) {
    this.router.navigate(['detail', id]);
  }

  scrollToTop() {
    window.scrollTo({ top: 0});
  }
}
