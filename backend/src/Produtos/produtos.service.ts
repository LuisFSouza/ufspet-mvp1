import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProductDto } from "src/dto/createProductDto";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class ProdutosService{
    constructor(private prisma:PrismaService){}

    async readProducts(){
        try{
            return await this.prisma.produtos.findMany()
        }
        catch {
            throw new HttpException('Ocorreu um erro ao consultar os produtos', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readProduct(id:number){
        try{
            const produto =  await this.prisma.produtos.findUnique({
                where:{
                    cod:id
                }
            })
            if(produto){
                return produto;
            }
            else{
                throw new HttpException('O produto não foi encontrado', HttpStatus.NOT_FOUND)
            }
        } 
        catch(error) {
            if(error instanceof HttpException){throw error}
            throw new HttpException('Ocorreu um erro ao consultar o produto', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createProduct(produto: CreateProductDto){
        try{
            return await this.prisma.produtos.create({
                data: produto
            })
        }
        catch(error){
            throw new HttpException('Ocorreu um erro ao cadastrar o produto', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}