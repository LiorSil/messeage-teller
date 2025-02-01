export interface SubContact {
  avatar: string;
  _id: string;
  isIncomingMessage?: boolean;
  name: string;
  phoneNumber: string;
}

export interface FetchModifySubContactParams {
  subContactId: string;
  actionType: "add" | "delete";
}


