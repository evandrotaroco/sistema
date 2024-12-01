import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarCliente, deletarCliente, gravarCliente, alterarCliente } from "../servicos/servicoCliente";

import ESTADO from "./estados";

export const buscarClientes = createAsyncThunk('buscarClientes', async () => {
    try {
        const resultado = await consultarCliente();
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Clientes recuperados com sucesso",
                "listaClientes": resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os clientes do backend.",
                "listaClientes": []
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
            "listaClientes": []
        }
    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async (cliente) => {
    try {
        const resultado = await deletarCliente(cliente);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo": cliente.codigo
        };
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message,
        }
    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async (cliente) => {

    try {
        const resultado = await gravarCliente(cliente);
        if (resultado.status) {
            cliente.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                "cliente": cliente
            }
        }
        else {
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
            }
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try {
        const resultado = await alterarCliente(cliente);
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "cliente": cliente
        }
    }
    catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro: " + erro.message
        }
    }
});

const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaClientes: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // *** BUSCAR ClienteS ***

            .addCase(buscarClientes.pending, (state) => {
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição... (buscando)"
            })
            .addCase(buscarClientes.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = action.payload.listaClientes;
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = action.payload.listaClientes;
                }
            })
            .addCase(buscarClientes.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.listaClientes = action.payload.listaClientes;
            })

            // *** APAGAR ClienteS ***

            .addCase(apagarCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (exclusão)";
            })
            .addCase(apagarCliente.fulfilled, (state, action) => {
                state.mensagem = action.payload.mensagem;
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.listaClientes = state.listaClientes.filter((item) => item.codigo !== action.payload.codigo);
                }
                else {
                    state.estado = ESTADO.ERRO;
                }
            })
            .addCase(apagarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** INCLUIR ClienteS ***

            .addCase(incluirCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (incluindo)";
            })
            .addCase(incluirCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes.push(action.payload.cliente);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(incluirCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })

            // *** ATUALIZAR ClienteS ***

            .addCase(atualizarCliente.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição... (atualizando)";
            })
            .addCase(atualizarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = state.listaClientes.map((item) => item.codigo === action.payload.cliente.codigo ? action.payload.cliente : item);
                }
                else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default clienteReducer.reducer;