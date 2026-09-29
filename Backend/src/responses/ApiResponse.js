
class ApiResponse {
    static success(res, data = null, { statusCode = 200, message } = {}) {
        const body = { success: true };
        if (message) body.message = message;
        body.data = data;
        return res.status(statusCode).json(body);
    }
    static error(res, error) {
        const body = { success: false, message: error.message };
        if (error.detalles?.length > 0) body.errors = error.detalles;
        return res.status(error.statusCode).json(body);
    }
}
export default ApiResponse;
