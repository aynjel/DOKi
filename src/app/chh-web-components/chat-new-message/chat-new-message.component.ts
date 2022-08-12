import { Component, Input, OnInit } from '@angular/core';
import { ResiService } from 'src/app/services/resi/resi.service';

@Component({
  selector: 'app-chat-new-message',
  templateUrl: './chat-new-message.component.html',
  styleUrls: ['./chat-new-message.component.scss'],
})
export class ChatNewMessageComponent implements OnInit {
  @Input() toSearch: any;
  display: any = '';
  constructor(private resiService: ResiService) {}

  ngOnInit() {
    //console.log(this.toSearch);
    if (this.toSearch != null) {
      this.resiService
        .getNewCommentFlag(this.toSearch)
        .subscribe((res: any) => {
          //console.log(res[0].new_message);
          if (res[0].new_message >= 1) {
            this.display = res[0].new_message;
          }
        });
    }
  }
}
