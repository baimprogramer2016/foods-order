import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  Hasil,
  ListCategories,
  NavbarComponent,
  Menus,
} from "./components/index";
import { API_URL } from "./utils/Constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
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
  }

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

  render() {
    const { menus } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={this.state.categoriYangDipilih}
              />
              <Col>
                <h5>
                  <strong>Daftar Produk</strong>
                  <hr />
                  <Row>
                    {menus &&
                      menus.map((menu) => (
                        <Menus key={menu.id} menu={menu}></Menus>
                      ))}
                  </Row>
                </h5>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
