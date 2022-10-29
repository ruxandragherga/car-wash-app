import axios from "axios";

export function useService() {

  async function findService(
    serviceData: {serviceName:string}

  ) {
    try {
      const res = await axios.get("http://localhost:3003/api/get");
      const { data } = await res;
      const allServices = data;

      const currentServiceInDatabase = allServices.find(
        (service: any) =>  service.service_name === serviceData.serviceName
      );
      
      return await currentServiceInDatabase;
    } catch (err) {
      console.log(err);
    }
  }

  return { findService };
}