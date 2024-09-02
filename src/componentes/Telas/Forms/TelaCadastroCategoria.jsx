import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert } from 'react-bootstrap';

export default function TelaCadastroProduto(props){

    return(
        <div>
            <Alert className='text-center' variant="dark">Tela de cadastro de categoria</Alert>
            <Form noValidate>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="codigo">
            <Form.Label>Código da categoria</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o código da categoria"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="descricao">
            <Form.Label>Descrição da categoria</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite a descrição da categoria"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        
        <Button type="submit" >Confirmar</Button>
        </Form>
    </div>
    );
}