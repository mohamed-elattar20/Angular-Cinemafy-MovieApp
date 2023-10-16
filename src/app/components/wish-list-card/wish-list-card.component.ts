import { Component, Input } from '@angular/core';
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { WatchListService } from 'src/app/services/watch-list.service';
import { MovieDetails } from 'src/app/interfaces/movie';


@Component({
  selector: 'app-wish-list-card',
  templateUrl: './wish-list-card.component.html',
  styleUrls: ['./wish-list-card.component.css'],
})
export class WishListCardComponent {
  // Fontawesome
  faHeart = faHeart;
  faStar = faStar;
  @Input() movie!: MovieDetails;
  imgBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  moviesSet!: Map<number,MovieDetails>;
  favorite!: boolean;
  constructor(private watchListService: WatchListService){}
  ngOnInit() {
    console.log(this.movie);
    this.watchListService.getMoviesArray().subscribe((moviesSet) => this.moviesSet = moviesSet);
    this.favorite = this.moviesSet.has(this.movie.id);
  }
  addToWatchList(){    
    if(this.moviesSet.has(this.movie.id)){
      this.moviesSet.delete(this.movie.id);
      this.favorite = false;
    }else{
      this.moviesSet.set(this.movie.id, this.movie);
      this.favorite = true;
    }
  }
}
