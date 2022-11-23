import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "../components/ModalKerangjang";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../utils/Constants";

class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }
//yuhu
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };
  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  //keterangan
  changeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      keterangan: event.target.value,
    });
  };

  //simpan perubahan
  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };
    axios
      .put(API_URL + "/keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getDataKerangjang();
        swal({
          title: "Update Pesanan",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
      });

    this.handleClose();
  };

  //simpan perubahan
  hapusPesanan = (id) => {
    axios.delete(API_URL + "/keranjangs/" + id).then((res) => {
      this.props.getDataKerangjang();
      swal({
        title: "Pesnan Dihapus",
        text: "Sukses Hapus " + this.state.keranjangDetail.product.nama,
        icon: "error",
        button: false,
        timer: 1000,
      });
    });

    this.handleClose();
  };

  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} className="mt-2">
        <h5>
          <strong>Keranjang</strong>
        </h5>
        <hr />
        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.length !== 0 &&
              keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h5>
                        <Badge pill bg="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h5>
                    </Col>
                    <Col md={6}>
                      <p>
                        {" "}
                        {menuKeranjang.product.nama}
                        <br />
                        Rp. {numberWithCommas(menuKeranjang.product.harga)}
                      </p>
                    </Col>
                    <Col md={4}>
                      <strong className="float-right">
                        <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

            <ModalKeranjang
              {...this.state}
              handleClose={this.handleClose}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        </Card>

        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}

export default Hasil;
