const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const express = require('express')
const app = express()
const users = require('./users')
app.use((req, res, next) => {
  console.log(`new ${req.method} request from ${req.hostname}`);
  next();
});
app.use(express.json());
app.use('/users',users)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products',async (req,res) =>{
  const products = await prisma.product.findMany()
  res.json(products)
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000 🚀 `)
})