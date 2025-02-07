import { useEffect, useState } from "react"
import Button from "./Button"
import axios from "axios"
import {useNavigate, useParams} from 'react-router-dom'
import dayjs from 'dayjs'
import GerenciamentoCompraAgendamento from "./GerenciamentoCompraAgendamento"
function VisualizarCompraAgendamento() {
    const params = useParams()
    const navigate = useNavigate()
    const [cliente, setCliente] = useState('')
    const [servico, setServico] = useState('')
    const [data, setData] = useState('')
    const [formaPgto, setFormaPgto] = useState('')
    const [status, setStatus] = useState('')
    const [total, setTotal] = useState('')
    const [erro, setErro] = useState(null)
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:3344/agendamentos/${params.id}`).then((resposta) => {
            setCliente(`${resposta.data.cliente_id} - ${resposta.data.cliente.nome}`)
            setServico(`${resposta.data.servico_id} - ${resposta.data.servico.nome}`)
            const dataFormatada = dayjs(resposta.data.data).format("YYYY-MM-DDTHH:mm")
            setData(dataFormatada)
            setFormaPgto(resposta.data.formaPgto)
            setStatus(resposta.data.status)
            setTotal(Number(resposta.data.servico.preco).toFixed(2).replace('.', ','))
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

    const voltar = () => {
        navigate(`/clientes/${idcliente}/compras`)
    }

    return (
        erro ? (<div class="container alert alert-danger text-center mt-5" role="alert">
            {erro}
          </div>) : (
        <GerenciamentoCompraAgendamento botoes={[
            <Button cor="#6F917F" texto="Voltar" handleClick={voltar} corTexto="#FFFFFF" largura='100%'/>,
        ]} titulo="Compras realizadas" estados={{cliente, servico, data, formaPgto, status, total}} 
        subtitulo="Visualizar Compra"/>)
    )
}

export default VisualizarCompraAgendamento