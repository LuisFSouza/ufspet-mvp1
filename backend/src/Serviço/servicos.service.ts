import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from 'src/dto/createServiceDto';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class ServicosService {
    constructor(private prisma:PrismaService){}
    async readServices(){
        try{
            return await this.prisma.servicos.findMany()
        }
        catch {
            throw new HttpException('Ocorreu um erro ao consultar os serviços', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readService(id:number){
        try{
            const servico =  await this.prisma.servicos.findUnique({
                where:{
                    cod:id
                }
            })
            if(servico){
                return servico;
            }
            else{
                throw new HttpException('O serviço não foi encontrado', HttpStatus.NOT_FOUND)
            }
        }
        catch(error) {
            if(error instanceof HttpException){throw error}
            throw new HttpException('Ocorreu um erro ao consultar o serviço', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createService(service: CreateServiceDto){
        try{
            return await this.prisma.servicos.create({
                data: service
            })
        }
        catch(error){
            if(error.code === 'P2002'){
                const camposErro = error.meta.target;
                if(camposErro.includes('nome')){
                    throw new HttpException('Já existe um serviço com este nome', HttpStatus.CONFLICT)
                }
            }
            throw new HttpException('Ocorreu um erro ao cadastrar o serviço', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
