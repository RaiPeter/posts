import { Component , OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from "rxjs";

@Component({
    selector:'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls :['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{
    // posts = [
    //     {title: 'Firs Post',content : 'this is the first post'   },
    //     {title: 'second Post',content : 'this is the second post'   },
    //     {title: 'third Post',content : 'this is the thord post'   }
    // ]
    posts:Post[] = [];
    private postsSub : Subscription;
    
    constructor(public postsService:PostService){}

    ngOnInit(){
        this.posts = this.postsService.getPosts();
      this.postsSub =  this.postsService.getPostUpdatedListener()
        .subscribe((posts:Post[])=>{
this.posts = posts;
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
    
}