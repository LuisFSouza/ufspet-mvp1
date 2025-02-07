import {useState } from "react"
import Button from "./Button"
import axios from "axios"
import GerenciamentoProduto from './GerenciamentoProduto'
import {useNavigate} from 'react-router-dom'

function NovoProduto() {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [fornecedor, setFornecedor] = useState('')

    const cadastrar = (event) => {
        event.preventDefault()

        const dados = {
            nome: nome,
            marca: marca,
            preco: Number(preco),
            quantidade: Number(quantidade)
        }
        if(fornecedor !== ""){
            dados.fornecedor = fornecedor
        }

        const form = document.getElementsByTagName('form')[0];
        if(form && form.reportValidity()){
            axios.post('http://127.0.0.1:3344/produtos/criar', dados).then((resposta) => {
                navigate('/produtos', {state: {tipo:"sucesso", mensagem: "Produto cadastrado com sucesso"}})
            }).catch((erro) => {
                if(erro.response){
                    navigate('/produtos', {state: {tipo:"erro", mensagem: erro.response.data.message}})
                }
                else{
                    navigate('/produtos', {state: {tipo:"erro", mensagem:"Não foi possivel se conectar com o servidor"}})
                }
            })
        }
    }

    const limpar = (event) => {
        event.preventDefault()
        setFornecedor("")
        setQuantidade("")
        setMarca("")
        setNome("")
        setPreco("")
    }

    return (
        <GerenciamentoProduto visualizacao={false} botoes={[
            <Button cor="#6F917F" texto="Cadastrar" handleClick={cadastrar} corTexto="#FFFFFF" largura='100%'/>,
            <Button cor="#A5A5A5" texto="Limpar" handleClick={limpar} corTexto="#FFFFFF" largura='100%'/>
        ]} titulo="Produtos" estados={{nome, marca, preco, quantidade, fornecedor}} 
        setEstados={{setNome, setMarca, setPreco, setFornecedor, setQuantidade}}
        subtitulo="Cadastro de Produtos" />
    )
}

export default NovoProduto