import { DataSource } from 'typeorm'
import { User } from '../entitie/User';

export const Connection = new DataSource({
    type: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 1433,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    entities: [User],
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    pool: {
        min: 2,
        max: 10,
    },
})

export async function dbstatus(){
  try {
    return await Connection.initialize();
  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    throw error;
  }
}
