const fs = require('fs');
const { join } = require('path');

// JSON para simular um banco de dados que armazena as mensagens
const filePath = join(__dirname, 'chat.json');

const getChat = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveMsg = (msgs) => fs.writeFileSync(filePath, JSON.stringify(msgs, null, '\t'));

const msgRoute = (app) => {
  app.route('/msgs/:id?')
    .get((req, res) => {
      const msgs = getChat();
      res.send({ msgs });
    })

    .post((req, res) => {
      const msgs = getChat();
      const { type, id, userSend, userGet, msg } = req.body;
      const newMsg = { type, id, userSend, userGet, msg };
      msgs.push(newMsg);
      saveMsg(msgs);
      res.status(201).send('OK');
    })

    .put((req, res) => {
      const msgs = getChat();
      const { type, id, userSend, userGet, msg } = req.body;
      const updatedMsgs = msgs.map((msg) => {
        if (msg.id === req.params.id) {
          return {
            ...msg,
            type,
            id,
            userSend,
            userGet,
            msg,
          };
        }
        return msg;
      });
      saveMsg(updatedMsgs);
      res.status(200).send('OK');
    })

    .delete((req, res) => {
      const msgs = getChat();
      const filteredMsgs = msgs.filter((msg) => msg.id !== req.params.id);
      saveMsg(filteredMsgs);
      res.status(200).send('OK');
    });
};

module.exports = msgRoute;
