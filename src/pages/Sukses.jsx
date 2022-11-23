import axios from "axios";
import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/Constants";

class Sukses extends Component {
  componentDidMount() {
    axios.get(API_URL + "/keranjangs").then((res) => {
      res.data.map((value) => {
        return this.deleteKeranjang(value.id);
      });
    });
  }

  deleteKeranjang = async (id) => {
    await axios
      .delete(API_URL + "/keranjangs/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/success.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terima Kasih Sudah Memesan</p>
        <Button variant={"primary"} as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}

export default Sukses;
