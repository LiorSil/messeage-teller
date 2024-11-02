export type Message = {
  fromId: string;
  toId: string;
  sentTD?: Date;
  read?: boolean;
  readTD?: Date;
  content: string;
};

export enum MessageScenario {
  SenderNotInContacts = 'SenderNotInContacts',
  SenderIsSelected = 'SenderInContactsSelected',
  SenderInNotSelected = 'SenderInContactsNotSelected'
}
