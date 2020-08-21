import { ApolloError } from 'apollo-server-micro'
import 'colors'

const errorHandler = (err, req, res, next) => {

    console.log(`Error Handler Ran`.red.bold);

    let error = { ...err };
    error.message = err.message;

    // console.log(error.name);    // cast error it is
    console.log(error)

    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ApolloError(message, 404);
    }

    // mongoose duplicate key
    if (err.code === 11000) {
        const message = `Resource already exists`;
        error = new ApolloError(message, 400);
    }

    // validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ApolloError(message, 400);
    }

    // console.log(err.stack.red);
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

export default errorHandler;