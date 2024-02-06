let cars = [];
const addCarButton = document.querySelector('#carButton');
const minLicenseeLength = 4;
const payPerHour = 3000;
const payFirstHour = 5000;
const totalPlaces = 10;
const timeOutFreeSpot = 5000; // in milisecond

const formatDate = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

const secondsToHours = (d) => {
  d = Number(d);
  let h = Math.ceil(d / 3600);
  return h;
}

const renderTable = () => {
  let results = '';
  for (var i = cars.length - 1; i >= 0; i--) {
    let licensee = cars[i].licensee;
    let arrival = formatDate(cars[i].arrival);
    let leave = cars[i].leave === '-' ? '-' : formatDate(cars[i].leave);

    results += `<tr>
		  <td>${licensee}</td>
		  <td>${arrival}</td>
		  <td>${leave}</td>
		  <td>${showStatus(cars[i])}</td>
		  <td class="text-right">${makeBill(cars[i])}</td>
		  <td class="text-right">
			<button data-row="${i}" onclick="showSummary(event)" data-toggle="modal" data-target="#myModal" class="btn btn-sm btn-success">Summary</button>
					</td>
		</tr>`;
  }

  document.querySelector("#parking tbody").innerHTML = results;
}

const showStatus = (car) => {
  return car.isParked ? "Parked" : "Has left";
}

const changeStatus = (event) => {
  cars[event.target.dataset.row].isParked = false;
}

const setLeaveTime = (event) => {
  cars[event.target.dataset.row].leave = new Date(Date.now());
}

const countAvailablePlaces = (event) => {
  document.querySelector('#placesCount').innerHTML = totalPlaces - cars.length;
}

const setClassForBadge = () => {
  let badgeClassName = cars.length == totalPlaces ? 'badge badge-danger' : 'badge badge-success';
  document.querySelector('#placesCount').setAttribute('class', badgeClassName);
}

const calculateHoursBilled = (car) => {
  let arrivedAt = new Date(car.arrival).getTime();
  let leftAt = new Date(car.leave).getTime();
  return secondsToHours((leftAt - arrivedAt) / 1000); //duration in seconds
}

const makeBill = (car) => {
  let hoursBilled = calculateHoursBilled(car);
  let billValue = car.isParked ? "-" : "Rp " + (payFirstHour + (hoursBilled - 1) * payPerHour);
  return billValue;
}

const printSummary = (event) => {
  let car = cars[event.target.dataset.row];
  let sumarryTable = `<table class="table table-bordered m-0">
        <tr>
          <td class="font-weight-bold">Registration number</td>
          <td>${car.licensee}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Arrival</td>
          <td>${formatDate(car.arrival)}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Departure</td>
          <td>${formatDate(car.leave)}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Billable hours</td>
          <td>${calculateHoursBilled(car)}</td>
        </tr>
        <tr>
          <td class="font-weight-bold">Bill value</td>
          <td>${makeBill(car)}</td>
      </tr></table>`;

  document.querySelector('#modalBody').innerHTML = sumarryTable;
}

const showSummary = (event) => {
  changeStatus(event);
  setLeaveTime(event);
  renderTable();
  printSummary(event);

  //Free the parking place
  setTimeout(function() {
    freeSpot(event);
  }, timeOutFreeSpot);
}

const addCar = () => {
  let newLicensee = document.querySelector("#carValue").value;

  let newCar = {
    licensee: newLicensee,
    arrival: new Date(),
    leave: '-',
    isParked: true
  }

  // Add new car to the cars array

  document.querySelector('#message').style.display = 'none';
  if (newLicensee.length >= minLicenseeLength && cars.length < totalPlaces) {
    cars.push(newCar);
  } else {
    if (newLicensee.length < minLicenseeLength) {
      document.querySelector('#message').style.display = 'block';
    }
  }

  if (cars.length == totalPlaces) {
    document.querySelector('#carButton').setAttribute('disabled', true);
  }

  setClassForBadge();

  //Update places count
  countAvailablePlaces(event);

  // Empty text box
  document.querySelector("#carValue").value = '';

  // Render the table
  renderTable();
}

const freeSpot = (event) => {
  cars.splice(event.target.dataset.row, 1);
  setClassForBadge();

  if (cars.length == totalPlaces) {
    document.querySelector('#carButton').setAttribute('disabled', true);
  } else {
    document.querySelector('#carButton').removeAttribute('disabled');
  }

  // Render Table again after delete 
  renderTable();
  //Update places count
  countAvailablePlaces(event);
}

// Add new car to the array
if (addCarButton) {
  addCarButton.addEventListener('click', addCar);
}

// Render Table
renderTable();

//Show places count at page load
countAvailablePlaces(event);

/* Changes
1. Add if condition to addCarButton
2. Put js script at the end of html body
3. change the renderTable condition
4. Edited makeBill
5. edited freespot
*/
