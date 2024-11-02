import {Message} from "../../types/message.ts";
import {SubContact} from "../../types/subContact.ts";

 export interface ChatState {
    messages: Message[];
    inputValue: string;
    selectedChat: SubContact | null;
    isChatMangerView: boolean;
}

export const initialState:ChatState = {
    messages: [] as Message[],
    inputValue: "",
    selectedChat: null as SubContact | null,
    isChatMangerView: true,
};


export interface FetchChatsArgs {
    contactId: string;
    subContact: SubContact;
}

export interface FetchChatsResponse {
    messages: Message[];
    selectedChat: SubContact
}


