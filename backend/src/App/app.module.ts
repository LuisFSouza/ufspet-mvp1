import { ServicosModule } from '../Serviço/servicos.module';
import { ClientesModule } from '../Clientes/clientes.module';
import { Module } from '@nestjs/common';
import { ProdutosModule } from '../Produtos/produtos.module';

@Module({
  imports: [ServicosModule, ClientesModule, ProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
