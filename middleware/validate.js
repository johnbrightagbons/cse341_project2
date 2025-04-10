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

// Data validation middleware for Teachers
const validateTeacher = (req, res, next) => {
  const { name, department, courseAssigned, qualification, salary, age } =
    req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid or missing 'name' field" });
  }

  if (
    !department ||
    typeof department !== "string" ||
    department.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'department' field" });
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

  if (qualification && typeof qualification !== "string") {
    return res.status(400).json({ error: "'qualification' must be a string" });
  }

  if (salary && isNaN(Number(salary))) {
    return res.status(400).json({ error: "'salary' must be a valid number" });
  }

  if (age && isNaN(Number(age))) {
    return res.status(400).json({ error: "'age' must be a valid number" });
  }

  next();
};

module.exports = { isValidated, validateTeacher };
