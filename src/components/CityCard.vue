<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ convertToCelcius(Math.round(city.weather.main.temp)) }}&deg; C / {{ Math.round(city.weather.main.temp) }}&deg; F
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          Min:
          {{ convertToCelcius(Math.round(city.weather.main.temp_min)) }}&deg; C / {{ Math.round(city.weather.main.temp_min) }}&deg; F
        </span>
        <span class="text-xs">
          Max:
          {{ convertToCelcius(Math.round(city.weather.main.temp_max)) }}&deg; C / {{ Math.round(city.weather.main.temp_max) }}&deg; F
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const convertToCelcius = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.floor(celsius);
};
</script>
