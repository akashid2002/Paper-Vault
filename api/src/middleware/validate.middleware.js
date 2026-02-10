import { ZodError } from "zod";

export const validate = (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req[source]);

      if (source === "query") {
        req.validatedQuery = parsedData;
      } else if (source === "params") {
        req.validatedParams = parsedData;
      } else {
        req.validatedBody = parsedData;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = {};

        err.issues.forEach((issue) => {
          const field = issue.path.join(".");
          formattedErrors[field] = issue.message;
        });

        return res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
      }

      next(err);
    }
  };
};
