import {ServiceResponse} from "../../base/";
import {User} from "../../user";

type AuthResponseDto = ServiceResponse<{
    token: string;
    user: User;
}>;

export default AuthResponseDto;
