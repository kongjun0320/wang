module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')

  router.get('/list', async (req, res) => {
    const list = await Category.find().limit(10)
    res.send(list)
  })
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  app.use('/admin/api', router)
}