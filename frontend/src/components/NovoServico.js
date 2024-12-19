import { useState } from "react"
import Button from "./Button"
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import GerenciamentoServico from "./GerenciamentoServico"

function NovoServico() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [duracao, setDuracao] = useState('')
    const [preco, setPreco] = useState('')
    const [descricao, setDescricao] = useState('')

    const cadastrar = (event) => {
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
            axios.post('http://127.0.0.1:3344/servicos/criar', dados).then((resposta) => {
                navigate('/servicos', {state: {tipo:"sucesso", mensagem: "Serviço cadastrado com sucesso"}})
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

    const limpar = () => {
        setDescricao("")
        setDuracao("")
        setNome("")
        setPreco("")
    }

    return (
        <GerenciamentoServico visualizacao={false} botoes={[
            <Button cor="#6F917F" texto="Cadastrar" handleClick={cadastrar} corTexto="#FFFFFF" largura='100%'/>,
            <Button tipo="reset" cor="#A5A5A5" texto="Limpar" handleClick={limpar} corTexto="#FFFFFF" largura='100%'/>
        ]} titulo="Produtos" estados={{nome, duracao, preco, descricao}} 
        setEstados={{setNome, setDuracao, setPreco, setDescricao}}
        subtitulo="Cadastro de Serviços" />
    )
}

export default NovoServico