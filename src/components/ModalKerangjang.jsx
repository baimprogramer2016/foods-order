import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ModalKerangjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  handleSubmit,
  changeHandler,
  totalHarga,
  hapusPesanan,
}) => {
  if (keranjangDetail) {
    return (
      <div>
        {" "}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {keranjangDetail.product.nama}{" "}
              <strong>
                (Rp. {numberWithCommas(keranjangDetail.product.harga)})
              </strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Total Harga :</Form.Label>
                <strong>
                  <p> (Rp. {numberWithCommas(totalHarga)})</p>{" "}
                </strong>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Jumlah :</Form.Label>
                <br />
                <div
                  className="btn btn-primary text-white  me-3"
                  size="sm"
                  onClick={() => kurang()}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </div>
                <strong className="me-3">{jumlah}</strong>

                <div
                  className="btn btn-primary text-white me-3"
                  size="sm"
                  onClick={() => tambah()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Keterangan : </Form.Label>
                <Form.Control
                  as="textarea"
                  name="keterangan"
                  rows={3}
                  placeholder="Contoh : Pedas"
                  value={keterangan}
                  onChange={(event) => changeHandler(event)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => hapusPesanan(keranjangDetail.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>''</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default ModalKerangjang;
