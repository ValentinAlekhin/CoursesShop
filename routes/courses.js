const { Router } = require ('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.render('courses', {
    title: 'Courses', 
    isCourses: true,
    courses
  })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }

  const course = await Course.findById(req.params.id)

  res.render('course-edit', {
    title: `Eddit ${course.title}`,
    course
  })
})

router.post('/edit', async (req, res) => {
  await Course.update(req.body)
  res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
  const {id} = req.params
  const course = await Course.findById(id, )
  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course
  })
})

module.exports = router