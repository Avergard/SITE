document.addEventListener("DOMContentLoaded", loadSellers);

function loadSellers() {
    fetch('http://localhost:8080/api/seller/get_all')
        .then(response => response.json())
        .then(sellers => {
            const sellersList = document.getElementById('sellersList');
            sellersList.innerHTML = ''; // Очистка списка продавцов

            sellers.forEach(seller => {
                const sellerCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${seller.name} ${seller.surname}</h5>
                                <p class="card-text"><strong>Age:</strong> ${seller.age}</p>
                                <p class="card-text"><strong>Experience:</strong> ${seller.experience} years</p>
                                <p class="card-text"><strong>Sales:</strong> ${seller.sales}</p>
                            </div>
                        </div>
                    </div>
                `;
                sellersList.insertAdjacentHTML('beforeend', sellerCard);
            });
        })
        .catch(error => console.error('Error loading sellers:', error));
}