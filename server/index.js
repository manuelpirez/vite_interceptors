const express = require('express');
const bodyParser = require('body-parser');
const mockdb = require('./static/mockdb.json')

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin',  req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, test, authorized');


  next();
});


// TOKEN VERIFY
app.post('/token_verify_auth', (req, res) => {
  console.log('/token_verify_auth');
  const payload = mockdb.token_verify_auth
  res.json({ ...payload });
});
// TOKEN GET
app.get('/token_get_anon', (req, res) => {
  console.log('/token_get_anon');
  const payload = mockdb.token_get_anon
  res.json({ ...payload });
});
app.get('/token_refresh', (req, res) => {
  console.log('/token_refresh');
  const payload = mockdb.token_refresh
  res.json({ ...payload });
});



app.post('/site_river', (req, res) => {
  console.log('/site_river');
  const payload = mockdb.site_river
  res.json({ ...payload });
});
app.post('/user_feedback', (req, res) => {
  console.log('/user_feedback');
  const payload = mockdb.user_feedback
  res.json({ ...payload });
});
app.post('/login', (req, res) => {
  console.log('/login');
  const payload = mockdb.token_verify_auth
  res.json({ ...payload });
})

app.get('/comments',(req, res)=>{
  console.log('/comments');
  const payload = mockdb.get_comments
  res.json({ ...payload });
})

// TODOS DEMO
app.get('/list', (req, res) => {
  console.log('/list');
  const payload = mockdb.search_results
  res.json({ ...payload });
});
// search a value in list, change title and return
app.patch('/list/:id', (req, res) =>  {
  console.log('/list');
  const id = req.params.id;
  const title = req.body.title;
  const newMock =  {...mockdb.search_results}

  const result = newMock.results.find(item => item.id === id);

  if (result) {
    result.title = title;
    res.json(result);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});
// search a value in list, change title and return
app.post('/list', (req, res) =>  {
  console.log('/list');
  const newMock =  {...mockdb.search_results}

  const id = req.body.id;
  const title = req.body.title;
  newMock.results = [...newMock.results, {id, title}]
  res.json(newMock);

});
app.delete('/list/:id', (req, res) => {
  console.log('/list');
  const id = req.params.id;
  const title = req.body.title;
  const newMock =  {...mockdb.search_results}

  const result = newMock.results.filter(item => item.id === id);

  if (result) {
    result.title = title;
    res.json(result);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

