import { useEffect, useState } from "react"
import Table from "../components/Table"
import axios from "axios"
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import Button from "./Button";
import {useLocation, useNavigate} from 'react-router-dom'
import './Produtos.css'
import Cabecalho from "./Cabecalho";


function Produtos() {
    const [productSelected, setProductSelected] = useState(-1)
    const [message, setMessage] = useState(null)

    const changeProductSelected = (id) => {
        setProductSelected(id)
    }
    const [dadosProdutos, setDadosProdutos] = useState([])
    const navigate = useNavigate()
    const buttonNovoClick = () => {
        navigate('/produtos/novo')
    }

    const buttonVisualizarClick = () => {
        if(productSelected !== -1){
            navigate(`/produtos/${productSelected}`)
        }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:3344/produtos').then((resposta) => {
            setDadosProdutos(resposta.data)
        }).catch((erro) => {
            if(erro.response){
                setMessage({'tipo':'erro', 'mensagem': erro.response.data.message})
            }
            else{
                setMessage({'tipo':'erro', 'mensagem': "Não foi possivel se conectar com o servidor"})
            }
        })
    }, [])

    const location = useLocation()
    useEffect(() => {
        if(location.state?.mensagem){
            setMessage({tipo: location.state.tipo, mensagem: location.state.mensagem})
            window.history.replaceState({}, document.title)

            const timer = setTimeout(() => {
                setMessage(null)
            }, 10000);
    
            return () => clearTimeout(timer)
        }
    }, [location])

    return (  
        <div className="mt-5 position-relative">
            {message && message.tipo ==='sucesso' ? (<div class="container alert alert-success text-center mt-5" role="alert">
            {message.mensagem}
          </div>) : message && message.tipo==='erro' ? (<div class="container alert alert-danger text-center mt-5" role="alert">
            {message.mensagem}
          </div>): (<></>)}

            <div className="container">
                <div className="d-flex justify-content-between ">
                    <div>
                        <Cabecalho titulo="Produtos" subtitulo="Gerenciamento de produtos" />
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <Button cor="#fe8a5f" texto="Excluir" tipo="button" icone={<IoCloseSharp fontSize={24} color="#ffffff"/>} corTexto="#ffffff" direcao="row" sombra={true}/>
                        <Button cor="#6ab2b7" handleClick={buttonVisualizarClick} texto="Visualizar" tipo="button" icone={<MdOutlineRemoveRedEye fontSize={24} color="#ffffff"/> } corTexto="#ffffff" direcao="row" sombra={true} />
                        <Button cor="#f9b461" texto="Editar" tipo="button" icone={<GoPencil fontSize={24} color="#ffffff"/>} corTexto="#ffffff" direcao="row" sombra={true} />
                        <Button cor="#70917f" handleClick={buttonNovoClick} texto="Novo" tipo="button" icone={<IoIosAdd fontSize={24} color="#ffffff"/>} corTexto="#ffffff" direcao="row" sombra={true} />
                    </div>
                </div>
                <Table linetrade={changeProductSelected} lineSelected={productSelected} cabecalhos={["Produto", "Marca",  "Preço", "Quantidade", "Fornecedor"]} dados={dadosProdutos}/>
            </div>
        </div>  
    )
}

export default Produtos