const errorHandler = (err, req, res, next) => {
    console.error('ERROR:', {
        message: err.message,
        method: req.method,
        url: req.originalUrl,
        stack: err.stack
    });

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal server error'
    });
};

export default errorHandler;
