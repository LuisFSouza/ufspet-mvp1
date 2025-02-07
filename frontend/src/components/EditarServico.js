import { useEffect, useState } from "react"
import Button from "./Button"
import axios from "axios"
import GerenciamentoServico from './GerenciamentoServico'
import {useNavigate, useParams} from 'react-router-dom'

function EditarServico() {
    const params = useParams()
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [duracao, setDuracao] = useState('')
    const [preco, setPreco] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erro, setErro] = useState(null)
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:3344/servicos/${params.id}`).then((resposta) => {
            setNome(resposta.data.nome)
            setDuracao(resposta.data.duracao)
            setPreco(resposta.data.preco)
            setDescricao(resposta.data.descricao)
         }).catch((erro) => {
            if(erro.response){
                setErro(erro.response.data.message)
            }
            else{
                setErro("Não foi possivel se conectar com o servidor")
            }
         })
    }, [params.id])

    const editar = (event) => {
        event.preventDefault()
        const dados = {
            nome: nome,
            duracao: Number(duracao),
            preco: Number(preco),
        }
        if(descricao !== ""){
            dados.descricao = descricao
        }
        const form = document.getElementsByTagName('form')[0];
        if(form && form.reportValidity()){
            axios.patch(`http://127.0.0.1:3344/servicos/editar/${params.id}`, dados).then((resposta) => {
                navigate('/servicos', {state: {tipo:"sucesso", mensagem: "Serviço editado com sucesso"}})
            }).catch((erro) => {
                if(erro.response){
                    navigate('/servicos', {state: {tipo:"erro", mensagem: erro.response.data.message}})
                }
                else{
                    navigate('/servicos', {state: {tipo:"erro", mensagem: "Não foi possivel se conectar com o servidor"}})
                } 
            })
        }
    }

    const limpar = (event) => {
        event.preventDefault()
        setDescricao("")
        setDuracao("")
        setNome("")
        setPreco("")
    }



    return (
        erro ? (<div class="container alert alert-danger text-center mt-5" role="alert">
            {erro}
          </div>) : (
        <GerenciamentoServico  botoes={[
            <Button cor="#6F917F" texto="Editar" handleClick={editar} corTexto="#FFFFFF" largura='100%'/>,
            <Button cor="#A5A5A5" texto="Limpar" handleClick={limpar} corTexto="#FFFFFF" largura='100%'/>
        ]} titulo="Serviços" estados={{nome, duracao, preco, descricao}} 
        setEstados={{setNome, setDuracao, setPreco, setDescricao}}
        subtitulo="Editar Serviço"/>)
    )
}

export default EditarServico