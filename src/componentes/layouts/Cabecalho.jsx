import { Alert } from "react-bootstrap";
export default function Cabecalho(props) {

    //método render
    return (
        <Alert className={"text-center"} variant="info">
            <h2>
                {props.titulo || "Titulo não fornecido"}
            </h2>
        </Alert>
    );
}