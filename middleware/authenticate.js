const isAuthenticated = (req, res, next) => {
    console.log('Session Info:', req.session); // Log session information for debugging
    if (!req.isAuthenticated()) {
        console.log('Unauthorized access attempt:', req.originalUrl); // Log the attempt

        return res.status(401).json({
            error: "You do not have access.",
            status: 401
        });
    }
    next(); // User is authenticated; proceed to the next middleware/route handler
};

module.exports = { isAuthenticated };
