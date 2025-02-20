const TryCatch = require("../utils/TryCatch");
const { z } = require("zod");
const ApiError = require("../utils/ApiError");

const registerValidation = () =>
  TryCatch(async (req, res, next) => {
    const userSchema = z
      .object({
        name: z
          .string()
          .trim()
          .min(3, "Name must be at least 3 characters long")
          .max(20, "Name can only be at most 20 characters"),

        email: z.string().trim().email("Invalid email format"),

        password: z
          .string()
          .trim()
          .min(4, "Password must be at least 3 characters long"),

        confirmPassword: z
          .string()
          .trim()
          .min(3, "Confirm Password must be at least 3 characters long"),

        age: z.preprocess(
          (val) => Number(val),
          z.number().min(18, "Only users above 18 are allowed")
        ),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    const validationResult = userSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.errors });
    //   return new ApiError(400, "", validationResult.error.errors)
    }

    console.log("in validation", validationResult)

    // Attach validated data to request object
    req.data = validationResult.data;

    next();
  });

module.exports = { registerValidation };
