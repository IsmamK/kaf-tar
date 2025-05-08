const apiUrl = import.meta.env.VITE_API_URL;
let servicesData = []

fetch(`${apiUrl}/services/`)
.then(res=>res.json())
.then(data=>{
    servicesData = data
})


export { servicesData };
