export interface SubContact {
  avatar: string;
  subContactId: string;
  isIncomingMessage?: boolean;
  name: string;
  phoneNumber: string;
}

export interface FetchModifySubContactParams {
  subContactId: string;
  actionType: "add" | "delete";
}

  export type SubContactId = string;

  export interface ActionType {
    actionType: "add" | "delete";
  }

  export type FetchModifySubContactResponse = ActionType & {
    subContact?: SubContact;
    subContactId?: SubContactId;
  };

