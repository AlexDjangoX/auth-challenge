const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { username, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const createdUser = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    res.json({ data: createdUser });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  const passwordIsValid = await bcrypt.compare(password, foundUser.password);

  if (!foundUser || !passwordIsValid) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  console.log(token);

  res.json({ data: token, name: username });
};

module.exports = {
  register,
  login,
};
