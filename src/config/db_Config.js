// Importando o pacote mongoose, que é uma biblioteca ODM (Object Data Modeling) para MongoDB
import mongoose from "mongoose";

// Importando o pacote dotenv para carregar variáveis de ambiente a partir do arquivo .env
import * as dotenv from "dotenv";

// Carregando as variáveis de ambiente do arquivo .env
dotenv.config();

// Conectando ao banco de dados MongoDB usando a URL fornecida em process.env.DB_URL
await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,           // Opção para usar o novo analisador de URL
    useUnifiedTopology: true,       // Opção para usar o novo mecanismo de descoberta e monitoramento de servidor
}).then(response => {
    console.log("Connected to MongoDB"); // Mensagem exibida quando a conexão é estabelecida com sucesso
}).catch(err => {
    console.log("Error connecting to MongoDB", err); // Mensagem exibida em caso de erro na conexão
});

// Obtendo a instância de conexão com o MongoDB criada pelo Mongoose
let db = mongoose.connection;

// Exportando a instância de conexão para que possa ser usada em outras partes do código
export default db;
