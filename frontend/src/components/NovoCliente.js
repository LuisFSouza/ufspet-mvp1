import Button from "./Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import GerenciamentoCliente from "./GerenciamentoCliente"

function NovoCliente(){
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')

    const cadastrar = (event) => {
        event.preventDefault()
        const dados = {
            nome: nome,
            cpf: cpf.replaceAll('-' , '').replaceAll('.', ''),
            telefone: telefone.replaceAll('(' , '').replaceAll(')', '').replaceAll('-', ''),
            endereco: endereco
        }
        if(email !== ""){
            dados.email = email
        }

        const form = document.getElementsByTagName('form')[0];
        if(form && form.reportValidity()){
            axios.post('http://127.0.0.1:3344/clientes/criar', dados
            ).then((resposta) => {
                navigate('/clientes', {state: {tipo:"sucesso", mensagem: "Cliente cadastrado com sucesso"}})
            }).catch((erro) => {
                if(erro.response){
                    navigate('/clientes', {state: {tipo:"erro", mensagem: erro.response.data.message}})
                }
                else{
                    navigate('/clientes', {state: {tipo:"erro", mensagem:"Não foi possivel se conectar com o servidor"}})
                }
            })
        }
    }

    const limpar = () => {
        setNome("")
        setCpf("")
        setEmail("")
        setTelefone("")
        setEndereco("")
    }

    return (
        <GerenciamentoCliente visualizacao={false} botoes={[
            <Button cor="#6F917F" texto="Cadastrar" handleClick={cadastrar} corTexto="#FFFFFF" largura='100%'/>,
            <Button tipo="reset" cor="#A5A5A5" texto="Limpar" handleClick={limpar} corTexto="#FFFFFF" largura='100%'/>
        ]} titulo="Clientes" estados={{nome, cpf, email, telefone, endereco}} 
        setEstados={{setNome, setCpf, setEmail, setTelefone, setEndereco}}
        subtitulo="Cadastro de Clientes" />
    )
}

export default NovoCliente