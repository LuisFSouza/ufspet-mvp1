import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServiceDto } from 'src/dto/createServiceDto';

@Controller('servicos')
export class ServicosController { 
    constructor(private readonly servicoService: ServicosService){}

    @Get()
    async list(){
        const servicos = await this.servicoService.readServices()
        return servicos;
    }
    
    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id:number){
        const servico = await this.servicoService.readService(id)
        return servico
    }  

    @Post('criar')
    async create(@Body() body: CreateServiceDto){
        return await this.servicoService.createService(body)
    }  
}
