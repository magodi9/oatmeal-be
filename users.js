const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Router } = require("express");
const router = Router();
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.post("/create", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        id: req.body.id,
        createdAt: req.body.createdAt,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        ProductLikes: req.body.ProductLikes,
      },
    });
    res.json(req.body);
  } catch (error) {
    console.log(`ERROR ${error}`)
    res.status(400).end()
  }
  
});

router.get("/all", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users);
});
module.exports = router