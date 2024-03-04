var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(`/taskpane.html`);
});

router.get('/taskpane', function(req, res, next) {
  res.redirect(`/taskpane.html`);
});

router.get('/taskpane.html', function(req, res, next) {
  res.redirect(`/taskpane.html`);
});

router.post("/checkkey", (req, res)=> {
  let key = req.body.key;

  if(key === process.env.APP_KEY){
    res.send(200);
  }
  else{
    res.send(400);
  }
});

router.post("/gpt", async (req, res) => {
  let message = req.body.message;
  let model = req.body.model;
  let key = req.body.key;

  if (key === process.env.APP_KEY) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        'model': model,
        'messages': [
          {
            'role': 'user',
            'content': message
          }
        ],
        'temperature': 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
        }
      }
    );

    res.send(response.data.choices[0].message.content);
  }
  else{
    res.status(400).send("Falha no acesso");
  }
});

module.exports = router;
