const express = require('express');
const app = express();
const TodoRoutes = require('./src/routers/taskRoutes');
const PORT = 3000;

app.use(express.json());

app.use('/', TodoRoutes)

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});