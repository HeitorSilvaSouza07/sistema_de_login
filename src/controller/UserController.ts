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

            if(emailUser){
                return res.status(400).json({
                    status: false,
                    msg: 'O email já possue registro cadastrado'
                })
            }

            const hashPassword = await bcrypt.hash(String(passwordUser), 10)

            const user = repo.create({
                emailUser: emailUser,
                passwordUser: passwordUser
            })

            await repo.save(user)

            return res.status(201).json({
                status: false,
                msg: 'Usuario criado com sucesso'
            })

        }catch(error: any){

        }
    }

    static async login(req: Request, res: Response){
        try{

            const { passwordUser, emailUser } = req.body;

        }catch(error: any){
            
        }
    }
}