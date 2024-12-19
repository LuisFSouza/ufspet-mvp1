import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { CreateProductDto } from "src/dto/createProductDto";

@Controller('produtos')
export class ProdutosController{
    constructor(private readonly produtoService: ProdutosService){}

    @Get()
    async list(){
        const produtos = await this.produtoService.readProducts()
        return produtos;
    }   

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id:number){
        const produto = await this.produtoService.readProduct(id)
        return produto
    }  

    @Post('criar')
    async create(@Body() body: CreateProductDto){
        return await this.produtoService.createProduct(body)
    }  
}