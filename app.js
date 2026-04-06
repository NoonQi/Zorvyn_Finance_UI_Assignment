let state = {
    role: 'admin',
    currentMonth: 3, 
    currentYear: 2026,
    currentPage: 'records',
    searchTerm: '',
    transactions: [
        { name: 'Salary', amount: 5000, type: 'income', date: '2026-04-01' },
        { name: 'Rent', amount: 1200, type: 'expense', date: '2026-04-02' },
        { name: 'Groceries', amount: 150, type: 'expense', date: '2026-04-03' },
        { name: 'Dinner', amount: 80, type: 'expense', date: '2026-04-04' }
    ]
};

// CHART INSTANCES
let doughnutChartInst = null;
let lineChartInst = null;

// FIXED RATES LOOKUP
const FIXED_RATES = {
    INR: 83.25,
    EUR: 0.92,
    GBP: 0.79,
    MXN: 16.70,
    PHP: 56.10
};

function getProcessedData() {
    return state.transactions.filter(t => {
        const d = new Date(t.date);
        const matchesMonth = d.getMonth() === state.currentMonth;
        const matchesSearch = t.name.toLowerCase().includes(state.searchTerm.toLowerCase());
        return matchesMonth && matchesSearch;
    });
}

function updateBanner() {
    const data = getProcessedData();
    const inc = data.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
    const exp = data.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
    
    document.getElementById('totalIncome').innerText = `$${inc}`;
    document.getElementById('totalExpenses').innerText = `$${exp}`;
    document.getElementById('totalBalance').innerText = `$${inc - exp}`;
}

