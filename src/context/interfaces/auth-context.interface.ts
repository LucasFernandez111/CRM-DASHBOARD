import { User } from '../../common/interfaces';

export default interface AuthContextValues {
  isAuthenticatedUser: () => Boolean;
  setUserLocalStorage: (user: User) => void;
  removeUserLocalStorage: () => void;
  authenticateUser: () => void;
}
