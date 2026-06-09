require('dotenv').config()
 const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Connect to MongoDB
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Handlebars setup
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
