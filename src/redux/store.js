import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer"
import clienteReducer from "./clienteReducer";
import fornecedorReducer from "./fornecedorReducer";
import usuarioReducer from "./usuarioReducer";

const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer,
        'cliente':clienteReducer,
        'fornecedor':fornecedorReducer,
        'usuario':usuarioReducer
    }
});

export default store;