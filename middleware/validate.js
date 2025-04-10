// Data validation middleware Students
const isValidated = (req, res, next) => {
  const { name, age } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing 'name' field" });
  }

  const parsedAge = typeof age === "string" ? parseInt(age, 10) : age;
  if (!parsedAge || typeof parsedAge !== "number" || parsedAge <= 0) {
    return res.status(400).json({ error: "Invalid or missing 'age' field" });
  }

  req.body.age = parsedAge; // Ensure `age` is stored as a number
  next(); // Proceed to the next middleware or route handler
};

// Data validation middleware for Teaachers
const validateTeacher = (req, res, next) => {
  const { name, courseAssigned } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing 'name' field" });
  }
  if (
    !courseAssigned ||
    typeof courseAssigned !== "string" ||
    courseAssigned.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'courseAssigned' field" });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = { isValidated, validateTeacher };
