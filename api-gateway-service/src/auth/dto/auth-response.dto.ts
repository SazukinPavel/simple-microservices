import { User } from 'src/types/User';

export default interface AuthResponseDto {
  token: string;
  user: User;
}
