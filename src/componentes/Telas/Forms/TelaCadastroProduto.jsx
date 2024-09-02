import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Alert } from 'react-bootstrap';

export default function TelaCadastroProduto(props){

    return(
        <div>
            <Alert className='text-center' variant="dark">Tela de cadastro de produto</Alert>
            <Form noValidate>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="codigo">
            <Form.Label>Código do produto</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o código do produto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="descricao">
            <Form.Label>Descrição do produto</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite a descrição do produto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Row>

        <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="precoCusto">
            <Form.Label>Preço de custo</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Digite o preço de custo"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

        
        
            <Form.Group as={Col} md="3" controlId="precoVenda">
            <Form.Label>Preço de venda</Form.Label>
            <Form.Control type="text" placeholder="Digite o preço de venda" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="qtdEstoque">
            <Form.Label>Estoque</Form.Label>
            <Form.Control type="text" placeholder="Digite o estoque do produto" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid state.
            </Form.Control.Feedback>
            </Form.Group>

        </Row>

        <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="urlImagem">
            <Form.Label>URL da imagem</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Coloque o URL"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="2" controlId="dataValidade">
            <Form.Label>Data de validade</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Data"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
        </Row>
        
        <Button type="submit" >Confirmar</Button>
        </Form>
    </div>
    );
}