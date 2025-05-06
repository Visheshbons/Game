import { app, port, cookieParser, chalk, express, users } from './appConfig.js';
import { setupUserRoutes } from './userHandler.js';

// Transform users object into an array
const usersArray = Object.keys(users).map((key) => {
  return {
    username: users[key].name,
    score: users[key].points,
    level: users[key].level,
    lastLogin: new Date(users[key].last_login),
  };
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Setup routes
setupUserRoutes(app);

app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home', user: usersArray });
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { title: 'Login', user: usersArray });
});

app.get('/newUser', (req, res) => {
  res.render('newUser.ejs', { title: 'New User', user: usersArray });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('<pre>Nice try.</pre>');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Users data:`);
  console.table(usersArray);
});