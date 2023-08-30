const errorHandler = (err, req, res, next) => {
    if (err?.message.includes("already exist" || "expired" || "don't match" || "required")) {
        return res.status(400).send({ status: "error", error: err.message });
    }

    else if (err?.name.includes("ZodError")) {
        return res.status(400).send({ status: "error", error: err.issues });
    }

    else if (err?.message.includes("Incorrect")) {
        return res.status(401).send({ status: "error", error: err.message });
    }

    else if (err?.message.includes("not found")) {
        return res.status(404).send({ status: "error", error: err.message });
    }

    req.logger.error(err);

    res.status(500).send({ status: "error", error: err.message ?? "Error. Something went wrong" });
};

export default errorHandler;
