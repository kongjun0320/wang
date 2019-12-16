module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const Category = require('../../models/Category')

  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const list = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send({
      status: 0,
      list,
      msg: '查询列表成功'
    })
  })
  router.post('/:id', async (req, res) => {
    const category = await req.Model.findById(req.params.id)
    res.send({
      status: 0,
      category,
      msg: '根据id查询成功'
    })
  })
  router.put('/:id', async (req, res) => {
    const list = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      status: 0,
      list,
      msg: '更新成功'
    })
  })
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      status: 0,
      msg: '删除成功'
    })
  })
  router.post('/', async (req, res) => {
    const list = await req.Model.create(req.body)
    res.send({
      status: 0,
      list
    }
    )
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}