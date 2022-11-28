import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { DB } from "../../config/firebase_config";
import { useRouter } from "next/router";
import { Button, Stack, Typography } from "@mui/material";
export default function Gallery() {
  const [categoryData, setCategoryData] = React.useState([]);
  const router = useRouter();
  const { gallery } = router.query;
  React.useEffect(() => {
    const unsub = onSnapshot(collection(DB, "All_Categories"), (snapshot) => {
      let arr = [];
      snapshot.docs.filter((item) => {
        if (item.id === gallery) {
          arr.push(item.data());
        }
      });
      console.log(arr);
      setCategoryData(arr);
    });
    return () => unsub();
  }, []);
console.log('categoryData', categoryData)
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <Typography variant="h6">
        Images for {categoryData[0]?.service}
      </Typography>
      <ImageList variant="masonry" cols={2} gap={8}>
        {categoryData.length > 0 &&
          categoryData[0].galleryImages?.map((item) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
      </ImageList>
      {categoryData.length > 0 && categoryData[0].galleryImages.length==0 && (
        <Stack
          height="50vh"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Box component="img" width="100px" src="/images/not-found.png" />
          <Typography fontWeight="medium">Nothing here 😔</Typography>
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => router.push("/menu")}
          >
            GO BACK
          </Button>
        </Stack>
      )}
    </Box>
  );
}
