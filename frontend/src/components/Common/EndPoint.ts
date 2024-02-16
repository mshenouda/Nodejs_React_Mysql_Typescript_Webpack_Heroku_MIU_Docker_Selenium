let endPoint: string="";
if (process.env.REACT_APP_NODE_ENV === 'production')
  endPoint = `https://${process.env.REACT_APP_PUBLIC_URL}`;
else
  endPoint =`http://${process.env.REACT_APP_PUBLIC_URL}:${process.env.REACT_APP_SERVER_PORT}`; 

export default endPoint;