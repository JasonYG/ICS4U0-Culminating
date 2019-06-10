import React, { Component } from "react";
import { async } from "q";

class Study extends Component {
  componentDidMount() {
    this.callApi();
  }
  callApi = async () => {
    const response = await fetch("/api/test");
    const test = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6aEdOemsyTWpSRU16YzVNVFJDTXpoQk1ESkNRVGxGTUVFeFFrSTFRamxCT1VJM1JqYzVRZyJ9.eyJlbWFpbCI6Imphc29ueXpndW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vaWNzNHUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAxMDE3ODQ3MTcwOTk0NzgyMDUyIiwiYXVkIjoiemZFZVNNbW5mQ3RNS3pRaHpIUVBMbWpCOUdqaWNOQngiLCJpYXQiOjE1NjAxNzQ0NDAsImV4cCI6MTU2MDIxMDQ0MCwiYXRfaGFzaCI6IkJKa2N6Ml9lYnJqcW9fWlBTY3BmWWciLCJub25jZSI6IlVRdXZ5dVpGQVU2UWpNVFQ2Qll6UUJCa3g0ZS1WekZvIn0.i74wZs5TC-M6X_wWPK2BLAFXwr6NcCP-CnkOVEqev4pyFDd4Mz9t6yg1dUlFb653JqrrcoxCNGEwni2iNGaY7CCe_Oa9HTnY0lyMLKIdCTtxX9XOwzRtdBOCIU1ZT2ppw19TClDaJxqfk10CLZa8KoTMa-JTNBewlVVium3RQfyIZMu4WgSbemRfBcafMD3Hba5bcTRuGSPteueU9q7SZq1QfRdq8pKtcBCk7yFdRTtiVBaxfQMNUoHHPkozwYOd3ERbdr9DK7jfqIRFjTFziMnNqe6M_Tzq8nu3SMDJMGT3NI_7hu8abJQt4PQhFdv0MpcbI4-rvbYJqpOkszNptw"
      })
    });

    const body = await test.json();
    console.log(body);
  };
  render() {
    return (
      <React.Fragment>
        <h1 className="title">Future of the study page.</h1>
        <h2 className="subtitle">
          The Kool Kids Klub The Kool Kids Klub The Kool Kids Klub Klub The Kool
          Kids Klub The Kool Kids Klub
        </h2>
      </React.Fragment>
    );
  }
}

export default Study;
