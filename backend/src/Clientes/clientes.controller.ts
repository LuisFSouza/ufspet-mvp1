import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClientDto } from 'src/dto/createClientDto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService){}

    @Get()
    async list(){
        const clientes = await this.clienteService.readClients()
        return clientes;
    }
    
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id:number){
        const cliente = await this.clienteService.readClient(id)
        return cliente;
    }  

    @Post('criar')
    async create(@Body() body: CreateClientDto){
        return await this.clienteService.createClient(body)
    }  
}
