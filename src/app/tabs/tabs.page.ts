import { Component, Renderer2 } from '@angular/core';
import { ScreenSizeService } from '../services/screen-size/screen-size.service';
//import { SignalRService } from '../services/signal-r.service';
import { StorageService } from '../services/storage/storage.service';
import { AuthConstants } from '../config/auth-constants';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  badgecount=0;
  isDesktop: boolean;
  signalList: any = [];
  constructor(private screensizeService: ScreenSizeService,private storageService:StorageService,
    private renderer: Renderer2) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }
 
      this.isDesktop = isDesktop;
    });
    /*this.signalRService.signalReceived.subscribe((signal: any) => {
      console.log("-->" + signal.msg);
      this.badgecount = signal.msg;
      this.signalList.push(signal);
    });*/
  }

  ionViewWillEnter(){
    if(localStorage.getItem('darkmode') == null){
      localStorage.setItem('darkmode','false');
    }
     if(localStorage.getItem('darkmode') == 'true'){
      console.log("true");
      this.renderer.setAttribute(document.body, "color-theme", "dark");
    }else{
      console.log("false");
      this.renderer.setAttribute(document.body, "color-theme", "light");
    }
  }

  logout() {
    
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      localStorage.clear();
      window.location.reload();
      //this.router.navigate(['/login']);
    });
  }

}
