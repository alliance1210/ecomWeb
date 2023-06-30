import React, { useState } from "react";
import { Paper, Button, Box, Modal, Typography } from "@mui/material";
import { useAuth } from "./utils/AuthContext";

export default function Products(props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMore, setViewMore] = useState(true);
  const [itemCount, setItemCount] = useState(4);
  const {addToCart} = useAuth();
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        backgroundColor: props.bg,
        padding: "20px",
        display:"flex",
        flexDirection:"column"
      }}
    >
      <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
        {props.category}
      </Typography>
      <Typography
        variant="h6"
        style={{
          fontSize: "1rem",
          padding: "0 60px",
          cursor: "pointer",
          alignSelf:"flex-end"
        }}
        onClick={() => {
          if (viewMore === false) {
            setItemCount(4);
          } else {
            setItemCount(props.items.length);
          }
          setViewMore((prev) => !prev);
        }}
      >
        {viewMore ? "View more..." : "View less..."}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          padding: "20px 20px 20px 20px",
        }}
      >
        {props.items
          .filter((item, i) => i < itemCount)
          .map((item, i) => (
            <Item key={i} item={item} handleOpenModal={handleOpenModal} />
          ))}
      </Box>
      

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "5px",
            overflow: "hidden",
            // border: '2px solid #000',
            // boxShadow: 24,
            // pt: 2,
            // px: 4,
            pb: 3,
          }}
        >
          {selectedItem && (
            <>
              <Box
                sx={{
                  height: "300px",
                  width: "400px",
                }}
              >
                <img
                  src={selectedItem.image1}
                  alt={selectedItem.name}
                  height="100%"
                  width="100%"
                />
              </Box>
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <Typography variant="h6">{selectedItem.name}</Typography>
              </Box>
              <Box sx={{ padding: "10px 0 0 10px" }}>
                <Typography variant="h5" style={{ fontSize: "1.2rem" }}>
                  Description
                </Typography>
              </Box>
              {selectedItem.description != "" ? (
                <Box
                  sx={{
                    padding: "5px 0 5px 10px",
                    // height: "40px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Typography variant="h7">
                    {selectedItem.description}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h7" style={{ padding: "10px" }}>
                  NA
                </Typography>
              )}
              <Box>
                <Box sx={{ padding: "0 0 20px 10px" }}>
                  <Typography variant="h7" style={{ fontWeight: 700 }}>
                    Price{" "}
                  </Typography>
                  {selectedItem.offer === "true" && (
                    <Typography
                      variant="h7"
                      style={{
                        textDecoration: "line-through",
                        color: "red",
                        margin: "0 5px 0 0 ",
                      }}
                    >
                      {+selectedItem.price + "rs"}
                    </Typography>
                  )}
                  <Typography variant="h7">
                    {selectedItem.offer === "true" &&
                      selectedItem.discountedPrice + "rs"}
                  </Typography>
                  <Typography variant="h7" style={{}}>
                    {selectedItem.offer === "false" &&
                      selectedItem.price + "rs"}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "none",
                    marginLeft: "10px",
                    "&:hover": {
                      backgroundColor: "darkblue",
                    },
                  }}
                  onClick={()=>addToCart(selectedItem)}
                >
                  Add to cart
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

function Item(props) {
  const { item, handleOpenModal } = props;
  const {addToCart} = useAuth()
  return (
    <Paper
      sx={{
        width: "300px",
        // display: "flex",
        // justifyContent: "start",
        boxShadow: "1px 1px 2px gray",
        margin: "20px 20px",
        border: "none",
        background: "whitesmoke",
      }}
    >
      <Box>
        <Box
          sx={{
            minHeight: "200px",
            width: "300px",
            overflow: "hidden",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => handleOpenModal(item)}
        >
          
          <img src={item.image1} alt={item.name} height="100%" width="100%"  />
        </Box>
        <Box sx={{ padding: "10px 0 0 10px", height: "55px" }}>
          <Typography
            variant="h5"
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
            onClick={() => handleOpenModal(item)}
          >
            {item.name}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "50px",
          }}
        >
          <Box sx={{ marginLeft: "10px" }}>
            <Typography variant="h7" style={{ fontWeight: 700 }}>
              Price{" "}
            </Typography>
            <Typography variant="h7">
              {item.offer === "true" && item.discountedPrice + "rs"}
            </Typography>
            {item.offer === "true" && (
              <Typography
                variant="h7"
                style={{
                  textDecoration: "line-through",
                  color: "red",
                  margin: "0 0 0 5px ",
                }}
              >
                {+item.price + "rs"}
              </Typography>
            )}
            
            <Typography variant="h7" style={{}}>
              {item.offer === "false" && item.price + "rs"}
            </Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "4px",
              padding: "2px 10px",
              fontSize: "0.8rem",
              fontWeight: 500,
              boxShadow: "none",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
            onClick={()=> addToCart(item)}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
