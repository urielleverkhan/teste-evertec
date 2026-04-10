//server.js
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cd) {
    cd(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage });

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewarer = jsonServer.defaults();
const routes = require(path.join(__dirname, 'routes.json'));

server.use(middlewarer);
server.use(jsonServer.rewriter(routes));
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});
server.use(jsonServer.bodyParser);

// Middleware customizado para ExcluirPergunta
server.post('/ExcluirPerguntas', (req, res) => {
  const idPergunta = req.query.idPergunta || req.body.idPergunta;
  console.log('AQUIOP', idPergunta);
  if (!idPergunta) {
    return res.status(400).json({ erro: 'idPergunta é obrigatório' });
  }

  try {
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const indexPergunta = db.ListarPerguntas.findIndex(
      (p) => p.idPergunta === parseInt(idPergunta)
    );

    if (indexPergunta === -1) {
      return res.status(404).json({ erro: 'Pergunta não encontrada' });
    }

    db.ListarPerguntas.splice(indexPergunta, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(200).json({ mensagem: 'Pergunta excluída com sucesso' });
  } catch (erro) {
    res
      .status(500)
      .json({ erro: 'Erro ao excluir pergunta', detalhes: erro.message });
  }
});

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(upload.any());
server.use(router);

server.listen(4000, () => {
  console.log('Json server is running');
});
