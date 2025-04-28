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
      const validationErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      console.log("validation error", validationErrors);

      return next(new ApiError(400, "Validation Error", validationErrors));
    }

    // Attach validated data to request object
    req.data = validationResult.data;

    next();
  });

const adminLoginValidation = () =>
  TryCatch(async (req, res, next) => {
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

const createTeamValidation = () =>
  TryCatch(async (req, res, next) => {
    const teamSchema = z.object({
      name: z.string().min(1, "Team name is required"),
    });

    const requestData = {
      name: req.body.name,
    };

    const validationResult = teamSchema.safeParse(requestData);

    if (!req.file) return next(new ApiError(400, "Team Logo is Required"));

    if (!validationResult.success)
      return res.status(400).json({
        errors:
          validationResult.error.errors ||
          "Error in admin registration validation",
      });

    req.teamData = validationResult.data;

    next();
  });

const createPlayerValidation = () =>
  TryCatch(async (req, res, next) => {
    const playerSchema = z.object({
      name: z.string().min(2, "Player name is required"),
      age: z
        .number()
        .int()
        .min(18, "Only players above 18 are allowed")
        .optional(),
      role: z.string().min(1, "Player role is required"),
    });

    const validationResult = playerSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({
        errors:
          validationResult.error.errors ||
          "Error in Player registration validation",
      });

    req.playerData = validationResult.data;

    next();
  });

const createTournamentValidation = () =>
  TryCatch(async (req, res, next) => {
    const tournamentSchema = z.object({
      name: z.string().min(1, "Tournament name is required"),
      startDate: z.preprocess((arg) => new Date(arg), z.date()),
      endDate: z.preprocess((arg) => new Date(arg), z.date()),
      location: z.string().min(1, "Tournament location is required"),
      tournamentType: z.enum(["T20", "ODI", "TEST"], "Invalid tournament type"),
      totalTeams: z.coerce.number("Invalid number of teams"),
      status: z
        .enum(["scheduled", "completed", "upcoming"], "Invalid status")
        .optional(),
    });

    const validationResult = tournamentSchema.safeParse(req.body);
    if (!validationResult.success)
      return res.status(400).json({
        errors:
          validationResult.error.errors ||
          "Error in tournament registration validation",
      });

    req.tournamentData = validationResult.data;
    req.tournamentData = {
      ...req.tournamentData,
      schedule: [
        new Date(req.tournamentData.startDate),
        new Date(req.tournamentData.endDate),
      ],
    };

    next();
  });

module.exports = {
  registerValidation,
  adminLoginValidation,
  createTeamValidation,
  createPlayerValidation,
  createTournamentValidation,
};