function showPage(pageId) {
    state.currentPage = pageId;
    const main = document.getElementById('mainDisplay');
    const data = getProcessedData();
    
    updateBanner();

    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${pageId}`)?.classList.add('active');

    if (pageId === 'records') {
        const inc = data.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
        const exp = data.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);

        main.innerHTML = `
            <div class="insight-grid">
                <div class="insight-card"><h4>Monthly Income</h4><p class="income-color">$${inc}</p></div>
                <div class="insight-card"><h4>Monthly Expenses</h4><p class="expense-color">$${exp}</p></div>
                <div class="insight-card"><h4>Net Savings</h4><p>$${inc - exp}</p></div>
            </div>
            <div style="background:var(--bg-card); padding:20px; border-radius:15px; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px;">
                    <input type="text" id="searchInput" class="search-bar" style="margin-bottom:0;" placeholder="Search..." value="${state.searchTerm}">
                    <div style="display:flex; gap:8px;">
                        <button onclick="exportData('csv')" class="export-btn"><i class="fas fa-file-csv"></i> CSV</button>
                        <button onclick="exportData('json')" class="export-btn"><i class="fas fa-file-code"></i> JSON</button>
                    </div>
                </div>
                <table style="width:100%; margin-top:20px; border-collapse:collapse; text-align:left;">
                    <tr style="color:#888; font-size:12px; border-bottom:1px solid #eee;">
                        <th>DATE</th><th>ITEM</th><th>TYPE</th><th>AMOUNT</th><th style="text-align:right;">ACTION</th>
                    </tr>
                    ${data.map((t) => {
                        const originalIndex = state.transactions.indexOf(t);
                        return `
                        <tr style="border-bottom:1px solid #fff0f3;">
                            <td style="padding:10px;">${t.date}</td>
                            <td>${t.name}</td>
                            <td class="${t.type}-color"><strong>${t.type.toUpperCase()}</strong></td>
                            <td>$${t.amount}</td>
                            <td style="text-align:right;">
                                ${state.role === 'admin' ? `
                                    <button onclick="deleteRecord(${originalIndex})" class="delete-btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                ` : '-'}
                            </td>
                        </tr>`;
                    }).join('')}
                </table>
            </div>`;
        
        const input = document.getElementById('searchInput');
        input.focus();
        input.setSelectionRange(state.searchTerm.length, state.searchTerm.length);
        input.addEventListener('input', (e) => { state.searchTerm = e.target.value; showPage('records'); });

    } else if (pageId === 'charts') {
        main.innerHTML = `<div class="insight-grid">
            <div class="insight-card"><h3>Spending Mix</h3><canvas id="doughnutChart"></canvas></div>
            <div class="insight-card" style="grid-column: span 2;"><h3>Daily Trend</h3><canvas id="lineChart"></canvas></div>
        </div>`;
        renderCharts(data);

    } else if (pageId === 'reports') {
        const totalIncome = data.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const totalExpense = data.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const netRemaining = totalIncome - totalExpense;

        main.innerHTML = `
            <div class="notebook-page">
                <h2 style="text-align:center; color:var(--pink-main); margin-bottom: 20px;">- Monthly Ledger -</h2>
                <div style="margin-top:10px;">
                    ${data.map(t => `
                        <div style="display:flex; justify-content:space-between; border-bottom:1px dashed #ddd; line-height:30px; padding: 0 5px;">
                            <span>${t.date} | ${t.name}</span>
                            <span class="${t.type}-color">${t.type === 'income' ? '+' : '-'}$${t.amount}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 40px; padding-top: 10px; border-top: 2px solid var(--pink-main); font-weight: bold; font-size: 18px;">
                    <div style="display:flex; justify-content:space-between; line-height: 40px;"><span>Total Income:</span><span class="income-color">$${totalIncome}</span></div>
                    <div style="display:flex; justify-content:space-between; line-height: 40px;"><span>Total Expenses:</span><span class="expense-color">$${totalExpense}</span></div>
                    <div style="display:flex; justify-content:space-between; line-height: 50px; border-top: 1px solid #eee; margin-top: 10px;">
                        <span>Net Amount Remaining:</span>
                        <span style="color: ${netRemaining >= 0 ? 'var(--income)' : 'var(--expense)'}; border-bottom: 4px double var(--pink-main);">$${netRemaining}</span>
                    </div>
                </div>
            </div>`;
    }
}

// --- DELETE LOGIC ---
function deleteRecord(index) {
    if (state.role !== 'admin') return;
    if (confirm("Are you sure you want to delete this record?")) {
        state.transactions.splice(index, 1);
        updateBanner();
        showPage(state.currentPage);
    }
}

// --- EXPORT LOGIC ---
function exportData(type) {
    const data = getProcessedData();
    let blob;
    let fileName = `PinkFinance_Export_${new Date().toISOString().split('T')[0]}`;

    if (type === 'json') {
        const jsonContent = JSON.stringify(data, null, 2);
        blob = new Blob([jsonContent], { type: 'application/json' });
        fileName += '.json';
    } else {
        const headers = ["Date", "Item", "Type", "Amount"];
        const rows = data.map(t => `${t.date},${t.name},${t.type},${t.amount}`);
        const csvContent = [headers.join(','), ...rows].join('\n');
        blob = new Blob([csvContent], { type: 'text/csv' });
        fileName += '.csv';
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- CURRENCY CONVERTER ---
function convertCurrency() {
    const amount = document.getElementById('convAmount').value;
    const currency = document.getElementById('targetCurrency').value;
    const resultSpan = document.getElementById('convResult');
    if (!amount || amount <= 0) { resultSpan.innerText = "0.00"; return; }
    const rate = FIXED_RATES[currency];
    const converted = (amount * rate).toFixed(2);
    resultSpan.innerText = `${converted} ${currency}`;
}

// --- CHART RENDER ---
function renderCharts(data) {
    const inc = data.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = data.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    if (doughnutChartInst) doughnutChartInst.destroy();
    if (lineChartInst) lineChartInst.destroy();

    const ctxD = document.getElementById('doughnutChart');
    if(ctxD) {
        doughnutChartInst = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{ data: [inc, exp], backgroundColor: ['#2ecc71', '#f72585'], borderWidth: 0 }]
            }
        });
    }

    const days = [...new Set(data.map(t => t.date))].sort();
    const trendValues = days.map(day => data.filter(t => t.date === day).reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0));

    const ctxL = document.getElementById('lineChart');
    if(ctxL) {
        lineChartInst = new Chart(ctxL, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{ label: 'Daily Net', data: trendValues, borderColor: '#f72585', tension: 0.4 }]
            }
        });
    }
}

// --- MODAL CONTROLS ---
function openAddModal() {
    if (state.role === 'admin') {
        document.getElementById('addModal').style.display = 'flex';
    } else {
        alert("Access Denied: Switch to Admin Mode to add records.");
    }
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

function saveRecord() {
    const name = document.getElementById('itemName').value;
    const amt = parseFloat(document.getElementById('itemAmount').value);
    const type = document.getElementById('itemType').value;

    if (name && !isNaN(amt)) {
        state.transactions.push({
            name: name,
            amount: amt,
            type: type,
            date: new Date().toISOString().split('T')[0]
        });
        document.getElementById('itemName').value = '';
        document.getElementById('itemAmount').value = '';
        updateBanner();
        closeAddModal();
        showPage(state.currentPage);
    } else {
        alert("Please enter a valid Name and Amount.");
    }
}

// --- UTILS ---
function updateDateContext() {
    state.currentMonth = parseInt(document.getElementById('monthSelect').value);
    showPage(state.currentPage);
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('collapsed'); }
function toggleTheme() { document.body.classList.toggle('dark-theme'); }
function updateRole() { state.role = document.getElementById('roleSelect').value; showPage(state.currentPage); }

window.onload = () => { showPage('records'); };