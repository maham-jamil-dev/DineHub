const ownerMiddleware = (req, res, next) => {

    if (req.user.role !== "owner") {

        return res.status(403).json({
            success: false,
            message: "Only Restaurant Owners Can Access"
        });

    }

    next();

};

export default ownerMiddleware;