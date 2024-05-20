import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Comment {
  author: string;
  content: string;
  edited?: boolean;
  upvotes: number;
  replies: Comment[];
  isEditing?: boolean; 
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() name: string = 'Ahmed';
  @Input() imgSrc: string = 'assets/images/avatars/003-man-1.svg';
  @Input() currentName: string = 'Hend';
  @Input() currentImgSrc: string = 'assets/images/avatars/006-woman-1.svg';

  @Output() replyCreated: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input() visible = false;
  @Output() closeDrawer = new EventEmitter<void>();

  newComment: string = '';
  reply: string = '';
  showReplyBox: boolean = false;
  numberOfUpvotes: number = 0;
  allComments: Comment[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  open(): void {
    this.visible = !this.visible;
  }

  close(): void {
    this.visible = false;
  }

  toggleDrawer() {
    this.visible = !this.visible;
  }

  toggleReplyBox() {
    this.showReplyBox = !this.showReplyBox;
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  upvote() {
    this.numberOfUpvotes += 1;
  }

  upvoteReply(reply: Comment) {
    reply.upvotes += 1;
  }

  createReply(parentComment: Comment) {
    if (this.reply.trim() !== '') {
      const newReply: Comment = {
        author: this.currentName,
        content: this.reply,
        edited: false,
        upvotes: 0,
        replies: [],
        isEditing: false
      };
      parentComment.replies.push(newReply);
      this.replyCreated.emit(newReply);
      this.reply = '';
      this.showReplyBox = false;
    }
  }

  addComment() {
    if (this.newComment.trim() !== '') {
      const newComment: Comment = {
        author: this.currentName,
        content: this.newComment,
        edited: false,
        upvotes: 0,
        replies: [],
        isEditing: false
      };
      this.allComments.push(newComment);
      this.newComment = '';
    }
  }

  toggleEdit(comment: Comment) {
    comment.isEditing = !comment.isEditing;
  }
}
