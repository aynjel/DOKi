import { Injectable } from "@angular/core";

@Injectable()
export class Messages {

    /* Login Authentication */
    public INVALID_USER_NAME: string = "Invalid User Name";
    public INVALID_PASSWORD: string = "Invalid Password";
    public INVALID_USER_NAME_OR_PASSWORD: string = "Incorrect Authentication Details.";

    /* Server */
    public SERVER_ERROR: string = "Server Error";

    /* Browser */
    public BROWSER_ENABLE_JAVASCRIPT: string = "Please enable JavaScript to continue using this application.";

    /* Data */
    public NO_DATA_AVAILABLE: string = "No Data Available";
}