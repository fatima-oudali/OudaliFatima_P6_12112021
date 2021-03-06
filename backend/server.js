//---------On crée un programme qui va écouter(attendre) des requêtes http et va y répondre------------

const http = require("http"); //on importe le package http de node
const app = require("./app"); //on importe notre app express


//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne 
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port); //on dit à app sur quel serveur elle va tourner


//la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//on appelle la méthode createServer du package http, 
//qui prend comme argument la fonction qui va être appelée à chaque requête reçue par le serveur; ici la fonction est notre application créée par express.
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});


server.listen(port); //le serveur écoute (attend) les requêtes envoyées
