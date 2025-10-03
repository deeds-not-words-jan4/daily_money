// Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// DOM要素取得
const balanceInput = document.getElementById('balance');
const daysInput = document.getElementById('days');
const calculateBtn = document.getElementById('calculateBtn');
const treeIcon = document.getElementById('treeIcon');
const dailyAmount = document.getElementById('dailyAmount');

// LocalStorageから読み込み
function loadData() {
    const savedBalance = localStorage.getItem('balance');
    const savedDays = localStorage.getItem('days');

    if (savedBalance) balanceInput.value = savedBalance;
    if (savedDays) daysInput.value = savedDays;

    if (savedBalance && savedDays) {
        calculate();
    }
}

// 木のイラストを選択
function getTreeIcon(amount) {
    if (amount >= 2000) return '🌳';
    if (amount >= 1000) return '🌲';
    return '🪦';
}

// 計算処理
function calculate() {
    const balance = parseFloat(balanceInput.value);
    const days = parseFloat(daysInput.value);

    if (!balance || !days || days <= 0) {
        dailyAmount.textContent = '正しい値を入力してください';
        treeIcon.textContent = '';
        return;
    }

    const daily = Math.floor(balance / days);

    // LocalStorageに保存
    localStorage.setItem('balance', balance);
    localStorage.setItem('days', days);

    // 表示更新
    treeIcon.textContent = getTreeIcon(daily);
    dailyAmount.textContent = `1日あたり：￥${daily.toLocaleString()}`;
}

// イベントリスナー
calculateBtn.addEventListener('click', calculate);
balanceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
});
daysInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculate();
});

// 初期化
loadData();
