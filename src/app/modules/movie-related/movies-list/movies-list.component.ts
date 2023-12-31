import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieDetails } from 'src/app/interfaces/movie';
import { GetMoviesService } from 'src/app/services/get-movies.service';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  // Fontawesome Icons
  faHeart = faHeart;
  faStar = faStar;
  page: number = 1;
  tableSize: number = 20;
  count: number = 10000;
  // Properties
  pageNumber!: number;
  arrOfMoviesList: MovieDetails[];
  searchInputValue: string = '';
  constructor(private movieList: GetMoviesService, private router: Router, private scroll: ViewportScroller) {
    this.arrOfMoviesList = [];
  }
  // Scroll To Top Button
  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
  ngOnInit(): void {
    this.movieList
      .getMoviesList()
      .subscribe((data) => {
        // console.log(data.results);

        this.arrOfMoviesList = data.results
      });
  }

  searchFunc() {
    if (this.searchInputValue.length != 0 && this.searchInputValue.trim()) {
      this.movieList
        .getMovieFromSearch(this.searchInputValue)
        .subscribe((data) => {
          this.movieList.setArrOfSearchedMovies(data.results);
        });
      this.router.navigate(['/movies-search']);
    }
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.movieList
      .getMoviesList(this.page)
      .subscribe((data) => (this.arrOfMoviesList = data.results));
  }
}
