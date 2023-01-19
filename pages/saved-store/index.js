import React from "react";
import StoresCard from "../../components/stores/card";
import StoresSection from "../../components/stores/section";
import { useSelector } from "react-redux";
import Empty from "../../components/empty-data";
import { images } from "../../constants/images";
import SEO from "../../components/seo";
const SavedStore = () => {
  const savedStore = useSelector((state) => state.savedStore.savedStoreList);
  return (
    <>
      <SEO />
      <StoresSection title="Saved store">
        {savedStore.length > 0 ? (
          savedStore.map((store, key) => <StoresCard key={key} store={store} />)
        ) : (
          <Empty
            image={images.SavedStore}
            text1="There are no items in the saved stores"
            text2="To select items, go to the stores"
          />
        )}
      </StoresSection>
    </>
  );
};

export default SavedStore;
