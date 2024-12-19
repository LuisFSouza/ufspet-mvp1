import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    marca: string

    @IsString()
    @IsOptional()
    fornecedor: string

    @IsNumber()
    @IsNotEmpty()
    preco: number
    
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    quantidade: number
}