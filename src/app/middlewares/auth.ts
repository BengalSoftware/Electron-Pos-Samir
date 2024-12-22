import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { Role } from '../modules/role/role.model';

const auth =
  (requiredRoles: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;

        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

        req.user = verifiedUser; // role  , email

        //find permissions list with user role
        const permissions = await Role.findOne({ name: verifiedUser.role })

        // role guard with user type
        if (!(verifiedUser?.role === "superAdmin") && !permissions?.permissions.includes(requiredRoles)) {
          throw new ApiError(httpStatus.FORBIDDEN, 'You are unAuthorized to access');
        }
        next();
      } catch (error: any) {
        console.log("error___", error.message)
        next(error);
      }
    };

export default auth;
