<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <RouterLink :to="{ name: 'home' }" v-if="route.params.city">
          <i
            class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
            @click="addCity"
            v-if="route.query"
          ></i>
          <i 
            class="fa-solid fa-trash ml-3 text-xl hover:text-red-500 duration-150 cursor-pointer"
            @click="removeCity"
            v-if="!route.query.preview"
            ></i>
        </RouterLink>
      </div>

      <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and
            future weather of cities of your choice.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the
              search bar.
            </li>
            <li>
              Select a city within the results, this will take
              you to the current weather for your selected city.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the
              top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select
            the city within the home page. At the bottom of the
            page, there will be am option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/firebase";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BaseModal from "./BaseModal.vue";

const route = useRoute();
const router = useRouter();

const addCity = () => {
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  saveCityData(locationObj);

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const saveCityData = async (city) => {
  await setDoc(doc(db, "cities", route.params.city), city);
  toast.success("City has been successfully saved.", {
        autoClose: 5000,
      });
};

const removeCity = async () => {
  await deleteDoc(doc(db, "cities", route.params.city));
  
  toast.success("City has been successfully removed.", {
        autoClose: 5000,
      });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
