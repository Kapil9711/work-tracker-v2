// export default ;
const protocol = location.protocol;
let uri = "https://work-tracker-eight.vercel.app/api/v1";
if (protocol === "http:") uri = "/api/v1";

export default uri;
