import { User } from '../entitie/User';
import { Connection } from '../lib/database';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController{
    static async createUser(req: Request, res: Response){
        try{
            
            const { emailUser, passwordUser } = req.body;

            if(!emailUser || !passwordUser){
                return res.status(400).json({
                    status: false,
                    msg: 'Todos os campos devem ser preenchidos'
                })
            }

            const repo = Connection.getRepository(User);

            const userExisting = await repo.findOneBy({ emailUser: emailUser })

            if(userExisting){
                return res.status(400).json({
                    status: false,
                    msg: 'O email já possui registro cadastrado'
                })
            }

            const hashPassword = await bcrypt.hash(String(passwordUser), 10)

            const user = repo.create({
                emailUser: emailUser,
                passwordUser: hashPassword
            })

            await repo.save(user)

            return res.status(201).json({
                status: true,
                msg: 'Usuario criado com sucesso'
            })

        }catch(error: any){
            return res.status(500).json({
                error: error,
                status: false,
                msg: 'Erro interno'
            })
        }
    }

    static async login(req: Request, res: Response){
        try{

            const { passwordUser, emailUser } = req.body;

            if(!emailUser || !passwordUser){
                return res.status(400).json({
                    status: false,
                    msg: 'Todos os campos devem ser preenchidos'
                })
            }

            const repo = Connection.getRepository(User);

            const user = await repo.findOneBy({ emailUser: emailUser })

            if(!user){
                return res.status(404).json({
                    status: false,
                    msg: 'Usuário não existe'
                })
            }

            const hashDecript = await bcrypt.compare(String(passwordUser), user.passwordUser)

            if(!hashDecript){
                return res.status(400).json({
                    status: false,
                    msg: 'Senha invalida'
                })
            }

                 const token = jwt.sign(
                {
                    id: user.id,
                    email: user.emailUser
                },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' }
            )

            return res.status(201).json({
                status: true,
                msg: 'Login realizado com sucesso',
                data:{
                    token: token
                } 
            })

        }catch(error: any){
            return res.status(500).json({
                status: false,
                msg: 'Erro interno'
            })
        }
    }
}