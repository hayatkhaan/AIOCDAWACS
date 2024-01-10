import axios from "axios";

// const API_URL = "http://localhost:80/api";
// const API_URL = "http://mum-dev-mdm-app-node-alb-926122754.ap-south-1.elb.amazonaws.com/api";
const API_URL = "http://mum-prod-mdm-app-node-alb-1716628259.ap-south-1.elb.amazonaws.com/api";
const headers = { "Content-Type": "application/json; charset=utf-8" };

const userService = {
    getInputData: function() {
        return axios.get(API_URL + "/getData",
        {
            params:{

            }},
            {
                headers: headers
            })
        },
    getSuggestionData: function(rowData){
        return axios.post(API_URL + "/getSuggesData",
        {
            params:{
                PK: rowData.PK,
                DISTRIBUTOR_CODE: rowData.DISTRIBUTOR_CODE,
                REGEX: rowData.REGEX
            }},
            {
                headers: headers
            }
        )
    },
    insertIntoTable: function(sourceSystem, distributorCode, productCode, productName, pack, companyCode, companyName, ptr, pk,
        mdmDistributor, mdmProductCode, mdmProductName, mdmPtr, matchPerc, regex){
        return axios.post(API_URL + "/insertIntoTable",
        {
            params:{
                SOURCE_SYSTEM: sourceSystem,
                DISTRIBUTOR_CODE: distributorCode,
                PRODUCT_CODE: productCode, 
                PRODUCT_NAME: productName,
                PACK: pack,
                COMPANY_CODE: companyCode,
                COMPANY_NAME: companyName,
                PTR: ptr,
                PK: pk,
                MDM_DISTRIBUTOR: mdmDistributor,
                MDM_PRODUCT_CODE: mdmProductCode,
                MDM_PRODUCT_NAME: mdmProductName,
                MDM_PTR: mdmPtr,
                MATCH_PERC: matchPerc,
                REGEX: regex
            }},
            {
                headers: headers
            }
        )
    },
    insertIntoRejectTable: function(sourceSystem, distributorCode, productCode, productName, pack, companyCode, companyName, ptr, pk,
        mdmDistributor, mdmProductCode, mdmProductName, mdmPtr, matchPerc, regex){
        return axios.post(API_URL + "/insertIntoRejectTable",
        {
            params:{
                SOURCE_SYSTEM: sourceSystem,
                DISTRIBUTOR_CODE: distributorCode,
                PRODUCT_CODE: productCode, 
                PRODUCT_NAME: productName,
                PACK: pack,
                COMPANY_CODE: companyCode,
                COMPANY_NAME: companyName,
                PTR: ptr,
                PK: pk,
                MDM_DISTRIBUTOR: mdmDistributor,
                MDM_PRODUCT_CODE: mdmProductCode,
                MDM_PRODUCT_NAME: mdmProductName,
                MDM_PTR: mdmPtr,
                MATCH_PERC: matchPerc,
                REGEX: regex
            }},
            {
                headers: headers
            }
        )
    }
    }


export default userService;