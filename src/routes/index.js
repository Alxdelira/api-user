import user from "./userRouter.js";

const routes = (app) => {
    // Rota de teste para verificar se a API está funcionando
    app.route("/").get((req, res) => {
        // Configurando a resposta com o status 200 (OK) e retornando um objeto JSON
        res.status(200).json({ message: "Hello World" }); // Retorna uma mensagem de teste
    });

    // Usando o middleware de roteamento para lidar com outras rotas da API
    app.use(
        user, // Rota para lidar com as operações relacionadas aos usuários
        
    );
};

// Exportando a função de rotas para que possa ser usada em outros arquivos
export default routes;
