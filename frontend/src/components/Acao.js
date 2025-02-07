import './Acao.css'

import React from 'react'
import Cabecalho from './Cabecalho';


//placeholder, titulo, tipo, id, largura, dadosSelect

function Acao({titulo, subtitulo, campos, botoes, considerView=false}) {
    return(
        <div className="container mt-4">

            <div className="card rounded-4 overflow-hidden bg-transparent">

                <Cabecalho titulo={titulo} subtitulo={subtitulo} classN="card-header" />
                

                <div className="card-body">
                    <div class="row">
                        <div class="col-5">
                            <form>
                                {campos.map((campo, index) => {
                                    return (<div className='mt-2 row'>
                                        {campo.buttonSupport
                                        ? 
                                        (<div class="col-12 ">
                                        {campo.component}
                                        </div>)
                                        :
                                        (<div class="col-9 mb-2">
                                            {campo.component}
                                        </div>)
                                        }
                                    </div>)
                                        
})}
                                
                                <div className="col-9 d-flex flex-row gap-5 mt-3 justify-content-between">
                                    {botoes}
                                </div>
                            </form>
                        </div>
                    </div>
                

                        


                </div>
                
                
            </div> 
            
        </div>
    )

}


export default Acao;