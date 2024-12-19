import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from 'src/dto/createClientDto';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class ClientesService {
    constructor(private prisma:PrismaService){}

    async readClients(){
        try{
            return await this.prisma.clientes.findMany()
        }
        catch {
            throw new HttpException('Ocorreu um erro ao consultar os clientes', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readClient(id:number){
        try{
            const cliente = await this.prisma.clientes.findUnique({
                where:{
                    cod:id
                }
            })

            if(cliente){
                return cliente;
            }
            else{
                console.log("Entrou aqui")
                throw new HttpException('O cliente não foi encontrado', HttpStatus.NOT_FOUND)
            }
        }
        catch(error) {
            if(error instanceof HttpException){throw error}
            throw new HttpException('Ocorreu um erro ao consultar o cliente', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createClient(cliente: CreateClientDto){
        try{
            return await this.prisma.clientes.create({
                data: cliente
            })
        }
        catch(error){
            if(error.code === 'P2002'){
                const camposErro = error.meta.target;
                if(camposErro.includes('cpf')){
                    throw new HttpException('Já existe um cliente com este CPF', HttpStatus.CONFLICT)
                }
                if(camposErro.includes('email')){
                    throw new HttpException('Já existe um cliente com este email', HttpStatus.CONFLICT)
                }
            }
            throw new HttpException('Ocorreu um erro ao cadastrar o cliente', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
