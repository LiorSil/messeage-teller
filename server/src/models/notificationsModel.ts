import  { model, Schema } from "mongoose";
import { INotification } from "./model.interfaces";


const notificationSchema = new Schema<INotification>(
    {
        contactId: {
            type: Schema.Types.ObjectId,
            ref: "Contact",
            unique: true,
            required: true,
    }, contactNotifications:{
        type: [Schema.Types.ObjectId],
        ref: "Contact",
        required: true,
        default: [],
    }

    });
// Middleware to ensure unique ObjectIds in contactNotifications
notificationSchema.pre("save", function (next) {
    this.contactNotifications = [...new Set(this.contactNotifications)];
    next();
});

const Notification = model<INotification>("Notification", notificationSchema, "notifications");

export default Notification;


    




