const urlBase = 'https://bcc-backend-lp-2-evandro.vercel.app/clientes';

export async function gravarCliente(Cliente) {
    const resposta = await fetch(urlBase, {
        'method':"POST",
        'headers': {
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(Cliente)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarCliente(Cliente) {
    const resposta = await fetch(urlBase + "/" + Cliente.codigo, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(Cliente)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function deletarCliente(Cliente) {
    const resposta = await fetch(urlBase + "/" + Cliente.codigo, {
        "method": "DELETE",
    });
    const resultado = await resposta.json();
    return resultado;

}

export async function consultarCliente() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}   
