import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Comment {
  content: string;
  edited?: boolean;
  upvotes: number;
  replies: Comment[];
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() name: string ='hela';
  @Input() imgSrc: string ='assets/images/avatars/003-man-1.svg';
  @Input() currentName: string;
  @Input() currentImgSrc: string ='assets/images/avatars/002-woman.svg';

  @Output() replyCreated: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input() visible = false; // Input to control drawer visibility
  @Output() closeDrawer = new EventEmitter<void>(); // Output to emit when closed

  comment: string = '';
  reply: string = '';
  commentEdit: boolean = false;
  showReplyBox: boolean = false;
  edited: boolean = false;
  numberOfUpvotes: number = 0; // Initialize numberOfUpvotes
  allReplies: Comment[] = [];
  disableEditButtons: boolean = true;
  disableReplyEditButton: boolean = true;
  isFirstToggle: boolean = true;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.disableEditButtons = this.comment.trim() === '';
  }
  
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  toggleDrawer() {
    this.visible = !this.visible;
  }
  

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  upvote() {
    this.numberOfUpvotes += 1;
  }

  createReply() {
    if (this.reply.trim() !== '') {
      const newReply: Comment = {
        content: this.reply,
        edited: false,
        upvotes: 0,
        replies: []
      };
      this.allReplies.push(newReply);
      this.replyCreated.emit(newReply);
      this.reply = '';
      this.showReplyBox = false;
    }
  }  
}
