import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class userController {

    static async createUser(req, res) {
        try {
            const newUser = new User({
                nome,
                email,
                password
            });

            if (!nome || !email || !password) {
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
            res.status(500).json({ error: true, code: 500, message: 'Erro Interno no Servidor!' });
        }
    }

    static async getUsers(req, res) {
        try {
            const { nome, email, ativo } = req.query;
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
                populate: 'user',
                sort: '-createdAt'
            };
            const users = await User.paginate({
                nome: {
                    $regex: nome || '',
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
            const { nome, email, password, ativo } = req.body;

            const newUpdateUser = await findByIdAndUpdate(
                id,
                {
                    nome,
                    email,
                    password,
                    ativo
                },
                { new: true }
            );

            if (!newUpdateUser) {
                return res.status(404).json({ message: 'Usuario não encontrado!' });
            }

            if (!newUpdateUser.nome || !newUpdateUser.email || !newUpdateUser.password || !newUpdateUser.ativo) {
                return res.status(400).json({ message: 'Dados obrigatórios faltando!' });
            }

            res.status(200).json({ message: 'Usuário atualizado com sucesso!', newUpdateUser });
        } catch (error) {
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