function authorization(permission) {
    return async function(req, res, next) {
        const user = req.user;
        const hasPermission = user.role?.permissions.includes(permission);

        if (!(user.isAdmin || hasPermission)) {
            return res.status(403).send({ status: "error", message: "Unauthorized" });
        }

        next();
      };
}

export default authorization;
