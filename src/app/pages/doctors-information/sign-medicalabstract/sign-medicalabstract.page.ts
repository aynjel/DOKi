import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AnimationController,
  IonModal,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SignaturePad } from "angular2-signaturepad";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginResponseModelv3, SignatureApproval } from "src/app/models/doctor";
import { Constants } from "src/app/shared/constants";

@Component({
  selector: "app-sign-medicalabstract",
  templateUrl: "./sign-medicalabstract.page.html",
  styleUrls: ["./sign-medicalabstract.page.scss"],
})
export class SignMedicalabstractPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isNotification: boolean;
  isPortrait: boolean;
  selected = "Final Diagnosis";
  pendingApproval;
  dischargeNo = {
    discharge_no: "",
  };
  isDesktop: boolean;
  pdfSrc;
  isPDFLoading: boolean;
  screenWidth;
  screenHeight;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImg: string;
  signatureImg1;
  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };
  isbutton = false;
  idModal: boolean = false;
  mode = this.constant.modeForProd;
  constructor(
    private navCtrl: NavController,
    public doctorService: DoctorService,
    public screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    public actionSheetController: ActionSheetController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    public functionService: FunctionsService,
    private dbService: NgxIndexedDBService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private animationCtrl: AnimationController,
    private constant: Constants,
    private toastController: ToastController
  ) {
    this.isNotification = true;
    this.screensizeService
      .isPortraitView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isPortrait) => {
        if (this.isPortrait && !isPortrait) {
          if (this.idModal) {
            this.closeModal();
            this.ngOnInit();
          } else {
            this.ngOnInit();
          }
        }
        if (this.isPortrait != undefined && isPortrait) {
          if (this.idModal) {
            this.closeModal();
            this.ngOnInit();
          } else {
            this.ngOnInit();
          }
        }
        this.isPortrait = isPortrait;
      });
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
  }
  back() {
    ////////////console.log(this.idModal);

    this.closeModal();
  }
  ionViewWillEnter() {
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    //console.log(this.logindata);

    this.functionsService.logToConsole(this.logindata);
    this.dr_code = this.logindata.doctorCode;
    this.getSignaturefromIndexedDB(this.dr_code);
    this.getMEdicalAbstractList();
  }
  isApproved;
  logindata;
  dr_code;
  signatureBase64;
  signatureBase64Full;
  signatureID;
  isSignature: boolean = false;
  getSignaturefromIndexedDB(data) {
    this.dbService
      .getByIndex("people", "drCode", data)
      .subscribe((signature: any) => {
        if (signature == undefined) {
          this.isSignature = false;
        } else {
          let myArray: any;
          let compressedSignature =
            "data:image/png;base64," + signature.base64image;
          this.functionService
            .cropImage(compressedSignature)
            .then((compressed: any) => {
              myArray = compressed.split(",");
              this.signatureID = signature.id;
              this.signatureBase64 = myArray[1];
              this.signatureBase64Full = compressed;
              this.isSignature = true;
            });
        }
      });
  }
  saveSignaturetoIndexdb(drCode, base64image, base64imageFull) {
    this.dbService
      .add("people", {
        drCode: drCode,
        base64image: base64image,
        base64imageFull: base64imageFull,
      })
      .subscribe((key) => {
        this.getSignaturefromIndexedDB(this.dr_code);
      });
  }
  updateSignatureonIndexedDB(drCode, base64image, base64imageFull) {
    this.dbService
      .update("people", {
        id: this.signatureID,
        drCode: drCode,
        base64image: base64image,
        base64imageFull: base64imageFull,
      })
      .subscribe((storeData) => {
        this.getSignaturefromIndexedDB(this.dr_code);
      });
  }
  ngOnInit() {
    this.getDIstatus();
    if (this.idModal) {
      this.closeModal();
    }
    this.checkAppearance();
    //////////////console.log('ngOnInit');     path: "inbox/sign-medabs/:pNo/:admissionNo",
    let pNo = this.getpdf();
    this.idModal = false;
    let scWidth = window.innerWidth;
    let scHeight = window.innerHeight;

    if (scWidth <= 666) {
      this.screenWidth = scWidth - scWidth * 0.06;
      this.screenHeight = scHeight - scHeight * 0.35;
    } else if (scWidth <= 1000) {
      this.screenWidth = scWidth - scWidth * 0.05;
      this.screenHeight = scHeight - scHeight * 0.25;
    } else {
      this.screenWidth = scWidth - scWidth * 0.6;
      this.screenHeight = scHeight - scHeight * 0.6;
    }
    if (scHeight >= 1180) {
      this.screenHeight = scHeight - scHeight * 0.6;
    }
    ////console.log('LOGGGGGGGGGGGGG');
    this.signaturePadOptions = {
      minWidth: 5,
      canvasWidth: this.screenWidth,
      canvasHeight: this.screenHeight,
      //backgroundColor: 'rgba(0, 0, 0, 1)',
      backgroundColor: "rgba(255, 255, 255, 0)",
      penColor: "rgb(0, 0, 0)",
    };
    ////console.log(this.signaturePadOptions);
  }
  medicalAbstractList = {
    patient_No: "",
    account_No: "",
    name: "",
    room_No: "",
    date_Admitted: "",
    aP_Dr_Code: "",
    abstract_Approve_By: "",
    abstract_Approve_By_Name: "",
    abstract_Approve_Date: "",
    resi_Dr_Code: null,
    resi_Abstract_Approved_By: null,
    resi_Abstract_Approve_By_Name: null,
    resi_Abstract_Approve_Date: null,
  };

  getMEdicalAbstractList() {
    //     path: "inbox/sign-medabs/:pNo/:admissionNo",
    //console.log(this.dr_code);
    /*this.doctorService
      .getMedicalAbstractList(this.dr_code)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        complete: () => {},
        error: (error) => {
          //console.log(error);
        },
        next: (data: any) => {
          this.medicalAbstractList = data;
          let pNo = this.activatedRoute.snapshot.params.pNo;
          let admissionNo = this.activatedRoute.snapshot.params.admissionNo;
          this.medicalAbstractList = data.find(
            (obj) => obj.account_No === admissionNo && obj.patient_No === pNo
          );
          //console.log(this.medicalAbstractList);
        },
      });*/
  }
  //id=""
  activateIsSignatureModal() {
    this.getSignaturefromIndexedDB(this.dr_code);
    if (!this.idModal) {
      const modalState = {
        modal: true,
        desc: "fake state for our modal",
      };
      history.pushState(modalState, null);
    }
  }
  @HostListener("window:popstate", ["$event"])
  dismissModal() {
    if (this.idModal) {
      this.manualBack();
    }
  }

  signatureConsent: boolean = false;
  setidModalTrue() {
    localStorage.setItem("isModal", "1");
    this.idModal = true;
  }
  isConsent: boolean = true;
  openConsent() {
    //////////////console.log(history);

    this.activateIsSignatureModal();
    this.setidModalTrue();

    if (this.isConsent) {
      document.getElementById("trigger-button-consent-signmedabs").click();
    } else {
      document
        .getElementById("trigger-button-show-signature-signmedabs")
        .click();
    }
  }
  isOldSignature: boolean = false;
  useOldSignature() {
    this.isOldSignature = true;
    this.closeModal();
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let pNo = this.activatedRoute.snapshot.params.pNo;
    let admissionNo = this.activatedRoute.snapshot.params.admissionNo;

    let testApprove1 = {
      account_no: "string",
      abstract_approve_by: "string",
      abstract_approve_by_name: "string",
      doki_signature: "string",
      is_approve: true,
    };

    testApprove1.account_no = admissionNo;
    testApprove1.abstract_approve_by = this.dr_code;

    testApprove1.abstract_approve_by_name =
      this.logindata.lastName +
      ", " +
      this.logindata.firstName +
      " " +
      this.logindata.middleName;
    testApprove1.doki_signature = this.signatureBase64;

    this.saveSignature(testApprove1);
  }
  saveConsent() {
    if (this.signatureConsent) {
      this.modalController.dismiss();
      if (this.isSignature) {
        document
          .getElementById("trigger-button-show-signature-signmedabs")
          .click();
      } else {
        this.openSignaturePad();
      }
    }
  }
  resignSignature() {
    this.modalController.dismiss();
    this.openSignaturePad();
  }
  openSignaturePad() {
    if (!this.idModal) {
      this.activateIsSignatureModal();
      this.setidModalTrue();
    }

    document.getElementById("trigger-button-certificate-signmedabs").click();
  }
  manualBack() {
    this.idModal = false;
    localStorage.setItem("isModal", "0");
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  closeModal() {
    localStorage.setItem("isModal", "0");
    if (this.idModal) {
      this.modalController.dismiss();
    }
    this.idModal = false;
    this.navCtrl.back();
  }
  isModalOpen: boolean = false;
  createFakeState() {
    this.isModalOpen = true;
    const modalState = {
      modal: true,
      desc: "fake state for our modal",
    };
    history.pushState(modalState, null);
  }
  removeFakeState() {
    this.isModalOpen = false;
    this.navCtrl.back();
  }
  closeConsentModal() {
    this.modalController.dismiss();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    ////////////////console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    ////////////////console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.isOldSignature = false;
    if (!this.signaturePad.isEmpty()) {
      this.closeModal();
      this.isbutton = true;
      const base64Data = this.signaturePad.toDataURL("image/png");
      let compressedImage;
      this.signatureBase64Full = base64Data;
      this.functionService
        .compressImage(
          base64Data,
          this.screenWidth * 0.3,
          this.screenHeight * 0.3
        )
        .then((compressed: any) => {
          this.functionService
            .cropImage(compressed)
            .then((croppedImag: any) => {
              this.signatureBase64Full = croppedImag;
              // /        path: "inbox/sign-medabs/:pNo/:admissionNo",
              let pNo = this.activatedRoute.snapshot.params.pNo;
              let admissionNo = this.activatedRoute.snapshot.params.admissionNo;
              const myArray = croppedImag.split(",");

              let testApprove1 = {
                account_no: "string",
                abstract_approve_by: "string",
                abstract_approve_by_name: "string",
                doki_signature: "string",
                is_approve: true,
              };
              //console.log(this.logindata);

              testApprove1.account_no = admissionNo;
              testApprove1.abstract_approve_by = this.dr_code;
              testApprove1.abstract_approve_by_name =
                this.logindata.lastName +
                ", " +
                this.logindata.firstName +
                " " +
                this.logindata.middleName;
              testApprove1.doki_signature = myArray[1];

              this.signaturePad.clear();
              this.saveSignature(testApprove1);
            });
        });
    } else {
      this.functionService.presentToast("Please sign Signature Pad");
    }
  }
  errorMessage;
  doRefresh(event) {
    setTimeout(() => {
      this.getpdf();
      this.getDIstatus();
      //location.reload();
      event.target.complete();
    }, 1000);
  }
  saveSignature(testAprrove) {
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.isPDFLoading = false;
    //console.log(testAprrove);

    this.doctorService
      .approveMedicalAbstract(testAprrove)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          // //////////////console.log(data);
        },
        (error) => {
          this.presentToast("Error in saving");
        },
        () => {
          if (this.isSignature) {
            if (!this.isOldSignature) {
              this.updateSignatureonIndexedDB(
                this.dr_code,
                testAprrove.medcert_signature,
                this.signatureBase64Full
              );
            }
          } else {
            this.saveSignaturetoIndexdb(
              this.dr_code,
              testAprrove.medcert_signature,
              this.signatureBase64Full
            );
          }
          this.getpdf();
          //this.approvePendingAPproval(dischargeNo);
        }
      );
  }
  isUploaded: boolean = false;
  approvePendingAPproval(discharge_no) {
    this.dischargeNo.discharge_no = discharge_no;
    this.doctorService
      .approvePendingApproval(this.dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////console.log('approvePendingAPproval', res);
          //////////////console.log(res);
        },
        (error) => {
          ////////console.log(error);
          //////////////console.log(error);
        },
        () => {
          this.isUploaded = true;
          this.functionService.presentToast(
            "Approving and Uploading of Signature Completed."
          );
          this.ngOnInit();
        }
      );
  }
  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 6000, // Duration in milliseconds
      position: "bottom", // Toast position: 'top', 'bottom', 'middle'
    });
    toast.present();
  }
  getpdf() {
    this.isPDFLoading = false;
    this.pdfSrc = "";
    let accountNo = this.activatedRoute.snapshot.params.admissionNo;
    let ctr = this.activatedRoute.snapshot.params.ctr;
    let testJsonPDF = {
      account_no: accountNo,
      mode: this.mode,
      print_header_footer_flg: true,
    };

    let testtt = {
      account_no: accountNo,
      mode: this.mode,
      ctr: ctr,
    };
    let medabstract = this.doctorService
      .getMedicalAbstractPOST(testtt)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          //////console.log(data);

          let blob = new Blob([data], { type: "application/pdf" });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
        },
        (error) => {
          //////console.log(error);

          this.isPDFLoading = true;
        },
        () => {
          this.isPDFLoading = true;
        }
      );
  }
  checkAppearance() {
    var values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    let dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  autoGrowTextZone(e) {
    if (e.target.scrollHeight + 25 <= 350) {
      e.target.style.height = "0px";
      e.target.style.height = e.target.scrollHeight + 25 + "px";
    }
  }
  forRevisionText = "";
  @ViewChild(IonModal) modal: IonModal;
  dismissForRevisionModal() {
    this.modalController.dismiss(null, "cancel");
  }
  saveForRevisionModal() {
    let forRevisionText = this.forRevisionText;
    let dischargeNo = this.activatedRoute.snapshot.params.dischargeNo;
    this.forRevisionText = "";
    this.cancelApprovedApproval(dischargeNo, forRevisionText);
    this.modalController.dismiss(null, "cancel");
  }
  cancelApprovedApproval(discharge_no: any, revision_dx_remarks: any) {
    let dischargeNo = {
      discharge_no: discharge_no,
      revision_dx_remarks: revision_dx_remarks,
    };
    //////console.log(dischargeNo);

    this.doctorService
      .cancelApprovedFinalDiagnosis(dischargeNo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////////console.log(res);
        },
        (error) => {},
        () => {
          this.functionService.presentToast("Successfully Sent for Revision");
          this.ionViewWillEnter();
        }
      );
  }
  reviseRevokeApproval() {
    document.getElementById("trigger-modal-forRevision-signmedabs").click();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction("reverse");
  };
  backToSearch() {
    //
    let data = "/menu/search-Medical-Abstract";
    this.router.navigate([data]).then(() => {
      // window.location.reload();
    });
  }
  isMaStatusSearching: boolean = false;
  ma_status;
  getDIstatus() {
    this.isMaStatusSearching = true;
    let accountNo = this.activatedRoute.snapshot.params.admissionNo;
    /*   this.doctorService
      .getDI(
        "gw/MedicalAbstract/RetrieveApprovedMedicalAbstract?accountNo=" +
          accountNo
      )
      .subscribe({
        complete: () => {
          this.isMaStatusSearching = false;
        },
        error: (error) => {},
        next: (data: any) => {
          this.isMaStatusSearching = false;
          //console.log(data);
          this.ma_status = data[0].abstract_Status;
        },
      }); */

    let myList = {
      account_no: accountNo,
    };

    this.doctorService.postDI("gw/MedicalAbstract/Adult", myList).subscribe({
      complete: () => {
        this.isMaStatusSearching = false;
      },
      error: (error) => {
        this.isMaStatusSearching = false;
      },
      next: (data: any) => {
        this.isMaStatusSearching = false;
        this.ma_status = data.data.abstract_status;
      },
    });
  }
  testApprove1 = {
    account_no: "string",
    abstract_approve_by: "string",
    abstract_approve_by_name: "string",
    doki_signature: "string",
    is_approve: true,
    abstract_status: "string",
  };
  isSaving: boolean = false;
  approveMedicalAbstract() {
    this.isSaving = true;
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let pNo = this.activatedRoute.snapshot.params.pNo;
    let admissionNo = this.activatedRoute.snapshot.params.admissionNo;
    this.testApprove1.abstract_status = "A";
    this.testApprove1.is_approve = true;
    this.testApprove1.account_no = admissionNo;
    this.testApprove1.abstract_approve_by = this.dr_code;

    this.testApprove1.abstract_approve_by_name =
      this.logindata.lastName +
      ", " +
      this.logindata.firstName +
      " " +
      this.logindata.middleName;
    this.testApprove1.doki_signature = null;
    this.putMA(this.testApprove1);
  }
  revokeMedicalAbstract() {
    let patientId = this.activatedRoute.snapshot.params.admissionNo;
    let pNo = this.activatedRoute.snapshot.params.pNo;
    let admissionNo = this.activatedRoute.snapshot.params.admissionNo;
    this.testApprove1.abstract_status = "F";
    this.testApprove1.is_approve = false;
    this.testApprove1.account_no = admissionNo;
    this.testApprove1.abstract_approve_by = this.dr_code;

    this.testApprove1.abstract_approve_by_name =
      this.logindata.lastName +
      ", " +
      this.logindata.firstName +
      " " +
      this.logindata.middleName;
    this.testApprove1.doki_signature = null;

    this.putMA(this.testApprove1);
  }
  contextText = "";
  putMA(data) {
    this.isSaving = true;
    this.doctorService
      .putDI("gw/MedicalAbstract/ApproveRevokedMedAbstractDOKi", data)
      .subscribe({
        complete: () => {
          this.contextText = "";
          if (data.is_approve) {
            this.ma_status = "A";
          } else {
            this.ma_status = "F";
          }
          this.isSaving = false;
        },
        error: (error) => {
          //console.log(error);

          this.contextText =
            "Apologies, there was an error fetching the data. Please swipe down to refresh and try again.";
          this.isSaving = false;
        },
        next: (data: any) => {
          this.isSaving = false;
          //console.log(data);
        },
      });
  }
}
