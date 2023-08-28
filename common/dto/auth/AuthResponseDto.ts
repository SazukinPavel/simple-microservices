import Response from "../../base/Response";
import { User } from "../../user";

type AuthResponseDto = Response<{
  token: string;
  user: User;
}>;

export default AuthResponseDto;
