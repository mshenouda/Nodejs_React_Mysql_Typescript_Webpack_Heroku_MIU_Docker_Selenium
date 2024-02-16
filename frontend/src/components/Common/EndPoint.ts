let endPoint: string="";
if (process.env.REACT_APP_NODE_ENV === 'production')
  endPoint = `${process.env.REACT_APP_HOST}`;
else
  endPoint =`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}`; 

export default endPoint;