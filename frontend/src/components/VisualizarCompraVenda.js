import { useEffect, useState } from "react"
import Button from "./Button"
import axios from "axios"
import {useNavigate, useParams} from 'react-router-dom'
import dayjs from 'dayjs'
import GerenciamentoCompraVenda from "./GerenciamentoCompraVenda"

function VisualizarCompraVenda() {
    const params = useParams()
    const navigate = useNavigate()
    const [cliente, setCliente] = useState(null)
    const [data, setData] = useState(null)
    const [formaPgto, setFormaPgto] = useState(null)
    const [itensVenda, setItensVenda] = useState([])
    const [totalVenda, setTotalVenda] = useState(null)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:3344/vendas/${params.id}`).then((resposta) => {
            console.log(resposta.data)
            setCliente(`${resposta.data.cliente.cod} - ${resposta.data.cliente.nome}`)
            const dataFormatada = dayjs(resposta.data.data).format("YYYY-MM-DDTHH:mm")
            setData(dataFormatada)
            setFormaPgto(resposta.data.formaPgto)
            setItensVenda((resposta.data.itens).map(({produto,quantidade})=> ({produto_id:`${produto.cod} - ${produto.nome}`, quantidade})) )
            setTotalVenda((resposta.data.totalVenda).toFixed(2).replace('.', ','))
        }).catch((erro) => {
            if(erro.response){
                setErro(erro.response.data.message)
            }
            else{
                setErro("Não foi possivel se conectar com o servidor")
            }
         })
    }, [params.id])

    const {idcliente} = useParams()
    const teste = useParams()
    const voltar = () => {
        navigate(`/clientes/${idcliente}/compras`)
    }

    return (
        erro ? (<div class="container alert alert-danger text-center mt-5" role="alert">
            {erro}
          </div>) : (
             <GerenciamentoCompraVenda botoes={[
                <Button cor="#6F917F" texto="Voltar" handleClick={voltar} corTexto="#FFFFFF" largura='100%'/>
            ]} titulo="Compras realizadas" estados={{cliente, data, formaPgto, itensVenda, totalVenda}}
            subtitulo="Visualizar compra"/>)
    )
}

export default VisualizarCompraVenda