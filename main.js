document.getElementById('loadCars').addEventListener('click', loadCars);
document.getElementById('addCarForm').addEventListener('submit', addCar);

function loadCars() {
  fetch('http://localhost:8080/api/car/get_all')
      .then(response => response.json())
      .then(cars => {
        const carsList = document.getElementById('carsList');
        carsList.innerHTML = ''; // Очистка списка
        cars.forEach(car => {
          const carCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${car.mark}</h5>
                                <p class="card-text"><strong>Condition:</strong> ${car.technical_condition}</p>
                                <p class="card-text"><strong>Kilometers:</strong> ${car.kilometerage}</p>
                                <p class="card-text"><strong>Owners:</strong> ${car.number_of_owners}</p>
                                <p class="card-text"><strong>Accidents:</strong> ${car.traffic_accidents ? 'Yes' : 'No'}</p>
                                <button class="btn btn-danger" onclick="deleteCar(${car.id})">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
          carsList.insertAdjacentHTML('beforeend', carCard);
        });
      })
      .catch(error => console.error('Error loading cars:', error));
}

function addCar(event) {
  event.preventDefault();

  const car = {
    mark: document.getElementById('mark').value,
    technical_condition: document.getElementById('technical_condition').value,
    kilometerage: parseInt(document.getElementById('kilometerage').value),
    number_of_owners: parseInt(document.getElementById('number_of_owners').value),
    traffic_accidents: document.getElementById('traffic_accidents').value === 'true'
  };

  fetch('http://localhost:8080/api/car/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add car');
        return response.json();
      })
      .then(addedCar => {
        console.log('Car added:', addedCar);
        loadCars(); // Перезагружаем список автомобилей
        document.getElementById('addCarForm').reset();
      })
      .catch(error => console.error('Error adding car:', error));
}

function deleteCar(carId) {
  fetch(`http://localhost:8080/api/car/delete?id_of_car=${carId}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete car');
        console.log(`Car with ID ${carId} deleted`);
        loadCars(); // Перезагружаем список автомобилей
      })
      .catch(error => console.error('Error deleting car:', error));
}