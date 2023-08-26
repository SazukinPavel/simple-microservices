import { User } from 'src/types/User';

export default interface AuthResponseDto {
  result: boolean;
  data: {
    token: string;
    user: User;
  };
}
