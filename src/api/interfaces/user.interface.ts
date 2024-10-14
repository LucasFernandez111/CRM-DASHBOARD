export interface User {
  _id: string;
  id_token: string;
  refresh_token: string;
  picture: string;
  firstName: string;
  email: string;
  sheetId: string;
  company: null;
  phone: null;
  address: null;
  createdAt: Date;
  updatedAt: Date;
}
