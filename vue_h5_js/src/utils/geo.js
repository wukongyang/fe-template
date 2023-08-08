export const geo = {
  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (err) => {
            console.log(`getPosError:${err.code},${navigator.geolocation},${err.message}`);
          }
        );
      } else {
        console.log('This browser does not support getting geolocation');
      }
    });
  },
  openMap({ latitude, longitude }) {
    if (latitude && longitude) {
      const href = `https://www.google.com/maps/place/${Number.parseFloat(
        latitude
      )},${Number.parseFloat(longitude)}`;
      window.open(href, '_blank');
    }
  },
};
