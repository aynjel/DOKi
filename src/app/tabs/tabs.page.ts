import { Component } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';
//import { SignalRService } from '../services/signal-r.service';
import { StorageService } from '../services/storage.service';
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
  constructor(private screensizeService: ScreensizeService,private storageService:StorageService) {
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
  logout() {
    
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      localStorage.clear();
      window.location.reload();
      //this.router.navigate(['/login']);
    });
  }

}
