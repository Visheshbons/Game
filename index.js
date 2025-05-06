import { app, port, cookieParser, chalk, express, users } from './appConfig.js';

// Transform users object into an array
const usersArray = Object.keys(users).map((key) => {
  return {
    username: users[key].name,
    score: users[key].points,
    level: users[key].level,
    lastLogin: new Date(users[key].last_login),
  };
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home', user: usersArray });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send('<pre>Nice try.</pre>');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Users data:`);
  console.table(usersArray);
});