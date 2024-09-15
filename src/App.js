import Pagina from "./componentes/layouts/Pagina";
import TelaCadastroCliente from "./componentes/Telas/Forms/TelaCadastroCliente";
import TelaCadastroFornecedor from "./componentes/Telas/Forms/TelaCadastroFornecedor";
import TelaCadastroProduto from "./componentes/Telas/Forms/TelaCadastroProduto";
import TelaCadastroCategoria from "./componentes/Telas/Forms/TelaCadastroCategoria"

function App() {
  return (
    <div className="App">
      <Pagina>
        <TelaCadastroCliente/>
      </Pagina>

      <Pagina>
        <TelaCadastroFornecedor/>
      </Pagina>

      <Pagina>
        <TelaCadastroProduto/>
      </Pagina>

      <Pagina>
        <TelaCadastroCategoria/>
      </Pagina>
    </div>
  );
}

export default App;
