import {
  Button,
  Dialog,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { DB } from "../../config/firebase_config";
import Lottie from "lottie-react";
import animation from "../../public/images/loading.json";
import { useRouter } from "next/router";
const Details = () => {
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id: categoryId } = router.query;
  console.log(categoryId)
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(DB, "Categories"), (snapshot) => {
      const arr = [];
      snapshot.docs.map((item) => {
        console.log('item.id', item.id.trim()===categoryId.trim())
        if (item.id.trim() == categoryId.trim()) {
          arr.push(item.data());
        }
      });
     
      setServiceData(arr[0]);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const handleModal = () => {
    setOpen(true);
  };

  return (
    <>
      {loading ? (
        <Dialog open={true}>
          <Box sx={{ width: "100px" }}>
            <Lottie animationData={animation} loop={true} />
          </Box>
        </Dialog>
      ) : (
        <Container sx={{ my: 2 }}>
          <Stack gap={2}>
            <Typography variant="h5" fontWeight="bold">
              {serviceData?.service}
            </Typography>
            <Box
              sx={{
                height: "250px",
                width: "100%",
                display: "block",
                objectFit: "cover",
                borderRadius: 5,
              }}
              component="img"
              src={serviceData?.categoryImage}
            />
            {serviceData?.servicesArray?.map((serviceItem) => {
              return (
                <>
                  <Stack
                    className="menu-card"
                    direction="row"
                    justifyContent="space-between"
                    component={Paper}
                    p={2}
                    alignItems="flex-end"
                  >
                    <Stack>
                      <Typography variant="body2">
                        {serviceItem.service}
                      </Typography>
                      <Typography variant="h6">₹{serviceItem.price}</Typography>
                    </Stack>
                    
                  </Stack>
                </>
              );
            })}

            <Divider sx={{ my: 2 }} />
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Details;
