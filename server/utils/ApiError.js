class ApiError extends Error {
    constructor(status, message, errors = [], stack = "") {
      super(message);
      this.status = status;
      this.message = message;

      if (errors && Array.isArray(errors) && errors.length > 0) {
        this.errors = errors; // Attach validation errors if provided
    }
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  module.exports = ApiError;