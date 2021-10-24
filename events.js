document.getElementById("ndp").addEventListener("click", async function() {
    let countries = await getCountries()
    document.getElementById("ndp").innerHTML = countries.AD.name;
});