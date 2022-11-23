import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components/index";
import { API_URL } from "../utils/Constants";
import swal from "sweetalert";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }
  //api product
  getDataProduct(category) {
    axios
      .get(API_URL + `/products?category.nama=${category}`)
      .then((res) => {
        this.setState({
          menus: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  //get data yang pertama dilakukan
  componentDidMount() {
    this.getDataProduct(this.state.categoriYangDipilih);
    this.getDataKerangjang();
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState) {
  //     this.getDataKerangjang();
  //   }
  // }

  getDataKerangjang = () => {
    axios
      .get(API_URL + "/keranjangs")
      .then((res) => {
        this.setState({
          keranjangs: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //rubah category yang akan berefek ke paramter API GET produk
  changeCategory = (newCategory) => {
    // console.log(newCategory);
    this.setState(
      {
        categoriYangDipilih: newCategory,
      },
      () => {
        this.getDataProduct(newCategory);
      }
    );
  };

  //masukan ke keranjang
  masukKeranjang = (value) => {
    //cek dahulu data di keranjang
    axios.get(API_URL + "/keranjangs?product.id=" + value.id).then((res) => {
      //jika belum ada insert
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };
        axios.post(API_URL + "/keranjangs", keranjang).then((res) => {
          this.getDataKerangjang();
          swal({
            title: "Pesanan Berhasil Disimpan",
            text: value.nama,
            icon: "success",
            button: false,
            timer: 1000,
          });
        });
      }
      //jika sudah ada udpate
      else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };

        axios
          .put(API_URL + "/keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            this.getDataKerangjang();
            swal({
              title: "Pesanan Berhasil Di update",
              text: value.nama,
              icon: "success",
              button: false,
              timer: 1000,
            });
          });
      }
    });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="App">
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col className="mt-2">
                <h5>
                  <strong>Daftar Produk</strong>
                  <hr />
                  <Row className="overflow-auto ">
                    {menus &&
                      menus.map((menu) => (
                        <Menus
                          key={menu.id}
                          menu={menu}
                          masukKeranjang={this.masukKeranjang}
                        ></Menus>
                      ))}
                  </Row>
                </h5>
              </Col>
              <Hasil
                keranjangs={keranjangs}
                getDataKerangjang={this.getDataKerangjang}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
