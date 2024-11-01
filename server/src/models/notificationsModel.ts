import  { model, Schema, Types } from "mongoose";
import { INotification } from "./model.interfaces";


const notificationSchema = new Schema<INotification>(
    {
        fromId: {
            type: Schema.Types.ObjectId,
            ref: "Contact",
            unique: true,
            required: true,
    }, recipients:{
        type: [Schema.Types.ObjectId],
        ref: "Contact",
        required: true,
    }

    });

notificationSchema.pre("save", function (next) {
  this.recipients = [...new Set(this.recipients.map(String))].map(
    (id) => new Types.ObjectId(id)
  );
  next();
});

const Notification = model<INotification>("Notification", notificationSchema, "notifications");

export default Notification;


    




