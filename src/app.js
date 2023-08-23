// Importando o framework Express, que é utilizado para criar aplicativos web em Node.js
import express from 'express';

// Importando o pacote 'cors' que lida com questões de segurança e permite solicitações de origens diferentes.
import cors from 'cors';

// Importando a configuração do banco de dados definida em './config/db_Config.js'
import db from './config/db_Config.js';

// Importando as rotas definidas no arquivo './routes/index.js'
import routes from './routes/index.js';

// Definindo uma função chamada 'conect_db' que será usada para lidar com a conexão com o banco de dados
function conect_db() {
    // Definindo um ouvinte de evento para 'error', que imprime erros de conexão com o banco de dados no console
    db.on('error', (error) => console.log(error));
    // Definindo um ouvinte de evento para 'open', que imprime uma mensagem de sucesso quando a conexão é estabelecida
    db.once('open', () => console.log('Conexão estabelecida com sucesso!'));
}

// Chamando a função 'conect_db' para estabelecer a conexão com o banco de dados
conect_db();

// Inicializando o aplicativo Express
const app = express();

// Usando o middleware 'cors' para permitir solicitações de diferentes origens (cross-origin)
app.use(cors());

// Usando o middleware 'express.json()' para analisar os corpos das solicitações como JSON
app.use(express.json());

// Passando o aplicativo 'app' para as rotas definidas no arquivo './routes/index.js'
routes(app);

// Exportando o aplicativo Express para que ele possa ser usado em outros arquivos
export default app;
