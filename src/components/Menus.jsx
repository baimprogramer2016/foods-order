import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu }) => {
  return (
    <Col md={4} xs={12} className="mb-4">
      <Card className="shadow">
        <Card.Img
          variant="top"
          src={`assets/images/${menu.category.nama.toLowerCase()}/${
            menu.gambar
          }`}
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>
            <strong>Rp. {numberWithCommas(menu.harga)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
