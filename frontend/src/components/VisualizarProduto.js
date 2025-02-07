import { useEffect, useState } from "react"
import Button from "./Button"
import axios from "axios"
import GerenciamentoProduto from './GerenciamentoProduto'
import {useNavigate, useParams} from 'react-router-dom'

function VisualizarProduto() {
    const params = useParams()
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [preco, setPreco] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [erro, setErro] = useState(null)
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:3344/produtos/${params.id}`).then((resposta) => {
            setNome(resposta.data.nome)
            setMarca(resposta.data.marca)
            setPreco(resposta.data.preco)
            setQuantidade(resposta.data.quantidade)
            setFornecedor(resposta.data.fornecedor)

         }).catch((erro) => {
            if(erro.response){
                setErro(erro.response.data.message)
            }
            else{
                setErro("Não foi possivel se conectar com o servidor")
            }
         })
    }, [params.id])

    const voltar = () => {
        navigate('/produtos')
    }

    return (
        erro ? (<div class="container alert alert-danger text-center mt-5" role="alert">
            {erro}
          </div>) : (
        <GerenciamentoProduto visualizacao={true} botoes={[
            <Button cor="#6F917F" texto="Voltar" handleClick={voltar} corTexto="#FFFFFF" largura='100%'/>,
        ]} titulo="Produtos" estados={{nome, marca, preco, quantidade, fornecedor}} 
        setEstados={{setNome, setMarca, setPreco, setFornecedor, setQuantidade}}
        subtitulo="Visualizar Produto" />
        )        
    )
}

export default VisualizarProduto