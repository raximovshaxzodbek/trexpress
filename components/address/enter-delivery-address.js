import React, { useContext, useEffect, useState } from "react";
import GetPosition from "../map/get-position";
import GoogleMap from "../../components/map";
import NavigationFillIcon from "remixicon-react/NavigationFillIcon";
import { AddressApi } from "../../api/main/address";
import { getCurrentLocation } from "../../utils/getCurrentLocation";
import InputText from "../form/input-text";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../utils/contexts/MainContext";

const EnterAddress = ({
  setIsOpen,
  setOpen = () => {},
  editAddress,
  setEditAddress = () => {},
}) => {
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState("");
  const [address, setAddress] = useState("");
  const { t: tl } = useTranslation();
  const { getUser } = useContext(MainContext);

  const addAddress = () => {
    if (!title) {
      toast.error(tl("Please enter address title"));
    } else {
      AddressApi.create({
        title: `${title}`,
        address: address?.address,
        location: `${address?.location.lat},${address?.location.lng}`,
        active: 0,
      })
        .then(() => {
          setOpen(false);
          setIsOpen(null);
          setEditAddress(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response?.data?.message);
        })
        .finally(() => {
          getUser();
          setTitle("");
        });
    }
  };
  const updateAddress = () => {
    AddressApi.update(editAddress?.id, {
      title: `${title}`,
      address: value,
      location: `${address.location.lat},${address.location.lng}`,
      active: 0,
    })
      .then(() => {
        setOpen(false);
        setEditAddress(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
      })
      .finally(() => {
        getUser();
        setTitle("");
        setValue("");
      });
  };
  const onFinish = () => {
    if (editAddress) {
      updateAddress();
    } else {
      addAddress();
    }
  };
  useEffect(() => {
    setTitle(editAddress?.title);
    setValue(editAddress?.address);
  }, [editAddress]);

  useEffect(() => {
    setValue(address?.address);
  }, [address]);
  return (
    <div className="enter-address">
      <div className="row">
        <InputText
          placeholder="Address name"
          label="Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="enter-input">
        <div
          className="get-location"
          onClick={() => getCurrentLocation({ setAddress })}
        >
          <NavigationFillIcon size={20} />
          <span>{tl("Define")}</span>
        </div>
        <GetPosition
          setValue={setValue}
          value={value}
          setAddress={setAddress}
        />
        <button className="get-location" type="submit" onClick={onFinish}>
          {tl("Submit")}
        </button>
      </div>
      <div className="google-map">
        <GoogleMap address={address} setAddress={setAddress} />
      </div>
    </div>
  );
};

export default EnterAddress;
