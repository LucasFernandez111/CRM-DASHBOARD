export interface User {
  _id: string;
  id_token: string;
  picture: string;
  firstName: string;
  email: string;
  sheetId: string;
  company: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalStorageUser extends Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'id_token'> {}
