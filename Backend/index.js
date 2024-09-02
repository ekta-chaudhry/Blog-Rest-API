const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes');
const blogRoutes = require('./routes/blog-routes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
mongoose.connect('mongodb+srv://ekta00sea:Passworderror4041@cluster0.3cjdn.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to Database!');
    app.listen(3002);
})