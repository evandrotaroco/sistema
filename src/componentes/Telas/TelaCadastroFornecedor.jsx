import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert } from 'react-bootstrap';

export default function TelaCadastroFornecedor(props){

    return(
        <div>
            <Alert className='text-center' variant="dark">Tela de cadastro de fornecedor</Alert>
            <Form noValidate>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="nomeEmpresa">
            <Form.Label>Nome da empresa</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o nome da empresa"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="cnpj">
            <Form.Label>CNPJ</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o CNPJ da empresa"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o email da empresa"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="endereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" placeholder="Digite o endereço da empresa" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="telefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Digite o telefone da empresa" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid state.
            </Form.Control.Feedback>
            </Form.Group>

        </Row>
        
        <Button type="submit" >Confirmar</Button>
        </Form>
    </div>
    );
}