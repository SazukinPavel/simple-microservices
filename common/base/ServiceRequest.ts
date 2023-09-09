import {User} from "../user";

export default interface Response<T> {
    data: T;
    user: User;
}
