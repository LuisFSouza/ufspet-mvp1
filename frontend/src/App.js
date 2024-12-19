import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./components/NavBar"
import Produtos from './components/Produtos.js';
import NovoProduto from './components/NovoProduto.js';
import VisualizarProduto from './components/VisualizarProduto.js';
import Servicos from './components/Servicos.js'
import VisualizarServico from './components/VisualizarServico.js';
import NovoServico from './components/NovoServico.js';
import Clientes from './components/Clientes.js'
import VisualizarCliente from './components/VisualizarCliente.js';
import NovoCliente from './components/NovoCliente.js';



function App() {
  return(
    <Router>
      <NavBar/>
      
      <Routes>
        <Route path='/clientes' element={<Clientes/>}></Route>
        <Route path='/clientes/novo' element={<NovoCliente />}></Route>
        <Route path='/clientes/:id' element={<VisualizarCliente />}></Route>
        <Route path='/produtos' element={<Produtos />}></Route>
        <Route path='/produtos/novo' element={<NovoProduto/>}></Route>
        <Route path='/produtos/:id' element={<VisualizarProduto/>}></Route>
        <Route path='/servicos' element={<Servicos />}></Route>
        <Route path='/servicos/novo' element={<NovoServico/>}></Route>
        <Route path='/servicos/:id' element={<VisualizarServico/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
