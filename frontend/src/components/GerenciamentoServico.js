import TextField from "./TextField"
import Acao from "./Acao"

function GerenciamentoServico({titulo, subtitulo, botoes, estados, setEstados, visualizacao}){
    const {nome, duracao, preco, descricao } = estados
    const {setNome, setDuracao, setPreco, setDescricao} = setEstados
    return (
        <Acao titulo={titulo} subtitulo={subtitulo} botoes={botoes} campos={[
            <TextField visualizacao={visualizacao} setValue={setNome} value={nome} placeholder="Digite o nome do serviço" titulo="Nome do Serviço" tipo="text" id="nomeservico"/>,
            <TextField visualizacao={visualizacao} setValue={setDuracao} value={duracao} placeholder="Digite a duração do serviço" titulo="Duração do Serviço (em m)" tipo="number" id="duracaoservico" step="1"/>,
            <TextField visualizacao={visualizacao} setValue={setPreco} value={preco} placeholder="Digite o preço do serviço" titulo="Preço do Serviço" tipo="number" id="precoservico" step="0.01"/>,
            <TextField visualizacao={visualizacao} setValue={setDescricao} value={descricao} placeholder="Digite a descrição do serviço" titulo="Descrição do Serviço" tipo="text" id="descricaoservico" required={false}/>,
        ]}
    />
    )
}

export default GerenciamentoServico