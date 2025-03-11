const TryCatch = require("../utils/TryCatch");
const { z } = require("zod");
const ApiError = require("../utils/ApiError");

const registerValidation = () => TryCatch(async (req, res, next) => {
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
        .min(4, "Confirm Password must be at least 3 characters long")
        .optional(),

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
    return res.status(400).json({ errors: validationResult?.error?.errors });
  }

  // console.log("in validation", validationResult)

  // Attach validated data to request object
  req.data = validationResult.data;

  next();
});

const adminLoginValidation = () => TryCatch(async (req, res, next) => {
  const adminSchema = z.object({
    email: z.string().trim().email("Invalid email format"),
    adminKey: z.string().trim(),
  });

  const validationResult = adminSchema.safeParse(req.body);

  if (!validationResult.success)
    return res.status(400).json({
      errors:
        validationResult.error.errors ||
        "Error in admin registration validation",
    });

  next();
});

const createTeamValidation = () => TryCatch(async (req, res, next) => {
  const teamSchema = z.object({
    name: z.string().min(1, "Team name is required"),
    logo: z.string().url("Invalid logo URL"),
    totalPlayers: z.number().int().nonnegative().default(0),
    mainPlayers: z.array(z.number().int().positive()).optional().default([]),
    matchesInfo: z.array(z.record(z.unknown())).optional(), // Array of JSON objects (match stats)
  });

  const validationResult = teamSchema.safeParse(req.body);
  if (!validationResult.success)
    return res.status(400).json({
      errors:
        validationResult.error.errors ||
        "Error in admin registration validation",
    });
  
  req.teamData = validationResult.data;

  next();
});

module.exports = {
  registerValidation,
  adminLoginValidation,
  createTeamValidation,
};
