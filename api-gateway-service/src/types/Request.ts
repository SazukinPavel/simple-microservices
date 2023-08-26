import { Request as ExpressRequest } from 'express';
import { User } from './User';

interface Request extends ExpressRequest {
  auth?: { token: string; user: User };
}

export default Request;
