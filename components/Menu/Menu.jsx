import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Modal,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import BasicModal from "./Modal";
import { collection, onSnapshot } from "firebase/firestore";
import { DB } from "../../config/firebase_config";
import Search from "./Search";
import Lottie from "lottie-react";
import animation from "../../public/images/loading.json";
import { useRouter } from "next/router";
const Menu = () => {
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(DB, "Categories"), (snapshot) => {
      setServiceData(snapshot.docs.map((item) => item.data()));
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const handleModal = () => {
    setOpen(true);
  };
// useEffect(()=>{
// getDoc(doc(DB,'Categories','BEAUTY_ESSENTIALS')).then((data)=>console.log(data.data()))
// },[])
  return (
    <>
      <BasicModal open={open} setOpen={setOpen} selectedItem={selectedItem} />
      {loading ? (
        <Dialog open={true}>
          <Box sx={{ width: "100px" }}>
            <Lottie animationData={animation} loop={true} />
          </Box>
        </Dialog>
      ) : (
        <Container sx={{ my: 2 }}>
          <AppBar position="fixed">
            <Toolbar>
              <Stack alignItems='center' width='100%' py={1}>
                <Box
                  component="img"
                  src="/images/appLogo.png"
                  width="180px"
                 
                />
                 
              </Stack>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <br/>
          <br/>
          <Search
            serviceData={serviceData.map((item) => item.service.trim())}
            entireData={serviceData}
          />
          {serviceData.length > 0 &&
            serviceData.map((item) => {
              return (
                <Stack
                  key={item.service.trim()}
                  gap={1}
                  component={Paper}
                  direction="row"
                  alignItems="flex-end"
                  p={2}
                  borderRadius={3}
                  mb={2}
                  elevation={3}
                >
                  <Box
                    sx={{
                      width: "70px",
                      height: "70px",
                      display: "block",
                      objectFit: "cover",
                      borderRadius: 3,
                    }}
                    component="img"
                    src={item.categoryImage}
                  />
                  <Stack direction="column" height="100%" width="100%" gap={1}>
                    <Typography variant="h5" fontWeight="bold">
                      {item.service.trim()}
                    </Typography>
                    <Stack
                      direction="row"
                      gap={1}
                      width="max-content"
                      ml="auto"
                    >
                      <Button
                        sx={{
                          textTransform: "inherit",
                          borderRadius: "10px !important",
                        }}
                        variant="contained"
                        onClick={() =>
                          router.push(
                            `/menu/${item.service.trim().replaceAll(" ", "_")}`
                          )
                        }
                      >
                        Details
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "inherit",
                          borderRadius: "10px !important",
                        }}
                        onClick={() =>
                          router.push(`/${item.service.trim().replaceAll(" ", "_")}`)
                        }
                      >
                        Gallery
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
        </Container>
      )}
    </>
  );
};

export default Menu;
