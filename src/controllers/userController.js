import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class userController {

    static async createUser(req, res) {
        try {
            const { name, email, password, ativo } = req.body;
            const newUser = new User({
                name,
                email,
                password,
                ativo
            });

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Dados obrigatórios faltando!' });
            }
            if (await User.findOne({ email })) {
                return res.status(400).json({ message: 'E-mail já cadastrado!' });
            }

            let senhaHash = await bcrypt.hash(password, 8);
            newUser.password = senhaHash;

            await newUser.save();

            res.status(201).json({ message: "Usuário criado com sucesso!", newUser });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: true, code: 500, message: 'Erro Interno no Servidor!' });
        }
    }

    static async getUsers(req, res) {
        try {
            const { name, email, ativo, page, perPage } = req.query;
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
            };
            const users = await User.paginate({
                name: {
                    $regex: name || '',
                    $options: 'i'
                },
                email: {
                    $regex: email || '',
                    $options: 'i'
                },
                ativo: ativo || true
            }, options);

            if (!users) {
                return res.status(404).json({ message: 'Nenhum usuário encontrado!' });
            }

            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Erro Interno no Servidor!' });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro Interno no Servidor!' });
        }
    }

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, ativo } = req.body;

            const newUpdateUser = await User.findByIdAndUpdate(
                id,
                {
                    name,
                    email,
                    ativo
                },
                { new: true }
            );

            if (!newUpdateUser) {
                return res.status(404).json({ message: 'Usuario não encontrado!' });
            }

            if (!newUpdateUser.name || !newUpdateUser.email ) {
                return res.status(400).json({ message: 'Dados obrigatórios faltando!' });
            }

            res.status(200).json(newUpdateUser);
            console.log(newUpdateUser)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Erro Interno no Servidor!' });
        }
    }


    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro Interno no Servidor!' });
        }
    }

}