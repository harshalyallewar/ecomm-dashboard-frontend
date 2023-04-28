import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Table,
  makeStyles,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import SearchIcon from "@mui/icons-material/Search";
import { server_address } from "../variables";

const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [list, setList] = useState([]);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchproducts();
  }, []);

  const fetchproducts = async () => {
    let result = await fetch(`${server_address}/productList/${user._id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result.success == false) {
      localStorage.clear();
    } else {
      setList(result);
    }
  };

  const deleteProduct = async (id) => {
    dispatch(showLoading());
    let result = await fetch(`${server_address}/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${await JSON.parse(
          localStorage.getItem("token")
        )}`,
      },
    });

    fetchproducts();
    dispatch(hideLoading());
  };

  const searchProduct = async (e) => {
    if (!e.target.value) {
      fetchproducts();
      return;
    }

    let result = await fetch(`${server_address}/search/${e.target.value}/${user._id}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    if (!result) {
      return;
    }

    result = await result.json();

    if (result.success) {
      setList(result.result);
    } else {
      fetchproducts();
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  return (
    <Container sx={{minHeight:'80vh'}}>
      <Paper
        elevation={1}
        sx={{ maxWidth: "500px", margin: "auto", mt: 4,mb:2, p: 0 }}
      >
        <TextField
          onChange={searchProduct}
          fullWidth
          label="Search Product"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Paper>
      <Paper sx={{ m: {xs:0,md:4}, mt: 3 }}>
        <TableContainer sx={{ maxHeight: 542, minHeight: 538 }}>
          <Table sx={{ p: 2 }} stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 ? (
                list.map((item, index) => {
                  return (
                    <TableRow key={item.name + index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            fontSize: { xs: "12px", md: "14px" },
                            fontWeight: "550",
                            letterSpacing: 1,
                            textTransform: "none",
                            mr: 1,
                            mb: { xs: 1, md: 0 },
                          }}
                          variant="contained"
                          onClick={() => deleteProduct(item._id)}
                          className="deletebtn"
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            fontSize: { xs: "12px", md: "14px" },
                            fontWeight: "550",
                            letterSpacing: 1,
                            textTransform: "none",
                          }}
                          onClick={() => {
                            navigate(`/update/${item._id}`);
                          }}
                          className="updatebtn"
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>
                    <h2>Result Not found</h2>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProductList;
