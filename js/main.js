let tableRow = document.querySelector("#tableRow")
let filterRow = document.querySelector("#filterRow")

let api = {
    "customers": [
        {
            "id": 1,
            "name": "Ahmed Ali"
        },
        {
            "id": 2,
            "name": "Aya Elsayed"
        },
        {
            "id": 3,
            "name": "Mina Adel"
        },
        {
            "id": 4,
            "name": "Sarah Reda"
        },
        {
            "id": 5,
            "name": "Mohamed Sayed"
        }
    ],
    "transactions": [
        {
            "id": 1,
            "customer_id": 1,
            "date": "2022-01-01",
            "amount": 1000
        },
        {
            "id": 2,
            "customer_id": 1,
            "date": "2022-01-02",
            "amount": 2000
        },
        {
            "id": 3,
            "customer_id": 2,
            "date": "2022-01-01",
            "amount": 550
        },
        {
            "id": 4,
            "customer_id": 3,
            "date": "2022-01-01",
            "amount": 500
        },
        {
            "id": 5,
            "customer_id": 2,
            "date": "2022-01-02",
            "amount": 1300
        },
        {
            "id": 6,
            "customer_id": 4,
            "date": "2022-01-01",
            "amount": 750
        },
        {
            "id": 7,
            "customer_id": 3,
            "date": "2022-01-02",
            "amount": 1250
        },
        {
            "id": 8,
            "customer_id": 5,
            "date": "2022-01-01",
            "amount": 2500
        },
        {
            "id": 9,
            "customer_id": 5,
            "date": "2022-01-02",
            "amount": 875
        }
    ]
}

let customerApi = api.customers;
let transactionApi = api.transactions;

function displayTable(customers, transactions) {
    let cartoona = "";
    for (let i = 0; i < customers.length; i++) {
        for (let j = 0; j < transactions.length; j++) {
            if (customers[i].id === transactions[j].customer_id) {
                cartoona += `
                <tr>
                    <th scope="row">${customers[i].id}</th>
                    <td>${customers[i].name}</td>
                    <td>${transactions[j].date}</td>
                    <td>${transactions[j].amount}</td>
                </tr>
                `;
            }
        }
    }
    tableRow.innerHTML = cartoona;
};

displayTable(customerApi, transactionApi);

userName = document.getElementById("name");
amount = document.getElementById("amount");

userName.addEventListener("search", function () {
    tableRow.innerHTML = "";
    amount.value = ""
    nameInput = userName.value.trim().toLowerCase();

    let userCartoona = ""
    for (let i = 0; i < customerApi.length; i++) {
        if (nameInput === customerApi[i].name.toLowerCase()) {
            for (let j = 0; j < transactionApi.length; j++) {
                if (api.transactions[j].customer_id === customerApi[i].id) {
                    userCartoona += `
                    <tr>
                        <th scope="row">${customerApi[i].id}</th>
                        <td>${customerApi[i].name}</td>
                        <td>${transactionApi[j].date}</td>
                        <td>${transactionApi[j].amount}</td>
                    </tr>
                `
                }
            }
        }
    }
    tableRow.innerHTML = userCartoona;
})

amount.addEventListener("search", function () {
    tableRow.innerHTML = "";
    userName.value = ""
    amountInput = Number(amount.value);

    let amountCartoona = ""
    for (let j = 0; j < transactionApi.length; j++) {
        if (amountInput === transactionApi[j].amount) {
            for (let i = 0; i < customerApi.length; i++) {
                if (transactionApi[j].customer_id == customerApi[i].id) {
                    amountCartoona += `
                    <tr>
                        <th scope="row">${customerApi[i].id}</th>
                        <td>${customerApi[i].name}</td>
                        <td>${transactionApi[j].date}</td>
                        <td>${transactionApi[j].amount}</td>
                    </tr>
                `
                }
            }
        }
    }
    tableRow.innerHTML = amountCartoona;
})

// chart

var barColors = ["red", "green", "blue", "orange", "brown"];

function aggregateTransactionsByCustomer() {
    const transactionsByCustomer = {};

    for (let i = 0; i < customerApi.length; i++) {
        transactionsByCustomer[customerApi[i].name] = {};
    }

    for (let j = 0; j < transactionApi.length; j++) {
        let customerName = customerApi.find(customer => customer.id === transactionApi[j].customer_id).name;
        let date = transactionApi[j].date;
        let amount = transactionApi[j].amount;

        if (!transactionsByCustomer[customerName][date]) {
            transactionsByCustomer[customerName][date] = 0;
        }
        transactionsByCustomer[customerName][date] += amount;
    }

    return transactionsByCustomer;
}

function updateChart(transactionsByCustomer) {
    let xValues = Object.keys(transactionsByCustomer);
    let datasets = [];

    xValues.forEach((customer, index) => {
        let dates = Object.keys(transactionsByCustomer[customer]);
        let amounts = Object.values(transactionsByCustomer[customer]);

        datasets.push({
            label: customer,
            backgroundColor: `hsl(${index * 60}, 100%, 50%)`,
            data: amounts,
            stack: customer
        });
    });

    let chart = new Chart(document.getElementById("myChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(transactionsByCustomer[xValues[0]]),
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Total Transaction Amount Per Day by Customer'
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
}
let transactionsByCustomer = aggregateTransactionsByCustomer();
updateChart(transactionsByCustomer);