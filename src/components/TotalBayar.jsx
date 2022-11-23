import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/Constants";
import { useNavigate } from "react-router-dom";

const TotalBayar = (props) => {
  const navigate = useNavigate();

  const submitTotalBayar = (totalBayar) => {
    const pesenan = {
      total_bayar: totalBayar,
      menus: props.keranjangs,
    };

    axios
      .post(API_URL + "/pesanans", pesenan)
      .then((res) => {
        console.log(res);
        navigate("/sukses");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const totalBayar = props.keranjangs.reduce((result, item) => {
    return result + item.total_harga;
  }, 0);

  // const totalBayar = 5000;
  return (
    <>
      {/*web*/}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :
              <strong className="float-right mr-2">
                Rp.{numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={() => submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faUtensils} /> <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
      {/*mobile*/}
      <div className="d-sm-block d-md-none">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Harga :
              <strong className="float-right mr-2">
                Rp.{numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={() => submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faUtensils} /> <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TotalBayar;
