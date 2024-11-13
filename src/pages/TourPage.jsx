import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme } from "antd";
import FormInfo from "../components/formInfo";

// import { provincesService } from "../services/provincesService";
// import BreadcrumbC from "../components/Breadcrumb";
// import HotelsInfo from "../components/hotelsInfo";
// import TourSchedule from "../components/tourSchedule";
// import VehicleInfo from "../components/vehicleInfo";
// import MealsInfo from "../components/mealsInfo";
// import ServicesInfo from "../components/servicesInfo";

import { provincesService } from "../services/provincesService";
import BreadcrumbC from "../components/Breadcrumb";
import HotelInfo from "../components/hotelInfo";
import VehicleInfo from "../components/vehicleInfo";
import MealsInfo from "../components/mealsInfo";
import ServicesInfo from "../components/servicesInfo";
import TourQuotation from "../components/tourSchedule";

export default function TourPage() {
  const [provinces, setProvinces] = useState([]);
  const [infoTraveler, setInfoTraveler] = useState({
    tourId: "",
    customerName: "",
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: {
      adults: 0,
      childrenUnder2: 0,
      childrenUnder12: 0,
    },
    assignedVehicle: null,
    status: "NEW",
    vehicleType: "",
    specialRequirements: "",
  });
  console.log("🚀 ~ TourPage ~ infoTraveler:", infoTraveler);

  const GetAllProvinces = async (e) => {
    try {
      const res = await provincesService.getAll();
      if (res && res.data) {
        setProvinces(res.data.filter((item) => item.isActive === true));
      }
    } catch (error) {
      console.error("Error creating provinces:", error);
      alert("Failed to create provinces.");
    }
  };

  useEffect(() => {
    GetAllProvinces();
  }, []);
  const breadcrumbItems = [{ title: "tour" }];

  const steps = [
    {
      title: "Nhập thông tin",
      content: (
        <FormInfo
          provinces={provinces}
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Di chuyển",
      content: (
        <VehicleInfo
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Lưu trú",
      content: (
        <HotelInfo
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Ăn uống",
      content: (
        <MealsInfo
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Thông tin dịch vụ",
      content: (
        <ServicesInfo
          infoTraveler={infoTraveler}
          setInfoTraveler={setInfoTraveler}
        />
      ),
    },
    {
      title: "Báo giá",
      content: <TourQuotation />,
    },
  ];

  // steps
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>

      <BreadcrumbC items={breadcrumbItems} />
      <div className="flex space-x-4">
        <div className="w-3/4">
          <div className="max-w-7xl mx-auto px-4">
            {/* <div className='flex justify-center mt-20'> */}
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div className="my-5">
              <div className="my-5">
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                    }}
                    onClick={() => prev()}
                  >
                    Previous
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="w-full px-3 py-2 border rounded-xl">
            <h2 className="font-semibold text-lg">Thông tin đơn hàng</h2>
            <TourQuotation />
          </div>
        </div>
      </div>
    </>
  );
}
