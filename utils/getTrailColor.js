const getTrailColor = value => {
  let trailColor;
  switch (value) {
    case 'hiking':
      trailColor = '#ed264c';
      break;
    case 'biking':
      trailColor = '#ff9100';
      break;
    case 'equestrian':
      trailColor = '#662f8e';
      break;
    case 'ohv':
      trailColor = '#00a89c';
      break;
    default:
      trailColor = '#ff0000';
  }
  return trailColor;
}

export default getTrailColor;
