<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const savedCities = ref([]);
const getCities = async () => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const weatherPromises = [];

    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {

    const weatherPromise = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${doc.data().coords.lat}&lon=${doc.data().coords.lng}&appid=${apiKey}&units=imperial`
    )
    .then((result) => result.data);

  weatherPromises.push(weatherPromise);
  savedCities.value.push({
    id: doc.data().id,
    state: doc.data().state,
    city: doc.data().city,
    coords: {
      lat: doc.data().coords.lat,
      lng: doc.data().coords.lng,
    },
    weather: weatherPromise,
  });
      
});
    
  const resolvedWeatherData = await Promise.all(weatherPromises);

  savedCities.value = savedCities.value.map((city, index) => ({
    ...city,
    weather: resolvedWeatherData[index],
  })).sort((a,b) => a.city.localeCompare(b.city));
};
await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
