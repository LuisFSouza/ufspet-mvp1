import './Acao.css'

import React from 'react'
import Cabecalho from './Cabecalho';


//placeholder, titulo, tipo, id, largura, dadosSelect

function Acao({titulo, subtitulo, campos, botoes}) {
    return(
        <div className="container mt-4">

            <div className="card rounded-4 overflow-hidden bg-transparent">

                <Cabecalho titulo={titulo} subtitulo={subtitulo} classN="card-header" />
                

                <div className="card-body">
                    <div class="row">
                        <div class="col-4">
                            <form>
                                {campos.map((campo, index) => (
                                    <div className='mt-2'><React.Fragment key={index}>{campo}</React.Fragment></div>
                                ))}
                                
                                <div className="d-flex flex-row gap-5 mt-4 justify-content-between">
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