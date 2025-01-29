export type PhoneNumber = `05${string & { length: 8 } & {
  [K in keyof any]: K extends keyof "0123456789" ? any : never;
}}`; 
