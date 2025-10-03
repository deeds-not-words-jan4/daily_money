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

// 木の画像を選択
function getTreeImage(amount) {
    if (amount >= 3000) return '100-75.jpeg';
    if (amount >= 2000) return '75-50.jpeg';
    if (amount >= 1000) return '50-25.jpeg';
    return '25-0.jpeg';
}

// 計算処理
function calculate() {
    const balance = parseFloat(balanceInput.value);
    const days = parseFloat(daysInput.value);

    if (!balance || !days || days <= 0) {
        dailyAmount.textContent = '正しい値を入力してください';
        treeIcon.innerHTML = '';
        return;
    }

    const daily = Math.floor(balance / days);

    // LocalStorageに保存
    localStorage.setItem('balance', balance);
    localStorage.setItem('days', days);

    // 表示更新
    const imageSrc = getTreeImage(daily);
    treeIcon.innerHTML = `<img src="${imageSrc}" alt="Money Tree">`;
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
