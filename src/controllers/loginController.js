import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';


class LoginController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).json({ message: 'Senha inválida!' });
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });

            res.status(200).json({ token });

        } catch (error) {
            res.status(500).json({ message: 'Erro Interno no Servidor!' });
        }
    }
}

export default LoginController;