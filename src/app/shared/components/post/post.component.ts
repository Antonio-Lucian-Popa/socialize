import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import Swiper from 'swiper';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit{

  @ViewChildren('swiperContainers')
  swiperContainers!: QueryList<ElementRef>;

  posts: any[] = [];
  showNavigation: boolean[] = [];
  swipers: Swiper[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit() {
    // Initialize Swiper when the view is ready
    this.swiperContainers.changes.subscribe(() => {
      this.initSwiper();
    });
    // Initialize Swiper for the first load
    this.initSwiper();
  }

  loadPosts() {
    this.posts = [
      {
        id: 1,
        description: "test",
        images: [
          "./assets/img/post-image.jpg",
          "./assets/img/post-image.jpg"
        ],
      },
      {
        id: 2,
        description: "jahdjasdh",
        images: [
          "./assets/img/post-image.jpg",
          "./assets/img/post-image.jpg"
        ],
      }
    ];
    // Update navigation visibility
    this.showNavigation = this.posts.map(post => post.images.length > 1);
  }

  initSwiper() {
    // Ensure previous Swiper instances are properly destroyed
    this.swipers.forEach(swiper => swiper.destroy(true, true));
    this.swipers = [];

    this.swiperContainers.forEach((swiperContainer, index) => {
      this.swipers.push(new Swiper(swiperContainer.nativeElement, {
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }));
    });
  }
}

