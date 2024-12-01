const urlBase = 'https://bcc-backend-lp-2-evandro.vercel.app/fornecedores';

export async function gravarFornecedor(Fornecedor) {
    const resposta = await fetch(urlBase, {
        'method':"POST",
        'headers': {
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(Fornecedor)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarFornecedor(Fornecedor) {
    const resposta = await fetch(urlBase + "/" + Fornecedor.codigo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(Fornecedor)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function deletarFornecedor(Fornecedor) {
    const resposta = await fetch(urlBase + "/" + Fornecedor.codigo, {
        "method": "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;

}

export async function consultarFornecedor() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}   
