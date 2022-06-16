const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllMovies = async (req, res) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.decode(token);

    const foundUser = await prisma.user.findFirst({
      where: {
        username: decoded.username,
      },
    });

    if (foundUser) {
      const movies = await prisma.movie.findMany({
        where: { userId: foundUser.id },
      });
      res.json({ data: movies });
    }
  } catch (err) {
    res.status(401).json({ status: "Fail", error: err.message });
  }
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  try {
    const [bearer, token] = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.JWT_SECRET);

    const decoded = jwt.decode(token);

    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
        user: {
          connect: { username: decoded.username },
        },
      },
    });

    res.json({ data: createdMovie });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token provided." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
