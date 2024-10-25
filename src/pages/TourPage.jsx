import React, { useEffect, useState } from 'react'
import FormInfo from '../components/form'

import { provincesService } from '../services/provincesService'

export default function TourPage() {
  const [provinces, setProvinces] = useState([])

  const GetAllProvinces = async (e) => {
    try {
      const res = await provincesService.getAll();
      if (res && res.data) {
        setProvinces(res.data.filter((item) => (item.isActive === true)))
      }
    } catch (error) {
      console.error("Error creating provinces:", error);
      alert("Failed to create provinces.");
    }
  };

  useEffect(() => {
    GetAllProvinces();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* <div className='flex justify-center mt-20'> */}
      <FormInfo provinces={provinces} />
      {/* </div> */}
    </div>
  )
}
