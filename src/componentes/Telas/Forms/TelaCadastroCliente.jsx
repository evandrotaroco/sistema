import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function TelaCadastroCliente(props){

    return(
        <div>
            <Alert className='text-center' variant="dark">Tela de cadastro de cliente</Alert>
            <Form noValidate>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite seu nome"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite seu CPF"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite seu email"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

        </Row>
        <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="endereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" placeholder="Digite seu endereço" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="telefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Digite seu telefone" required />
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