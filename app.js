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

// クラッカーアニメーション
function showCrackers() {
    const crackers = ['🎉', '✨', '🎊', '⭐', '💫'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const cracker = document.createElement('div');
            cracker.className = 'cracker';
            cracker.textContent = crackers[Math.floor(Math.random() * crackers.length)];
            cracker.style.left = Math.random() * 100 + '%';
            cracker.style.animationDelay = Math.random() * 0.3 + 's';
            document.body.appendChild(cracker);

            setTimeout(() => cracker.remove(), 2000);
        }, i * 50);
    }
}

// 枯れ葉アニメーション
function showFallingLeaves() {
    const leaves = ['🍂'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const leaf = document.createElement('div');
            leaf.className = 'falling-leaf';
            leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(leaf);

            setTimeout(() => leaf.remove(), 3000);
        }, i * 80);
    }
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

    // 3000円以上ならクラッカーアニメーション
    if (daily >= 3000) {
        showCrackers();
    }
    // 1000円未満なら枯れ葉アニメーション
    else if (daily < 1000) {
        showFallingLeaves();
    }
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
