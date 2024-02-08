export interface Notification {
    _id: string,// unique identifier of the notification
    appReceiver: string,// DOKi, RESi, PXi, etc.
    message: string,// message to be displayed
    messageType: string,// type of message
    recipientId: string,// unique identifier of the recipient
    status: number,// status of the notification
    dateTimeSend: string | null,// date and time when the notification was sent
    dateTimeRead: string | null,// date and time when the notification was read
    urlRedirect: string | null,// URL to redirect the user to
}

export interface PublicKey {
    data: {
        publicKey: string;// public key that the server uses to encrypt data
    },
    message?: string;// message from the server
}

export interface SubscriptionPayload {
    message: string;// message from the server
    data: {
        endpoint: string;// endpoint of the user's browser
        expirationTime?: number;// expiration time of the subscription
        keys: {
            auth: string;// authentication key
            p256dh: string;// public key
        };
        timestamp: string;// timestamp of the subscription
    };
}

export interface NotificationData {
    message?: string;// message from the server
    data: Notification[];// list of notifications
    totalCount: number;// total number of notifications
}

export interface MessageTypeData {
    message?: string;// message from the server
    data: MessageType[];// list of message types
}

export interface MessageType {
    _id?: string;// unique identifier of the message type
    appReceiver?: string;// DOKi, RESi, PXi, etc.
    messageType: string;// type of message
    title: string;// title of the message
    isActive?: boolean;// status of the message type
}