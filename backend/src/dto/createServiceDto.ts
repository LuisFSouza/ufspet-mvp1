import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateServiceDto{
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    duracao: number

    @IsNumber()
    @IsNotEmpty()
    preco: number

    @IsString()
    @IsOptional()
    descricao: string
}