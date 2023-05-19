const errorHandler = (err, req, res, next) => {

    if (err?.message.toLowerCase().includes("not found")) {
        return res.status(404).send({status: "error", error: err.message });
    } 
    
    else if (err?.name.includes("ZodError")) {
        return res.status(400).send({status: "error", error: err.issues });
    }

    res.status(500).send({status: "error", error: err?.message ?? "Error. Something went wrong"});
}

export default errorHandler;
