// Write your JavaScript code here!
window.addEventListener("load", function() {
   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const div = document.getElementById("missionTarget");
         // Pick random planet to send our intrepid crew to! range [0, 5]
         const missionDestination = Math.round(Math.random()*5);
         div.innerHTML = `
         <h2>Mission Destination</h2>
         <ul style="list-style-type:none">
            <li>Name: ${json[missionDestination].name}</li>
            <li>Diameter: ${json[missionDestination].diameter}</li>
            <li>Star: ${json[missionDestination].star}</li>
            <li>Distance from Earth: ${json[missionDestination].distance}</li>
            <li>Number of Moons: ${json[missionDestination].moons}</li>
         </ul>
         <img src="${json[missionDestination].image}">
         `;
      });
   });
   let form = document.querySelector("form");
   form.reset();
   form.addEventListener("submit", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      console.log(pilotInput.value);
      
      if ((pilotInput.value === '')|| (copilotInput.value === '')||(fuelLevelInput.value === '') || (cargoMassInput.value === ''))
      {
         alert("All fields are required!");
         event.preventDefault();
      } 
      else if (isNaN(pilotInput.value) === false || isNaN(copilotInput.value) === false || isNaN(fuelLevelInput.value) === true || isNaN(cargoMassInput.value) === true) 
      {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } 
      else 
      {
         document.getElementById("pilotStatus").innerHTML = "Pilot " + pilotInput.value + " is ready for launch";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilotInput.value + " is ready for launch";
         if (fuelLevelInput.value < 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         } 
         else 
         {
            document.getElementById("fuelStatus").innerHTML = "Fuel level set for launch";
         }
         if (cargoMassInput.value > 10000) 
         {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
         } 
         else 
         {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass set for launch";
         }
         if (cargoMassInput.value <= 10000 && fuelLevelInput.value >= 10000) 
         {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
            document.getElementById("faultyItems").style.visibility = "hidden";
         }
         event.preventDefault();
      }
   });
});