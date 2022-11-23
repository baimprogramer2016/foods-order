import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" onClick={() => masukKeranjang(menu)}>
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
