const out = document.getElementById("out");
function explain(code){
    if (code === 1) return "Permission denied";
    if (code === 2) return "Position unavailable";
    if (code === 3) return "Request Timed out";
    return "Unknown error";
}
document.getElementById("locatemsg").addEventListener("click",function(){
    out.textContent = "Requesting current location...";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position) => {
            try{
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                out.textContent = `You are browsing from Lat:${lat}, Lon:${lon}`;
            }
            catch(error){
                out.textContent = "Error processing location data.";
                console.log(error); 
            }
        },(error) => {
            out.textContent = `Error: ${explain(error.code)}`;
        },
        {enableHighAccuracy: true,timeout:10000,maximumAge:0});
    }
    else{
        out.textContent = "Geolocation is not supported.";
    }
});