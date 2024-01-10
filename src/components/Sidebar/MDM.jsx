import React from "react";
import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import userService from "../../Service/UserService";

import enterIcon from "../../images/enter.png";
import suggestionIcon from "../../images/suggestion.png";
import approveIcon from "../../images/check.png";
import rejectIcon from "../../images/cross.png";
import editIcon from "../../images/edit.png";

import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../Styles/tableArea.css";
// import { response } from "express";

function MDM() {
  const headerHeight = 30;
  const rowHeight = 30;
  const [inputTableRowData, setInputTableRowData] = useState([]);
  const [suggestionTableRowData, setSuggestionTableRowData] = useState([]);
  const [inputTableRows, setInputTableRows] = useState([]);
  const [suggestionTableRows, setSuggestionTableRows] = useState([]);
  const [show, setShow] = useState(false);
  const [rejectShow, setRejectShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [showDataLoader, setShowDataLoader] = useState(true);

  const [isReqInProgressAppr, setIsReqInProgressAppr] = useState(false);
  const [isReqInProgressRej, setIsReqInProgressRej] = useState(false);
  const [isReqInProgressEdit, setIsReqInProgressEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRejectClose = () => setRejectShow(false);
  const handleRejectShow = () => setRejectShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
  
  const [gridApi, setGridApi] = useState();

  const notify = () => toast("Wow so easy!");

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  const fetchInputData = async () => {
    try {
      userService.getInputData().then((response) => {
        console.log("response", response);
        setInputTableRowData(response.data);
        setShowDataLoader(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInputData();
  }, []);

  const [colDefs, setColDefs] = useState([
    // { headerName: "Company Code", field: "COMPANY_CODE" },
    { headerName: "Source System", field: "SOURCE_SYSTEM" },
    { headerName: "Company Name", field: "COMPANY_NAME" },
    { headerName: "Distributor Code", field: "DISTRIBUTOR_CODE" },
    { headerName: "Pack", field: "PACK", width: "110px" },
    // { headerName: "Product Code", field: "PRODUCT_CODE" },
    { headerName: "Product Name", field: "PRODUCT_NAME" },
    { headerName: "PTR", field: "PTR" },
    // { headerName: "Match_Perc" , field: "MATCH_PERC" },
    // { headerName: "MDM Distributor" , field: "MDM_DISTRIBUTOR" },
    // { headerName: "MDM Product_Code" , field: "MDM_PRODUCT_CODE" },
    // { headerName: "MDM PTR" , field: "MDM_PTR" },
    // { headerName: "PK" , field: "PK" },
    // { headerName: "Regex" , field: "REGEX" },
  ]);

  const onRowClicked = (event) => {
    console.log("Row clicked:", event.data);
    sessionStorage.clear();
    sessionStorage.setItem("sourceSystem", event.data.SOURCE_SYSTEM);
    sessionStorage.setItem("distributorCode", event.data.DISTRIBUTOR_CODE);
    sessionStorage.setItem("productCode", event.data.PRODUCT_CODE);
    sessionStorage.setItem("productName", event.data.PRODUCT_NAME);
    sessionStorage.setItem("pack", event.data.PACK);
    sessionStorage.setItem("companyCode", event.data.COMPANY_CODE);
    sessionStorage.setItem("companyName", event.data.COMPANY_NAME);
    sessionStorage.setItem("ptr", event.data.PTR);
    sessionStorage.setItem("pk", event.data.PK);
    userService.getSuggestionData(event.data).then((response) => {
      console.log("suggestion data", response.data);
      setSuggestionTableRowData(response.data);
    });
  };
  // console.log(inputTableRows);

  const onInsertButtonClick = (params) => {
    handleShow();
    sessionStorage.removeItem("mdmDistributor");
    sessionStorage.removeItem("mdmProductCode");
    sessionStorage.removeItem("mdmProductName");
    sessionStorage.removeItem("mdmPtr");
    sessionStorage.removeItem("matchPerc");
    sessionStorage.removeItem("regex");

    sessionStorage.setItem("mdmDistributor", params.data.MDM_DISTRIBUTOR);
    sessionStorage.setItem("mdmProductCode", params.data.MDM_PRODUCT_CODE);
    sessionStorage.setItem("mdmProductName", params.data.MDM_PRODUCT_NAME);
    sessionStorage.setItem("mdmPtr", params.data.MDM_PTR);
    sessionStorage.setItem("matchPerc", params.data.MATCH_PERC);
    sessionStorage.setItem("regex", params.data.REGEX);
    // Access the row data using params.data
    console.log("Insert button clicked for row:", params.data);
    console.log(
      "from insert button: ",
      sessionStorage.getItem("distributorCode")
    );
    // Implement your insert logic here
  };
  
  const insertIntoTable = () => {
    setIsReqInProgressAppr(true);
    let sourceSystem = sessionStorage.getItem("sourceSystem");
    let distributorCode = sessionStorage.getItem("distributorCode");
    let productCode = sessionStorage.getItem("productCode");
    let productName = sessionStorage.getItem("productName");
    let pack = sessionStorage.getItem("pack");
    let companyCode = sessionStorage.getItem("companyCode");
    let companyName = sessionStorage.getItem("companyName");
    let ptr = sessionStorage.getItem("ptr");
    let pk = sessionStorage.getItem("pk");
    let mdmDistributor = sessionStorage.getItem("mdmDistributor");
    let mdmProductCode = sessionStorage.getItem("mdmProductCode");
    let mdmProductName = sessionStorage.getItem("mdmProductName");
    let mdmPtr = sessionStorage.getItem("mdmPtr");
    let matchPerc = sessionStorage.getItem("matchPerc");
    let regex = sessionStorage.getItem("regex");
    userService
      .insertIntoTable(
        sourceSystem,
        distributorCode,
        productCode,
        productName,
        pack,
        companyCode,
        companyName,
        ptr,
        pk,
        mdmDistributor,
        mdmProductCode,
        mdmProductName,
        mdmPtr,
        matchPerc,
        regex
      )
      .then((response) => {
        console.log("response insert", response.data.status);
        handleClose();
        const notify = () => toast.success("Record inserted successfully.");
        fetchInputData();
        notify();
      })
      .finally(() => {
        // Set isRequestInProgress to false when the request completes (either success or error)
        setIsReqInProgressAppr(false);
      });
  };

  const onRejectButtonClick = (params) => {
    handleRejectShow();
    sessionStorage.removeItem("mdmDistributor");
    sessionStorage.removeItem("mdmProductCode");
    sessionStorage.removeItem("mdmProductName");
    sessionStorage.removeItem("mdmPtr");
    sessionStorage.removeItem("matchPerc");
    sessionStorage.removeItem("regex");

    sessionStorage.setItem("mdmDistributor", params.data.MDM_DISTRIBUTOR);
    sessionStorage.setItem("mdmProductCode", params.data.MDM_PRODUCT_CODE);
    sessionStorage.setItem("mdmProductName", params.data.MDM_PRODUCT_NAME);
    sessionStorage.setItem("mdmPtr", params.data.MDM_PTR);
    sessionStorage.setItem("matchPerc", params.data.MATCH_PERC);
    sessionStorage.setItem("regex", params.data.REGEX);
    // Access the row data using params.data
    console.log("Reject button clicked for row:", params.data);
    console.log(
      "from Reject button: ",
      sessionStorage.getItem("distributorCode")
    );
    // Implement your insert logic here
  };

  const insertIntoRejectTable = () => {
    setIsReqInProgressRej(true);
    let sourceSystem = sessionStorage.getItem("sourceSystem");
    let distributorCode = sessionStorage.getItem("distributorCode");
    let productCode = sessionStorage.getItem("productCode");
    let productName = sessionStorage.getItem("productName");
    let pack = sessionStorage.getItem("pack");
    let companyCode = sessionStorage.getItem("companyCode");
    let companyName = sessionStorage.getItem("companyName");
    let ptr = sessionStorage.getItem("ptr");
    let pk = sessionStorage.getItem("pk");
    let mdmDistributor = sessionStorage.getItem("mdmDistributor");
    let mdmProductCode = sessionStorage.getItem("mdmProductCode");
    let mdmProductName = sessionStorage.getItem("mdmProductName");
    let mdmPtr = sessionStorage.getItem("mdmPtr");
    let matchPerc = sessionStorage.getItem("matchPerc");
    let regex = sessionStorage.getItem("regex");
    userService
      .insertIntoRejectTable(
        sourceSystem,
        distributorCode,
        productCode,
        productName,
        pack,
        companyCode,
        companyName,
        ptr,
        pk,
        mdmDistributor,
        mdmProductCode,
        mdmProductName,
        mdmPtr,
        matchPerc,
        regex
      )
      .then((response) => {
        console.log("response insert", response.data.status);
        handleRejectClose();
        const notify = () => toast.success("Record rejected.");
        fetchInputData();
        notify();
      })
      .finally(() => {
        // Set isRequestInProgress to false when the request completes (either success or error)
        setIsReqInProgressRej(false);
      });
  };

  const handleTextFieldChange = (e) => {
    setTextFieldValue(e.target.value);
  };

  const editConfirmClick = () => {
    // alert (textFieldValue)
    setIsReqInProgressEdit(true);
    let sourceSystem = sessionStorage.getItem("sourceSystem");
    let distributorCode = sessionStorage.getItem("distributorCode");
    let productCode = sessionStorage.getItem("productCode");
    let productName = sessionStorage.getItem("productName");
    let pack = sessionStorage.getItem("pack");
    let companyCode = sessionStorage.getItem("companyCode");
    let companyName = sessionStorage.getItem("companyName");
    let ptr = sessionStorage.getItem("ptr");
    let pk = sessionStorage.getItem("pk");
    let mdmDistributor = sessionStorage.getItem("mdmDistributor");
    let mdmProductCode = textFieldValue;
    let mdmProductName = sessionStorage.getItem("mdmProductName");
    let mdmPtr = sessionStorage.getItem("mdmPtr");
    let matchPerc = sessionStorage.getItem("matchPerc");
    let regex = sessionStorage.getItem("regex");
    userService
      .insertIntoTable(
        sourceSystem,
        distributorCode,
        productCode,
        productName,
        pack,
        companyCode,
        companyName,
        ptr,
        pk,
        mdmDistributor,
        mdmProductCode,
        mdmProductName,
        mdmPtr,
        matchPerc,
        regex
      )
      .then((response) => {
        console.log("response insert", response.data.status);
        handleEditClose();
        const notify = () => toast.success("Record edited successfully.");
        fetchInputData();
        notify();
      })
      .finally(() => {
        // Set isRequestInProgress to false when the request completes (either success or error)
        setIsReqInProgressEdit(false);
      });
  };

  const onEditButtonClick = (params) => {
    handleEditShow();
    sessionStorage.removeItem("mdmDistributor");
    sessionStorage.removeItem("mdmProductCode");
    sessionStorage.removeItem("mdmProductName");
    sessionStorage.removeItem("mdmPtr");
    sessionStorage.removeItem("matchPerc");
    sessionStorage.removeItem("regex");

    sessionStorage.setItem("mdmDistributor", params.data.MDM_DISTRIBUTOR);
    sessionStorage.setItem("mdmProductCode", params.data.MDM_PRODUCT_CODE);
    sessionStorage.setItem("mdmProductName", params.data.MDM_PRODUCT_NAME);
    sessionStorage.setItem("mdmPtr", params.data.MDM_PTR);
    sessionStorage.setItem("matchPerc", params.data.MATCH_PERC);
    sessionStorage.setItem("regex", params.data.REGEX);
    // Access the row data using params.data
    console.log("Reject button clicked for row:", params.data);
    console.log(
      "from Reject button: ",
      sessionStorage.getItem("distributorCode")
    );
    // Implement your insert logic here
  };

  const gridOptions = {
    domLayout: "autoHeight", // or 'autoHeight'
  };


  const [suggesTablecolDefs, setSuggesTablecolDefs] = useState([
     // { headerName: "MDM Distributor" , field: "MDM_DISTRIBUTOR" },
    // { headerName: "MDM Distributor" , field: "MDM_DISTRIBUTOR" },
    { headerName: "MDM Product Name" , field: "MDM_PRODUCT_NAME" },
    { headerName: "MDM Product Code", field: "MDM_PRODUCT_CODE" },
    { headerName: "MDM Company Name", field: "MDM_COMPANY_NAME" },
    { headerName: "MDM PTR", field: "MDM_PTR" },
    { headerName: "Match Perc", field: "MATCH_PERC" },
    {
      headerName: "Action",
      cellRenderer: (params) => (
        <>
          <Button
            variant="success"
            className="p-0 buttonStyle approveBtn"
            onClick={() => onInsertButtonClick(params)}
          >
            <img src = {approveIcon} className="buttonIconStyle"></img>
            {/* Insert */}
          </Button>
          <Button
            variant="danger"
            className="p-0 buttonStyle rejectBtn"
            onClick={() => onRejectButtonClick(params)}
          >
            <img src = {rejectIcon} className="buttonIconStyle"></img>
            {/* Reject */}
          </Button>
          <Button
            variant="primary"
            className="p-0 buttonStyle editBtn"
            onClick={() => onEditButtonClick(params)}
          >
            <img src = {editIcon} className="buttonIconStyle"></img>
            {/* Edit */}
          </Button>
        </>
      ),
    },
    // { headerName: "PK" , field: "PK" },
  ]);


  return (
    <>
      <Container fluid>
        <Row className="">
          <Col className="cardStyleLeft">
            <Card className="mt-2">
              <div className="d-flex">
                <img src={enterIcon} className="iconStyle"></img>
                <h6 className="text-start textStyle">Input product details</h6>
              </div>
              <hr class="border border-danger border-2 opacity-100 w-50 mt-1 mb-1 orangeGradient"></hr>
              <>
                {showDataLoader ? (
                  <div style={{height: 460}}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </div>
                ) : (
                  <div className="ag-theme-quartz" style={{ height: 460, width: 528 }}>
                    {/* The AG Grid component */}
                    <AgGridReact
                      rowData={inputTableRowData}
                      columnDefs={colDefs}
                      headerHeight={headerHeight}
                      rowHeight={rowHeight}
                      onGridReady={onGridReady}
                      onRowClicked={onRowClicked}
                      rowSelection={"multiple"}
                    />
                  </div>
                )}
              </>
            </Card>
          </Col>
          <Col className="cardStyleRight">
            <Card className="mt-2">
              <div className="d-flex">
                <img src={suggestionIcon} className="iconStyle"></img>
                <h6 className="text-start textStyle">Mapping suggestions</h6>
              </div>
              <hr class="border border-danger border-2 opacity-100 w-50 mt-1 mb-1 orangeGradient"></hr>
              <div className="ag-theme-quartz" style={{ height: 460, width: 528 }}>
                {/* The AG Grid component */}
                <AgGridReact
                  rowData={suggestionTableRowData}
                  columnDefs={suggesTablecolDefs}
                  headerHeight={headerHeight}
                  rowHeight={rowHeight}
                  // frameworkComponents={frameworkComponents}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* ------------ Accept Modal ------------- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approval Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to insert data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={insertIntoTable}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

    {/* --------------- Reject Modal ----------------- */}
    <Modal show={rejectShow} onHide={handleRejectClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rejection Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reject data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRejectClose}>
            No
          </Button>
          <Button variant="primary" onClick={insertIntoRejectTable}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ------------------ Edit Modal ------------------- */}

      <Modal show={editShow} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTextField">
            <Form.Label>MDM Code:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MDM Code"
              value={textFieldValue}
              onChange={handleTextFieldChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="primary" onClick={editConfirmClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

    </>
  );
}

export default MDM;