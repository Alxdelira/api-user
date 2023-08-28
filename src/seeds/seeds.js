import faker from "faker-br";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import db from "../config/db_Config.js";


// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});


await User.deleteMany();

const usuarios = [];

const usuarioPadrao = {
    name: 'Alexandre Nogueira de Lira',
    email: 'alx.delira@gmail.com',
    password: '12345678',
    ativo: true,
};

usuarios.push(usuarioPadrao);

function seedUsuario(qtdusuarios) {
    for (let i = 1; i <= qtdusuarios; i++) {
        const nome = faker.name.firstName();
        const nome_meio = faker.name.lastName();
        const sobrenome = faker.name.lastName();
        const email = `${nome}.${sobrenome}@gmail.com`;

        const seedUsuarios = {
            name: `${nome} ${nome_meio} ${sobrenome}`,
            email: email.toLowerCase(),
            password: senhaHash(),
            ativo: true,
        };

        usuarios.push(seedUsuarios);
    }
    return usuarios;
}

seedUsuario(100);
await User.collection.insertMany(usuarios);
console.log(`${usuarios.length} Usuários inseridos!`);

// Função para criptografar senha usando bcryptjs
function senhaHash() {
    return bcrypt.hashSync('12345678', 8);
}

// Desconectando do banco de dados com mensagem de sucesso ou erro
db.close();
console.log('Conexão com o banco encerrada!');