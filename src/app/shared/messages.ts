import { Injectable } from "@angular/core";

@Injectable()
export class Messages {

    /**
     * Browser
     */
    public BROWSER_ENABLE_JAVASCRIPT: string = "Please enable JavaScript to continue using this application.";

    /**
     * Confirmation
     */
    public CONFIRMATION_DELETE_RECORD: string = "Are you sure you want to delete ";

     /**
     * Data
     */
    public NO_DATA_AVAILABLE: string = "No Data Available";

    /**
     * Invalid
     */
    public INVALID_USER_NAME: string = "Invalid User Name";
    public INVALID_PASSWORD: string = "Invalid Password";
    public INVALID_USER_NAME_OR_PASSWORD: string = "Incorrect Authentication Details.";

    /**
     * Error
     */
    public ERROR_SERVER : string = "Server Error";
    public ERROR_DELETING_RECORD:string = "Error on Deleting ";
    public ERROR_RETRIEVING_ADMITTED_PATIENTS:string = "Sorry Doc. We cannot retrieve the list of your admitted patients at this time. Please try again.";

    /**
     * Success
     */
    public SUCCESS_DELETING_RECORD: string = "Successfully Deleted ";


}