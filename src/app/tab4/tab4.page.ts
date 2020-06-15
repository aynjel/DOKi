import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  displayUserData : any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any) => {
      console.log(res);
        this.displayUserData = res;
      });
    
  }

}
