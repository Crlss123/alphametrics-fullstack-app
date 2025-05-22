import api from ".";
import { Person, Population, Zone } from "my-types";

export const getAllPeople = async () => {
  try {
    const res = await api.get("/person");
    const people: Person[] = res.data.payload;
    return people;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPerson = async (id: number) => {
  try {
    const response = await api.get(`/person/${id}`);
    const person: Person = response.data.payload;
    return person;
  } catch (error) {
    console.log(error);
  }
};

export const getAllZones = async () => {
  try {
    const res = await api.get("/person/getallzones");
    const zones: Zone[] = res.data.payload;
    return zones;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPopulations = async (zoneId: number) => {
  try {
    const res = await api.get("/person/getpopulations", {
      params: { zoneId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPeopleByPopulation = async (populationId: number) => {
  try {
    const res = await api.get("person/getpeoplebygroup", {
      params: { populationId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deletePerson = async (id: number) => {
  try {
    const res = await api.delete(`/person/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar persona:", error);
    return;
  }
};

export const createPerson = async (newPerson: any) => {
  try {
    const res = await api.post("/person", newPerson);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPopulations = async () => {
  try {
    const res = await api.get("/person/getallpopulations");
    const populations: Population[] = res.data.payload;
    return populations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updatePerson = async (id: number, personData) => {
  try {
    const res = await api.patch(`/person/${id}`, personData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatusPercentageByPopulation = async (populationId: number) => {
  try {
    const res = await api.get("/person/getstatuspercentage", {
      params: { populationId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLevelAlert = async (populationId: number) => {
  try {
    const res = await api.get("/person/getalertlevel", {
      params: { populationId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const getTotalPeople = async (populationId: number) => {
  try {
    const res = await api.get("/person/gettotal", {
      params: { populationId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const getGenderStats = async (populationId: number) => {
  try {
    const res = await api.get("/person/getgenderstats", {
      params: { populationId },
    });
    return res.data.payload;
  } catch (error) {
    console.log(error);
    return [];
  }
};
