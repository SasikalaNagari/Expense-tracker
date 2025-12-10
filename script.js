let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingIndex = -1;

const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const submitBtn = document.getElementById("submit-btn");

function renderExpenses() {
    list.innerHTML = "";
    let total = 0;

    expenses.forEach((expense, index) => {
        total += Number(expense.amount);

        const li = document.createElement("li");
        li.className = "expense-item";
        li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <div class="actions">
                <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalAmount.textContent = total;
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = nameInput.value;
    let amount = amountInput.value;

    if (editingIndex === -1) {
        expenses.push({ name, amount });
    } else {
        expenses[editingIndex] = { name, amount };
        editingIndex = -1;
        submitBtn.textContent = "Add Expense";
    }

    saveExpenses();
    renderExpenses();

    nameInput.value = "";
    amountInput.value = "";
});

function editExpense(index) {
    nameInput.value = expenses[index].name;
    amountInput.value = expenses[index].amount;

    editingIndex = index;
    submitBtn.textContent = "Update Expense";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}

renderExpenses();
