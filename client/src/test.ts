import axios from "axios";

async function  a() {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);

    console.log(res.data)
}

a()