import { Request as ExpressRequest } from 'express';
import { User } from '@common/user/';

interface Request extends ExpressRequest {
  auth?: { token: string; user: User };
}

export default Request;
