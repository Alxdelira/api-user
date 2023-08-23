// Importando o aplicativo Express definido no arquivo 'src/app.js'
import app from './src/app.js';

// Importando o pacote dotenv para carregar variáveis de ambiente a partir do arquivo .env
import * as dotenv from 'dotenv';

// Carregando as variáveis de ambiente do arquivo .env
dotenv.config();

// Definindo a porta do servidor a partir das variáveis de ambiente, ou usando a porta 3040 como padrão
const port = process.env.PORT || 3040;

// Inicializando o servidor Express para escutar as conexões na porta especificada
app.listen(port, () => {
    // Imprimindo uma mensagem indicando que o servidor está rodando
    console.log(`Servidor rodando em http://localhost:${port}`);
});
