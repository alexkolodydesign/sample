const getHostUrl = props =>
  props.req ? `${props.req.protocol}://${props.req.get('Host')}` : '';

export default getHostUrl;
