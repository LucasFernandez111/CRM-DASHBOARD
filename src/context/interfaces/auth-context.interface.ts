import { User } from '@/api';

export default interface AuthContextValues {
  isAuthenticatedUser: () => Boolean;
  setUserLocalStorage: (user: User) => void;
  removeUserLocalStorage: () => void;
  authenticateUser: () => void;
}
