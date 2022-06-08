//response json
const response = {
    success: (res, data, message, code) => {
        res.status(code).json({
            status: "success",
            data: data,
            message: message
        });
    },
    error: (res,status, message, code) => {
        res.status(code).json({
            status: status,
            message: message
        });
    }
};

module.exports = response;