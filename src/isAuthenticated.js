import jwt from 'jsonwebtoken'
import User from '../models/User'
import 'colors';
import { ApolloError } from 'apollo-server-micro'
import asyncHandler from '../middlewares/asyncHandler';

// protect routes
export const isProtected = async ({ req, res }) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // if cookie has the token, if not the header
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id);

        return true;

    } catch (err) {
        return next(new ApolloError('Not Authorized', 401));
    }
};