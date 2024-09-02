const express = require('express');
const blogController = require('../controllers/blog-controller');

const router = express.Router();
router.get('/', blogController.getAllBlogs);
router.post('/add', blogController.postBlog);
router.put('/update/:id', blogController.updateBlog);
router.get('/:id', blogController.getById);
router.delete('/:id', blogController.deleteBlog);
module.exports = router;