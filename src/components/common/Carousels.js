import React, { useState } from "react";
import {
  Paper,
  Button,
  Box,
  Modal,
  Container,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import Themes from "../common/Theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 2000 },
        items: 5
      },
    desktop: {
        breakpoint: { max: 2000, min: 1024 },
        items: 3,
        slidesToSlide: 1 
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 
      }
};

export default function Carousels(props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={Themes}>
      <Box
        sx={{
          maxWidth: "100%",
          backgroundColor: props.bg,
          padding: "20px",
        }}
      >
        <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
          {props.category}
        </Typography>
       
        <Box
          sx={{
            // display: "flex",
            // justifyContent: "center",
            padding: "20px 20px 40px 20px",
            
          }}
        >
             <Carousel 
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            // ssr={true} /
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile", ]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            centerMode={false}
            >
                {props.items.map((item, i) => (
                    <Item key={i} item={item} handleOpenModal={handleOpenModal} />
                ))}
        </Carousel>

        </Box>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          border="none"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
            //    border: "2px solid #000",
            //   boxShadow: 24,
              borderRadius: 2,
              overflow: "hidden",
              // pt: 2,
              // px: 4,
              pb: 3,
            }}
          >
            {selectedItem && (
              <>
                <Box
                  sx={{
                    height: "350px",
                    width: "400px",
                    border:"none"
                  }}
                >
                  <img
                    src={selectedItem.image?selectedItem.image:selectedItem}
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
                  <h2>{selectedItem.name}</h2>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

function Item(props) {
  const { item, handleOpenModal } = props;

  return (
   <Box>
<Paper
        sx={{
          width: "300px",
        //   display: "flex",
        //   justifyContent: "center",
            boxShadow: "1px 1px 2px gray",
            margin:"20px auto",
            border:"none"
        }}
      >
        <Box>
          <Box
            sx={{
              minHeight: "200px",
              width: "300px",
              overflow: "hidden",
              borderRadius: "5px",
              border:"none"
            }}
            onClick={() => handleOpenModal(item)}
          >
            <img src={item.image?item.image:item.image1} alt={item.name} height="100%" width="100%" />
          </Box>
          <Box sx={{ padding: "10px" }}>
            <h2>{item.name}</h2>
          </Box>
        </Box>
      </Paper>
   </Box>
      
  );
}
