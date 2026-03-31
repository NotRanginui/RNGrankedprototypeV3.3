/**
 * CRIMSON RNG: ELITE 
 * UPDATE: ELO RANK DIFFERENTIAL SYSTEM
 */

const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Emerald", "Nightmare"];
const BOT_LUCK_CONFIG = {
    "Bronze": [1.0, 1.8], "Silver": [1.9, 2.4], "Gold": [2.5, 3.8],
    "Platinum": [4.5, 8.0], "Diamond": [10.0, 20.0], "Emerald": [25.0, 55.0], "Nightmare": [80.0, 300.0]
};

// Shop Configuration
const SHOP_ITEMS = {
    permanentLuckBoost: { name: "Permanent Luck Boost", cost: 1000000, luckMultiplier: 1.1, type: "permanent" },
    permanentCoinBoost: { name: "Permanent Coin Boost", cost: 1000000, coinMultiplier: 1.1, type: "permanent" },
    luckyPotion1: { name: "Lucky Potion I", cost: 200000, luckMultiplier: 1.5, duration: 300000, type: "consumable" },
    luckyPotion2: { name: "Lucky Potion II", cost: 400000, luckMultiplier: 2.0, duration: 300000, type: "consumable" },
    luckyPotion3: { name: "Lucky Potion III", cost: 500000, luckMultiplier: 3.0, duration: 300000, type: "consumable" },
    heavenlyDice: { name: "Heavenly Dice", cost: 20000, luckMultiplier: 100, type: "consumable", singleUse: true }
};

// Weekly Reward Configuration
const WEEKLY_REWARDS = {
    "Bronze": 50000,
    "Silver": 150000,
    "Gold": 300000,
    "Platinum-1": 500000,
    "Platinum-2": 500000,
    "Platinum-3": 700000,
    "Platinum-4": 700000,
    "Diamond-1": 1000000,
    "Diamond-2": 1000000,
    "Diamond-3": 1400000,
    "Diamond-4": 1400000,
    "Emerald": 2000000,
    "Nightmare": null // Calculated dynamically
};

let globalHighRolls = JSON.parse(localStorage.getItem('crimson_global_highs')) || [];
let currentAccIdx = parseInt(localStorage.getItem('crimson_current_acc')) || 0;
let settings = JSON.parse(localStorage.getItem('crimson_settings')) || { roundNumbers: false, luckScale: 100 };
let adminPersist = JSON.parse(localStorage.getItem('crimson_admin_persist')) || { playerLuck: 2.0, adminRPBonus: 1.0 };

// --- LIVE STATE ---
let playerSets = 0, botSets = 0, currentBotRank = "Bronze";
let playerLuck = parseFloat(adminPersist.playerLuck);
let adminRPBonus = parseFloat(adminPersist.adminRPBonus);
let godMode = false, botRigged = false, botLuckOverride = null;
let playerRetries = 5, playerRoll = 0, botRoll = 0, isProcessing = false;
let lastRankIdx = -1;

// --- DATA ---
let allAccounts = JSON.parse(localStorage.getItem('crimson_accounts')) || [
    { 
        name: "Player 1", 
        points: 0, 
        streak: 0, 
        bestStreak: 0, 
        wins: 0, 
        losses: 0, 
        history: [], 
        pb: 0,
        coins: 0,
        permanentLuckBoost: 1.0,
        permanentCoinBoost: 1.0,
        inventory: {
            luckyPotion1: 0,
            luckyPotion2: 0,
            luckyPotion3: 0,
            heavenlyDice: 0
        },
        activePotions: [],
        weeklyRank: "Bronze",
        weeklyDivision: 1,
        lastWeeklyReset: Date.now(),
        weeklyHistory: [],
        highestRpEver: 0
    }
];

// Data Migration
allAccounts.forEach(acc => { 
    if (typeof acc.bestStreak === 'undefined') acc.bestStreak = acc.streak || 0;
    if (typeof acc.coins === 'undefined') acc.coins = 0;
    if (typeof acc.permanentLuckBoost === 'undefined') acc.permanentLuckBoost = 1.0;
    if (typeof acc.permanentCoinBoost === 'undefined') acc.permanentCoinBoost = 1.0;
    if (typeof acc.maxAchievedLuck === 'undefined') acc.maxAchievedLuck = playerLuck;
    if (typeof acc.inventory === 'undefined') acc.inventory = { luckyPotion1: 0, luckyPotion2: 0, luckyPotion3: 0, heavenlyDice: 0 };
    if (typeof acc.activePotions === 'undefined') acc.activePotions = [];
    if (typeof acc.weeklyRank === 'undefined') acc.weeklyRank = "Bronze";
    if (typeof acc.weeklyDivision === 'undefined') acc.weeklyDivision = 1;
    if (typeof acc.lastWeeklyReset === 'undefined') acc.lastWeeklyReset = Date.now();
    if (typeof acc.weeklyHistory === 'undefined') acc.weeklyHistory = [];
    if (typeof acc.history === 'undefined') acc.history = [];
    if (typeof acc.wins === 'undefined') acc.wins = 0;
    if (typeof acc.losses === 'undefined') acc.losses = 0;
    if (typeof acc.pb === 'undefined') acc.pb = 0;
    if (typeof acc.highestRpEver === 'undefined') acc.highestRpEver = acc.points || 0;
});

// Add event listeners for navigation buttons
function attachNavigationListeners() {
    const profilesBtn = document.getElementById('profiles-btn');
    if (profilesBtn) profilesBtn.onclick = () => toggleModal('acc-modal');
    
    const historyBtn = document.getElementById('history-btn');
    if (historyBtn) historyBtn.onclick = openHistory;
    
    const highrollsBtn = document.getElementById('highrolls-btn');
    if (highrollsBtn) highrollsBtn.onclick = openHighRolls;
    
    const leaderboardBtn = document.getElementById('leaderboard-btn');
    if (leaderboardBtn) leaderboardBtn.onclick = openLeaderboard;
    
    const rankrewardsBtn = document.getElementById('rankrewards-btn');
    if (rankrewardsBtn) rankrewardsBtn.onclick = openRankRewards;
    
    const streaksBtn = document.getElementById('streaks-btn');
    if (streaksBtn) streaksBtn.onclick = openStreakBoard;
    
    const shopBtn = document.getElementById('shop-btn');
    if (shopBtn) shopBtn.onclick = openShop;
    
    const inventoryBtn = document.getElementById('inventory-btn');
    if (inventoryBtn) inventoryBtn.onclick = openInventory;
    
    const transferBtn = document.getElementById('transfer-btn');
    if (transferBtn) transferBtn.onclick = openTransfer;
    
    const statsBtn = document.getElementById('stats-btn');
    if (statsBtn) statsBtn.onclick = openStats;
    
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) settingsBtn.onclick = () => toggleModal('settings-modal');
}

function init() {
    // Check for corrupted data and reset if necessary
    if (!allAccounts || !Array.isArray(allAccounts) || allAccounts.length === 0) {
        allAccounts = [{
            name: "Player 1", 
            points: 0, 
            streak: 0, 
            bestStreak: 0, 
            wins: 0, 
            losses: 0, 
            history: [], 
            pb: 0,
            coins: 0, // Start with 0 coins
            permanentLuckBoost: 1.0,
            permanentCoinBoost: 1.0,
            maxAchievedLuck: 2.0,
            inventory: {
                luckyPotion1: 0,
                luckyPotion2: 0,
                luckyPotion3: 0
            },
            activePotions: [],
            weeklyRank: "Bronze",
            weeklyDivision: 1,
            lastWeeklyReset: Date.now(),
            weeklyHistory: [], // Track weekly rank endings and rewards
            highestRpEver: 0 // Track highest RP ever reached
        }];
        currentAccIdx = 0;
        localStorage.setItem('crimson_accounts', JSON.stringify(allAccounts));
        localStorage.setItem('crimson_current_acc', currentAccIdx);
    }
    
    if (!allAccounts[currentAccIdx]) currentAccIdx = 0;
    
    checkWeeklyReset();
    startPotionTimerManager();
    
    const savedMatch = JSON.parse(localStorage.getItem('crimson_match_state'));
    if (savedMatch) {
        playerSets = savedMatch.pSets || 0;
        botSets = savedMatch.bSets || 0;
        currentBotRank = savedMatch.botRank || "Bronze";
        playerRoll = savedMatch.playerRoll || 0;
        botRoll = savedMatch.botRoll || 0;
        playerRetries = savedMatch.playerRetries || (godMode ? 999 : 5);
        isProcessing = savedMatch.isProcessing || false;
        
        // Update UI to show restored state
        if (playerRoll > 0) {
            const val = settings.roundNumbers ? Math.round(playerRoll).toLocaleString() : playerRoll.toFixed(2);
            document.getElementById('player-roll').innerHTML = `<span class="roll-value">1 in ${val}</span>`;
        }
        if (botRoll > 0) {
            const val = settings.roundNumbers ? Math.round(botRoll).toLocaleString() : botRoll.toFixed(2);
            document.getElementById('bot-roll').innerHTML = `<span class="roll-value">1 in ${val}</span>`;
        }
        document.getElementById('player-retries').innerText = godMode ? "GOD MODE" : `RETRIES: ${playerRetries}`;
    } else {
        queueBot();
    }

    lastRankIdx = Math.floor(allAccounts[currentAccIdx].points / 400);
    
    updateUI();
    updateDots();
    resetRound();
    attachListeners();
    attachNavigationListeners();
}

function save() {
    localStorage.setItem('crimson_accounts', JSON.stringify(allAccounts));
    localStorage.setItem('crimson_global_highs', JSON.stringify(globalHighRolls));
    localStorage.setItem('crimson_current_acc', currentAccIdx);
    localStorage.setItem('crimson_settings', JSON.stringify(settings));
    localStorage.setItem('crimson_admin_persist', JSON.stringify({ playerLuck, adminRPBonus }));
    saveMatchState();
}

function saveMatchState() {
    localStorage.setItem('crimson_match_state', JSON.stringify({
        pSets: playerSets, 
        bSets: botSets, 
        botRank: currentBotRank,
        playerRoll: playerRoll,
        botRoll: botRoll,
        playerRetries: playerRetries,
        isProcessing: isProcessing
    }));
}

function getStreakClass(streak) {
    if (streak >= 100) return 'streak-100';
    if (streak >= 10) return `streak-${Math.floor(streak / 10) * 10}`;
    return 'streak-0';
}

function updateUI() {
    const acc = allAccounts[currentAccIdx];
    const rIdx = Math.min(6, Math.floor(acc.points / 400));
    const rName = ranks[rIdx];
    const div = Math.floor((acc.points % 400) / 100) + 1;

    if (lastRankIdx !== -1 && rIdx > lastRankIdx) {
        triggerRankPromotion(rName);
    }
    lastRankIdx = rIdx; 

    const recent = acc.history.slice(0, 20);
    const rollingWR = recent.length === 0 ? 0.5 : recent.filter(m => m.res === "WIN").length / recent.length;
    const lifeWR = (acc.wins + acc.losses === 0) ? 0 : (acc.wins / (acc.wins + acc.losses)) * 100;
    const mult = (0.5 + rollingWR) * adminRPBonus;
    const totalLuck = calculateTotalLuck();

    document.getElementById('rank-name').innerText = `${rName.toUpperCase()} ${div}`;
    document.getElementById('rank-points').innerText = Math.floor(acc.points).toLocaleString();
    document.getElementById('user-display-name').innerText = acc.name;
    
    const coinsEl = document.getElementById('coins-display');
    if (coinsEl) coinsEl.innerText = `${acc.coins.toLocaleString()} `;
    
    const luckEl = document.getElementById('luck-display');
    if (luckEl) {
        luckEl.innerHTML = `
            <div>Base: ${playerLuck.toFixed(1)}x</div>
            <div>Permanent: ${acc.permanentLuckBoost.toFixed(2)}x</div>
            <div>Max Achieved: ${(acc.maxAchievedLuck || 2.0).toFixed(2)}x</div>
            <div>Scaled Max: ${Math.min(acc.maxAchievedLuck || 2.0, settings.luckScale || 100).toFixed(2)}x</div>
            <div style="color: #22c55e;">Total: ${totalLuck.toFixed(2)}x</div>
        `;
    }
    
    const potionsEl = document.getElementById('active-potions');
    if (potionsEl) {
        const now = Date.now();
        const activePotionsList = acc.activePotions.filter(potion => now < potion.expiresAt);
        
        if (activePotionsList.length > 0) {
            potionsEl.innerHTML = activePotionsList.map(potion => {
                const timeLeft = Math.ceil((potion.expiresAt - now) / 1000);
                const item = SHOP_ITEMS[potion.type];
                return `<div style="color: #22c55e; font-size: 0.7rem;">${item.name}: ${timeLeft}s</div>`;
            }).join('');
        } else {
            potionsEl.innerHTML = '<div style="color: #94a3b8; font-size: 0.7rem;">No active potions</div>';
        }
    }
    
    const streakEl = document.getElementById('streak-count');
    streakEl.innerText = acc.streak;
    streakEl.className = getStreakClass(acc.streak);

    document.getElementById('winrate-count').innerText = Math.round(lifeWR);
    
    const bonusDisplay = document.getElementById('bonus-display');
    bonusDisplay.innerText = `MULTI: x${mult.toFixed(2)}`;
    bonusDisplay.style.color = mult >= 1 ? "#fbbf24" : "#ef4444";

    document.getElementById('current-rank-logo').className = `rank-icon rank-${rName}`;
    document.getElementById('exp-progress').style.width = (acc.points % 100) + "%";
    document.getElementById('bot-display-name').innerText = `BOT (${currentBotRank.toUpperCase()})`;
    
    save();
}

// --- CUTSCENE ENGINE ---
// ==========================================
const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function triggerRankPromotion(name) {
    if (name === "Nightmare") {
        await playNightmareCutscene(name);
    } else if (name === "Diamond") {
        await playDiamondCutscene(name);
    } else if (name === "Emerald") {
        await playEmeraldCutscene(name);
    } else {
        triggerNormalPromotion(name);
    }
}

function triggerNormalPromotion(name) {
    const overlay = document.getElementById('rank-up-overlay');
    const content = document.getElementById('rank-up-content');
    const rays = document.getElementById('rank-up-rays');
    
    document.getElementById('rank-up-name').innerText = name.toUpperCase();
    document.getElementById('rank-up-icon').className = `rank-icon rank-${name}`;
    
    content.className = '';
    void content.offsetWidth; 

    if (name === "Diamond" || name === "Emerald") {
        content.className = 'epic-glow';
        rays.style.display = 'block';
        rays.style.background = name === "Diamond" 
            ? 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(185, 242, 255, 0.1) 15deg 30deg)'
            : 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(80, 200, 120, 0.1) 15deg 30deg)';
    } else {
        content.className = 'rank-up-active';
        rays.style.display = 'none';
    }

    overlay.style.display = 'flex';
}

function drawGaplessDots(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const baseSize = 32; const step = baseSize * 0.8; 
    for(let y = -baseSize; y < canvas.height + baseSize; y += step) {
        for(let x = -baseSize; x < canvas.width + baseSize; x += step) {
            const scale = 0.5 + Math.random(); 
            const r = (baseSize * scale) / 2.5;
            const cx = x + (Math.random() * step - step/2);
            const cy = y + (Math.random() * step - step/2);
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.8)';
            ctx.fill();
        }
    }
}

async function playDiamondCutscene(name) {
    const overlay = document.getElementById('rank-up-overlay');
    const content = document.getElementById('rank-up-content');
    const rays = document.getElementById('rank-up-rays');
    
    // Setup Diamond scene - full screen
    overlay.style.display = 'flex';
    overlay.style.background = 'linear-gradient(135deg, #000428, #004e92)';
    content.style.display = 'none';
    rays.style.display = 'block';
    rays.style.background = 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(185, 242, 255, 0.2) 15deg 30deg)';
    
    // Show rank name immediately
    document.getElementById('rank-up-name').innerText = "DIAMOND";
    document.getElementById('rank-up-icon').className = 'rank-icon rank-Diamond';
    
    // Diamond special effects
    await wait(1000);
    
    // Create diamond particles
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed; width: 4px; height: 4px; background: #b9f2ff;
                border-radius: 50%; box-shadow: 0 0 10px #b9f2ff;
                left: ${Math.random() * window.innerWidth}px; top: ${Math.random() * window.innerHeight}px;
                animation: particleFall 2s ease-out forwards;
                z-index: 10000;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }, i * 50);
    }
    
    await wait(2000);
    content.style.display = 'block';
    content.className = 'epic-glow';
    content.style.animation = 'diamondShine 3s ease-in-out';
    
    await wait(3000);
    overlay.style.display = 'none';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    content.style.animation = '';
}

async function playEmeraldCutscene(name) {
    const overlay = document.getElementById('rank-up-overlay');
    const content = document.getElementById('rank-up-content');
    const rays = document.getElementById('rank-up-rays');
    
    // Setup Emerald scene - full screen
    overlay.style.display = 'flex';
    overlay.style.background = 'linear-gradient(135deg, #001a0d, #004d2e)';
    content.style.display = 'none';
    rays.style.display = 'block';
    rays.style.background = 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(80, 200, 120, 0.2) 15deg 30deg)';
    
    // Show rank name immediately
    document.getElementById('rank-up-name').innerText = "EMERALD";
    document.getElementById('rank-up-icon').className = 'rank-icon rank-Emerald';
    
    // Emerald special effects
    await wait(1000);
    
    // Create emerald energy waves
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed; width: 100px; height: 100px; border: 3px solid #32c878;
                border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%);
                animation: emeraldWave 2s ease-out forwards;
                z-index: 9999;
            `;
            document.body.appendChild(wave);
            setTimeout(() => wave.remove(), 2000);
        }, i * 300);
    }
    
    // Create emerald particles
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed; width: 6px; height: 6px; background: #32c878;
                border-radius: 50%; box-shadow: 0 0 15px #32c878;
                left: ${window.innerWidth/2 + (Math.random() - 0.5) * 200}px; 
                top: ${window.innerHeight/2 + (Math.random() - 0.5) * 200}px;
                animation: emeraldFloat 3s ease-out forwards;
                z-index: 10000;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }, i * 100);
    }
    
    await wait(2500);
    content.style.display = 'block';
    content.className = 'epic-glow';
    content.style.animation = 'emeraldPulse 2.5s ease-in-out';
    
    await wait(2500);
    overlay.style.display = 'none';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    content.style.animation = '';
}

async function playNightmareCutscene(name) {
    const seq = document.getElementById('nightmare-sequence');
    const canvas = document.getElementById('nightmare-canvas');
    const star = document.getElementById('nightmare-star');
    const wrap = document.getElementById('nightmare-text-wrap');
    const final = document.getElementById('nightmare-final-title');

    seq.style.display = 'flex'; canvas.style.opacity = '0'; star.style.display = 'none'; wrap.style.display = 'none'; final.style.display = 'none';
    await wait(1000);

    star.style.display = 'block';
    star.style.animation = 'starExponential 8s cubic-bezier(0.95, 0.05, 0.8, 0.04) forwards';
    await wait(8000);
    star.style.display = 'none';

    drawGaplessDots(canvas);
    canvas.style.opacity = '0.4'; 
    await wait(1500);

    wrap.style.display = 'flex';
    document.getElementById('nightmare-t1').style.display = 'block'; await wait(2200); document.getElementById('nightmare-t1').style.display = 'none';
    document.getElementById('nightmare-t1-5').style.display = 'block'; await wait(2500); document.getElementById('nightmare-t1-5').style.display = 'none';

    document.getElementById('strange-entity').style.display = 'block';
    document.getElementById('nightmare-t2').style.display = 'block';
    setTimeout(() => document.getElementById('nightmare-t2').style.opacity = '1', 500); 
    document.getElementById('strange-entity').style.animation = 'entityExponential 8s cubic-bezier(0.95, 0.05, 0.8, 0.04) forwards';
    await wait(5000);
    
    document.getElementById('nightmare-t2').style.opacity = '0'; await wait(1500); document.getElementById('nightmare-t2').style.display = 'none';

    document.getElementById('nightmare-t3').style.display = 'block'; setTimeout(() => document.getElementById('nightmare-t3').style.opacity = '1', 100);
    await wait(3000); document.getElementById('nightmare-t3').style.opacity = '0'; await wait(1000);

    wrap.style.display = 'none'; canvas.style.opacity = '0'; final.style.display = 'block';
    await wait(4500);

    seq.style.display = 'none'; final.style.display = 'none';
    triggerNormalPromotion(name); 
}

// ==========================================
// --- CORE GAMEPLAY ENGINE ---
// ==========================================

function queueBot() {
    const pIdx = Math.min(6, Math.floor(allAccounts[currentAccIdx].points / 400));
    const chance = Math.random();
    let bIdx = (chance < 0.7) ? pIdx : (chance < 0.85 ? Math.min(6, pIdx + 1) : Math.max(0, pIdx - 1));
    currentBotRank = ranks[bIdx];
}

function resetRound() {
    playerRoll = 0; playerRetries = godMode ? 999 : 5; isProcessing = false;
    document.getElementById('player-roll').innerHTML = `<span class="roll-value">?</span>`;
    document.getElementById('bot-roll').innerHTML = `<span class="roll-value">?</span>`;
    document.getElementById('player-retries').innerText = godMode ? "GOD MODE" : `RETRIES: ${playerRetries}`;
    
    const range = BOT_LUCK_CONFIG[currentBotRank] || [1, 2];
    const luck = botLuckOverride || (botRigged ? 1.05 : range[0] + (Math.random() * (range[1] - range[0])));
    botRoll = (1 / (Math.random() || 0.01)) * luck;
    botLuckOverride = null;
    saveMatchState();
}

function playerRollAction() {
    if (isProcessing || (playerRetries <= 0 && !godMode)) return;
    
    const acc = allAccounts[currentAccIdx];
    const totalLuck = calculateTotalLuck();
    playerRoll = (1 / (Math.random() || 0.01)) * totalLuck;
    if (!godMode) playerRetries--;

    const val = settings.roundNumbers ? Math.round(playerRoll).toLocaleString() : playerRoll.toFixed(2);
    document.getElementById('player-roll').innerHTML = `<span class="roll-value">1 in ${val}</span>`;
    document.getElementById('player-retries').innerText = godMode ? "GOD MODE" : `RETRIES: ${playerRetries}`;

    if (playerRoll > acc.pb) acc.pb = playerRoll;
    
    if (playerRoll > 5) {
        globalHighRolls.push({ name: acc.name, val: playerRoll });
        globalHighRolls.sort((a,b) => b.val - a.val);
        if (globalHighRolls.length > 15) globalHighRolls.pop();
    }
    saveMatchState();
    save();
}

function playerStandAction() {
    if (isProcessing || playerRoll === 0) return;
    isProcessing = true;
    const bVal = settings.roundNumbers ? Math.round(botRoll).toLocaleString() : botRoll.toFixed(2);
    document.getElementById('bot-roll').innerHTML = `<span class="roll-value">1 in ${bVal}</span>`;

    setTimeout(() => {
        if (playerRoll > botRoll) playerSets++; else botSets++;
        updateDots(); 
        saveMatchState(); 
        save();
        if (playerSets === 3 || botSets === 3) handleMatchEnd(); else resetRound();
    }, 600);
}

function handleMatchEnd() {
    const acc = allAccounts[currentAccIdx];
    const win = playerSets === 3;
    
    if (win) { 
        acc.wins++; 
        acc.streak++; 
        if (acc.streak > acc.bestStreak) acc.bestStreak = acc.streak;
    } else { 
        acc.losses++; 
        acc.streak = 0; 
    }

    const recent = acc.history.slice(0, 20);
    const rollingWR = recent.length === 0 ? 0.5 : recent.filter(m => m.res === "WIN").length / recent.length;
    
    // --- RANK DIFFERENTIAL ELO SYSTEM ---
    const pIdx = Math.min(6, Math.floor(acc.points / 400));
    const bIdx = ranks.indexOf(currentBotRank);
    let rankMultiplier = 1.0;

    if (bIdx > pIdx) {
        // Bot is HIGHER rank
        rankMultiplier = win ? 1.5 : 0.75;
    } else if (bIdx < pIdx) {
        // Bot is LOWER rank
        rankMultiplier = win ? 0.5 : 1.5;
    }

    const baseDiff = win ? 25 : 18;
    const diff = Math.round(baseDiff * ((0.5 + rollingWR) * adminRPBonus) * rankMultiplier);

    if (win) acc.points += diff; else acc.points = Math.max(0, acc.points - diff);
    
    // Update highest RP ever if current RP is higher
    if (acc.points > acc.highestRpEver) {
        acc.highestRpEver = acc.points;
    }
    
    // Pass the calculated diff into history so logs stay perfectly accurate
    acc.history.unshift({ res: win ? "WIN" : "LOSS", score: `${playerSets}-${botSets}`, p: playerRoll, b: botRoll, diff: diff });
    if (acc.history.length > 50) acc.history.pop();

    playerSets = 0; botSets = 0;
    queueBot(); updateUI(); updateDots(); resetRound();
}

function updateDots() {
    const p = document.getElementById('player-sets'), b = document.getElementById('bot-sets');
    if (!p || !b) return;
    p.innerHTML = ""; b.innerHTML = "";
    for(let i=0; i<3; i++) {
        p.innerHTML += `<div class="dot ${i < playerSets ? 'p-win' : ''}"></div>`;
        b.innerHTML += `<div class="dot ${i < botSets ? 'b-win' : ''}"></div>`;
    }
}

function toggleModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = (m.style.display === 'none' || !m.style.display) ? 'flex' : 'none';
}

function attachListeners() {
    window.onkeydown = (e) => { 
        if(e.key.toLowerCase() === 'p' && document.activeElement.tagName !== "INPUT") {
            document.getElementById('settings-modal').style.display = 'none';
            openAdminPanel(); 
        }
    };
    document.getElementById('rank-up-overlay').onclick = () => {
        document.getElementById('rank-up-overlay').style.display = 'none';
    };
}
// --- COINS & SHOP SYSTEM ---
// ==========================================

function calculateTotalLuck() {
    const acc = allAccounts[currentAccIdx];
    let totalLuck = playerLuck * acc.permanentLuckBoost * adminRPBonus;
    
    // Apply luck scaling based on max achieved luck
    const maxAchievedLuck = acc.maxAchievedLuck || totalLuck;
    const scaledLuck = Math.min(totalLuck, Math.min(maxAchievedLuck, (settings.luckScale || 100)));
    totalLuck = scaledLuck;
    
    // Add active potion effects
    const now = Date.now();
    acc.activePotions.forEach(potion => {
        if (now < potion.expiresAt) {
            totalLuck *= potion.multiplier; 
        }
    });
    
    return totalLuck;
}

function calculateWeeklyReward(acc) {
    const rankKey = acc.weeklyRank;
    const division = acc.weeklyDivision;
    
    if (rankKey === "Nightmare") {
        // Dynamic calculation for Nightmare rank
        const baseReward = 2000000;
        const rpAbove2400 = Math.max(0, acc.points - 2400);
        const additionalReward = Math.floor(rpAbove2400 / 100) * 200000;
        return baseReward + additionalReward;
    }
    
    const rewardKey = rankKey === "Platinum" ? `${rankKey}-${division}` : rankKey;
    return WEEKLY_REWARDS[rewardKey] || 0;
}

function checkWeeklyReset() {
    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    allAccounts.forEach(acc => {
        if (now - acc.lastWeeklyReset >= weekInMs) {
            // Calculate weekly reward
            const reward = calculateWeeklyReward(acc);
            
            // Store weekly history before reset
            const weeklyEntry = {
                weekEnding: new Date(acc.lastWeeklyReset + weekInMs).toISOString(),
                rank: acc.weeklyRank,
                division: acc.weeklyDivision,
                coinsEarned: reward,
                bestRank: acc.weeklyRank, // Will be updated below
                bestDivision: acc.weeklyDivision,
                highestRpThisWeek: acc.points // Track highest RP this week
            };
            
            // Find best rank achieved during the week
            const currentRankIdx = Math.min(6, Math.floor(acc.points / 400));
            const currentRank = ranks[currentRankIdx];
            const currentDivision = Math.floor((acc.points % 400) / 100) + 1;
            
            weeklyEntry.bestRank = currentRank;
            weeklyEntry.bestDivision = currentDivision;
            
            // Update highest RP ever if current RP is higher
            if (acc.points > acc.highestRpEver) {
                acc.highestRpEver = acc.points;
            }
            
            // Add to history (keep only last 20 weeks)
            acc.weeklyHistory.unshift(weeklyEntry);
            if (acc.weeklyHistory.length > 20) {
                acc.weeklyHistory = acc.weeklyHistory.slice(0, 20);
            }
            
            acc.coins += reward;
            
            // Reset weekly stats
            acc.weeklyRank = currentRank;
            acc.weeklyDivision = currentDivision;
            acc.lastWeeklyReset = now;
            
            // Show reward notification
            if (acc === allAccounts[currentAccIdx]) {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #fbbf24, #f59e0b);
                    color: #000; padding: 15px 20px; border-radius: 10px; font-weight: bold; z-index: 10000;
                    box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3); animation: slideIn 0.5s ease-out;
                `;
                notification.innerHTML = `🎁 Weekly Reward: ${reward.toLocaleString()} coins!`;
                document.body.appendChild(notification);
                
                setTimeout(() => notification.remove(), 5000);
            }
        }
    });
}

function startPotionTimerManager() {
    setInterval(() => {
        const now = Date.now();
        // ... (rest of the code remains the same)
        const acc = allAccounts[currentAccIdx];
        
        // Remove expired potions
        acc.activePotions = acc.activePotions.filter(potion => now < potion.expiresAt);
        
        // Update UI if potions changed
        updateUI();
    }, 1000);
}

function buyItem(itemKey) {
    const acc = allAccounts[currentAccIdx];
    const item = SHOP_ITEMS[itemKey];
    
    if (!item) return false;
    
    if (acc.coins < item.cost) {
        showNotification("Not enough coins!", "error");
        return false;
    }
    
    acc.coins -= item.cost;
    
    if (item.type === "permanent") {
        if (itemKey === "permanentCoinBoost") {
            acc.permanentCoinBoost *= item.coinMultiplier;
            showNotification(`Permanent coin boost increased to ${acc.permanentCoinBoost.toFixed(2)}x!`, "success");
        } else {
            acc.permanentLuckBoost *= item.luckMultiplier;
            showNotification(`Permanent luck boost increased to ${acc.permanentLuckBoost.toFixed(2)}x!`, "success");
        }
    } else if (item.type === "consumable") {
        acc.inventory[itemKey] = (acc.inventory[itemKey] || 0) + 1;
        showNotification(`Purchased ${item.name}!`, "success");
    }
    
    save();
    updateUI();
    return true;
}

function usePotion(potionKey) {
    const acc = allAccounts[currentAccIdx];
    const item = SHOP_ITEMS[potionKey];
    
    if (!item || item.type !== "consumable") return false;
    
    if (acc.inventory[potionKey] <= 0) {
        showNotification("No potions available!", "error");
        return false;
    }
    
    acc.inventory[potionKey]--;
    
    if (item.singleUse) {
        // Heavenly dice - apply luck multiplier for this roll only
        const originalLuck = playerLuck;
        const originalTotalLuck = calculateTotalLuck();
        playerLuck *= item.luckMultiplier;
        showNotification(`Used ${item.name}! ${item.luckMultiplier}x luck for this roll!`, "success");
        
        // Reset luck after roll
        setTimeout(() => {
            playerLuck = originalLuck;
            updateUI();
        }, 1500);
    } else {
        // Regular potions
        const activePotion = {
            type: potionKey,
            multiplier: item.luckMultiplier,
            expiresAt: Date.now() + item.duration
        };
        
        acc.activePotions.push(activePotion);
        showNotification(`Used ${item.name}! ${item.luckMultiplier}x luck for 5 minutes!`, "success");
    }
    
    save();
    updateUI();
    return true;
}

function showNotification(message, type = "info") {
    const colors = {
        success: "#22c55e",
        error: "#ef4444",
        info: "#3b82f6"
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${colors[type]};
        color: #fff; padding: 15px 20px; border-radius: 10px; font-weight: bold; z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); animation: slideIn 0.5s ease-out;
    `;
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function transferCoins(targetAccIdx, amount) {
    const sourceAcc = allAccounts[currentAccIdx];
    const targetAcc = allAccounts[targetAccIdx];
    
    if (!targetAcc || targetAccIdx === currentAccIdx) return false;
    if (sourceAcc.coins < amount) {
        showNotification("Insufficient coins for transfer!", "error");
        return false;
    }
    
    sourceAcc.coins -= amount;
    targetAcc.coins += amount;
    
    showNotification(`Transferred ${amount.toLocaleString()} coins to ${targetAcc.name}!`, "success");
    save();
    updateUI();
    return true;
}

// ==========================================
// --- ADMIN & MANAGEMENT ---
// ==========================================

window.openAdminPanel = () => {
    if (prompt("PASS:") === "admin123") {
        document.getElementById('admin-luck-input').value = playerLuck;
        document.getElementById('admin-rp-bonus-input').value = adminRPBonus;
        toggleModal('admin-modal');
    }
};

window.applyAdminChanges = () => {
    playerLuck = parseFloat(document.getElementById('admin-luck-input').value) || 2.0;
    adminRPBonus = parseFloat(document.getElementById('admin-rp-bonus-input').value) || 1.0;
    
    const rpIn = document.getElementById('admin-rp-input').value;
    if (rpIn !== "") { allAccounts[currentAccIdx].points = parseInt(rpIn); document.getElementById('admin-rp-input').value = ""; }

    const streakIn = document.getElementById('admin-streak-input').value;
    if (streakIn !== "") { 
        allAccounts[currentAccIdx].streak = parseInt(streakIn); 
        if(allAccounts[currentAccIdx].streak > allAccounts[currentAccIdx].bestStreak) allAccounts[currentAccIdx].bestStreak = allAccounts[currentAccIdx].streak;
        document.getElementById('admin-streak-input').value = ""; 
    }
    
    const coinsIn = document.getElementById('admin-coins-input').value;
    if (coinsIn !== "") { 
        allAccounts[currentAccIdx].coins = parseInt(coinsIn); 
        document.getElementById('admin-coins-input').value = ""; 
    }
    
    const botLuckIn = document.getElementById('admin-bot-luck-input').value;
    if (botLuckIn !== "") { botLuckOverride = parseFloat(botLuckIn); document.getElementById('admin-bot-luck-input').value = ""; }
    
    playerSets = 0; botSets = 0; queueBot(); updateUI(); updateDots(); resetRound(); toggleModal('admin-modal');
};

window.resetAdminSettings = () => {
    if(confirm("Reset all admin settings to default?")) {
        playerLuck = 2.0; adminRPBonus = 1.0; godMode = false; botRigged = false; botLuckOverride = null;
        document.getElementById('admin-luck-input').value = 2.0;
        document.getElementById('admin-rp-bonus-input').value = 1.0;
        document.getElementById('god-mode-btn').innerText = `GOD MODE: OFF`;
        document.getElementById('rig-bot-btn').innerText = `RIG BOT: OFF`;
        save(); alert("Defaults Restored.");
    }
};

window.adminAction = (t) => {
    if(t === 'instaWin') { playerSets = 3; handleMatchEnd(); }
    if(t === 'godMode') { godMode = !godMode; document.getElementById('god-mode-btn').innerText = `GOD: ${godMode?'ON':'OFF'}`; resetRound(); }
    if(t === 'rigBot') { botRigged = !botRigged; document.getElementById('rig-bot-btn').innerText = `RIG: ${botRigged?'ON':'OFF'}`; resetRound(); }
    if(t === 'clearHistory') { allAccounts[currentAccIdx].history = []; updateUI(); alert("Logs Cleared."); }
};

window.openHighRolls = () => {
    const list = document.getElementById('high-rolls-list');
    list.innerHTML = globalHighRolls.map((r, i) => `
        <div class="high-roll-item"><span><b style="color:#64748b; margin-right:8px;">#${i+1}</b> ${r.name}</span><b style="color:#fbbf24">1 in ${settings.roundNumbers ? Math.round(r.val).toLocaleString() : r.val.toFixed(1)}</b></div>`).join('') || "<p style='text-align:center; opacity:0.5; padding:20px;'>No records.</p>";
    toggleModal('high-rolls-modal');
};

window.openHistory = () => {
    const acc = allAccounts[currentAccIdx];
    document.getElementById('history-list').innerHTML = acc.history.map(h => `
        <div class="acc-item ${h.res === 'WIN' ? 'log-entry-win' : 'log-entry-loss'}" style="background:#1e293b; padding:12px; margin-bottom:8px; border-radius:8px;">
            <div style="display:flex; justify-content:space-between;"><b class="${h.res === 'WIN' ? 'log-text-win' : 'log-text-loss'}">${h.res} (${h.score})</b><span class="${h.res === 'WIN' ? 'log-text-win' : 'log-text-loss'}">${h.res === 'WIN' ? '+' : '-'}${h.diff || 25} RP</span></div>
            <div style="font-size:0.7rem; color:#94a3b8; margin-top:5px;">Roll: 1 in ${h.p.toFixed(1)} vs 1 in ${h.b.toFixed(1)}</div>
        </div>
    `).join('') || "<p style='text-align:center; opacity:0.5; padding:20px;'>No logs found.</p>";
    toggleModal('history-modal');
};

window.openStats = () => {
    const acc = allAccounts[currentAccIdx];
    const now = Date.now();
    const weekInMs = 7 * 24 * 60 * 60 * 1000;
    const nextReset = acc.lastWeeklyReset + weekInMs;
    const timeUntilReset = nextReset - now;
    const daysUntilReset = Math.floor(timeUntilReset / (24 * 60 * 60 * 1000));
    const hoursUntilReset = Math.floor((timeUntilReset % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    
    const currentRankIdx = Math.min(6, Math.floor(acc.points / 400));
    const currentRank = ranks[currentRankIdx];
    const currentDivision = Math.floor((acc.points % 400) / 100) + 1;
    const lifeWR = (acc.wins + acc.losses === 0) ? 0 : (acc.wins / (acc.wins + acc.losses)) * 100;
    const highestRP = Math.max(acc.points, acc.highestRP || 0);
    
    const weeklyHistoryHTML = acc.weeklyHistory.map((week, i) => {
        const weekDate = new Date(week.weekEnding);
        const dateStr = weekDate.toLocaleDateString();
        
        return `
            <div style="padding:12px; background:#1e293b; margin-bottom:8px; border-radius:8px; border-left: 3px solid #22c55e;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="color:#94a3b8; font-size:0.8rem;">Week ending ${dateStr}</span>
                    <span style="color:#fbbf24; font-weight:bold;">${week.coinsEarned.toLocaleString()} </span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <div>
                        <span style="color:#fff;">Ended: ${week.rank} ${week.division}</span>
                        ${week.bestRank !== week.rank || week.bestDivision !== week.division ? 
                            `<span style="color:#22c55e; margin-left:10px;">Best: ${week.bestRank} ${week.bestDivision}</span>` : ''}
                    </div>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <div>
                        <span style="color:#94a3b8; font-size:0.8rem;">Highest RP: </span>
                        <span style="color:#fbbf24; font-weight:bold; font-size:0.8rem;">${Math.floor(week.highestRpThisWeek || 0).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('') || '<p style="text-align:center; opacity:0.5; padding:20px;">No weekly history available yet</p>';
    
    const statsHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
            <div style="background:#1e293b; padding:15px; border-radius:10px;">
                <h4 style="margin:0 0 10px 0; color:#fbbf24;"> Current Stats</h4>
                <div style="font-size:0.9rem; line-height:1.6;">
                    <div>Rank: <span style="color:#fff; font-weight:bold;">${currentRank} ${currentDivision}</span></div>
                    <div>RP: <span style="color:#fff; font-weight:bold;">${Math.floor(acc.points).toLocaleString()}</span></div>
                    <div>Highest RP: <span style="color:#fbbf24; font-weight:bold;">${Math.floor(acc.highestRpEver || 0).toLocaleString()}</span></div>
                    <div>Coins: <span style="color:#fbbf24; font-weight:bold;">${acc.coins.toLocaleString()} </span></div>
                    <div>Win Rate: <span style="color:#fff; font-weight:bold;">${lifeWR.toFixed(1)}%</span></div>
                    <div>Streak: <span style="color:#fff; font-weight:bold;">${acc.streak} </span></div>
                    <div>Best Streak: <span style="color:#fff; font-weight:bold;">${acc.bestStreak} </span></div>
                </div>
            </div>
            
            <div style="background:#1e293b; padding:15px; border-radius:10px;">
                <h4 style="margin:0 0 10px 0; color:#fbbf24;"> Weekly Reset</h4>
                <div style="font-size:0.9rem; line-height:1.6;">
                    <div>Next Reset: <span style="color:#fff; font-weight:bold;">${daysUntilReset}d ${hoursUntilReset}h</span></div>
                    <div>Current Week Rank: <span style="color:#fff; font-weight:bold;">${acc.weeklyRank} ${acc.weeklyDivision}</span></div>
                    <div>Expected Reward: <span style="color:#22c55e; font-weight:bold;">${calculateWeeklyReward(acc).toLocaleString()} </span></div>
                    <div>Total Luck: <span style="color:#fff; font-weight:bold;">${calculateTotalLuck().toFixed(2)}x</span></div>
                    <div>Permanent Boost: <span style="color:#fff; font-weight:bold;">${acc.permanentLuckBoost.toFixed(2)}x</span></div>
                </div>
            </div>
        </div>
        
        <div style="background:#1e293b; padding:15px; border-radius:10px; margin-bottom:20px;">
            <h4 style="margin:0 0 15px 0; color:#fbbf24;"> Career Stats</h4>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; text-align:center;">
                <div>
                    <div style="font-size:1.5rem; font-weight:bold; color:#22c55e;">${acc.wins}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">Wins</div>
                </div>
                <div>
                    <div style="font-size:1.5rem; font-weight:bold; color:#ef4444;">${acc.losses}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">Losses</div>
                </div>
                <div>
                    <div style="font-size:1.5rem; font-weight:bold; color:#fbbf24;">${acc.pb.toFixed(1)}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">Best Roll</div>
                </div>
                <div>
                    <div style="font-size:1.5rem; font-weight:bold; color:#3b82f6;">${acc.weeklyHistory.length}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">Weeks Played</div>
                </div>
            </div>
        </div>
        
        <div style="background:#1e293b; padding:15px; border-radius:10px;">
            <h4 style="margin:0 0 15px 0; color:#fbbf24;">📅 Weekly History</h4>
            ${weeklyHistoryHTML}
        </div>
    `;
    
    document.getElementById('stats-list').innerHTML = statsHTML;
    toggleModal('stats-modal');
};

window.openLeaderboard = () => {
    let sorted = [...allAccounts].sort((a,b) => b.points - a.points);
    document.getElementById('leaderboard-list').innerHTML = sorted.map((a, i) => `
        <div style="padding:12px; background:#1e293b; margin-bottom:5px; border-radius:8px; display:flex; justify-content:space-between;"><span><b style="color:#ef4444; margin-right:8px;">#${i+1}</b> ${a.name}</span><b>${Math.floor(a.points).toLocaleString()} RP</b></div>
    `).join('');
    toggleModal('leaderboard-modal');
};

window.openStreakBoard = () => {
    let sorted = [...allAccounts].sort((a,b) => b.bestStreak - a.bestStreak);
    document.getElementById('streak-list').innerHTML = sorted.map((a, i) => `
        <div style="padding:12px; background:#1e293b; margin-bottom:5px; border-radius:8px; display:flex; justify-content:space-between;">
            <span><b style="color:#fbbf24; margin-right:8px;">#${i+1}</b> ${a.name}</span>
            <b class="${getStreakClass(a.bestStreak)}">🔥 ${a.bestStreak} WINS</b>
        </div>
    `).join('');
    toggleModal('streak-modal');
};

window.openShop = () => {
    const acc = allAccounts[currentAccIdx];
    const shopList = document.getElementById('shop-list');
    
    shopList.innerHTML = Object.entries(SHOP_ITEMS).map(([key, item]) => {
        const canAfford = acc.coins >= item.cost;
        const owned = item.type === "consumable" ? acc.inventory[key] || 0 : "N/A";
        
        let description = "";
        if (key === "permanentCoinBoost") {
            description = "Permanent 1.1x coin multiplier";
        } else if (key === "heavenlyDice") {
            description = "100x luck for one roll";
        } else {
            description = `${item.luckMultiplier}x luck multiplier`;
        }
        
        return `
            <div class="shop-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:10px; border: 2px solid ${canAfford ? '#22c55e' : '#374151'}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h4 style="margin:0; color:#fff;">${item.name}</h4>
                    <span style="color:#fbbf24; font-weight:bold;">${item.cost.toLocaleString()} coins</span>
                </div>
                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">
                    ${item.type === "permanent" ? "Permanent boost" : item.singleUse ? "Single use" : "5 minutes duration"}<br>
                    ${description}
                </div>
                ${item.type === "consumable" ? `<div style="font-size:0.7rem; color:#64748b;">Owned: ${owned}</div>` : ''}
                <button onclick="buyItem('${key}')" class="btn-primary" style="margin-top:10px; ${!canAfford ? 'opacity:0.5; cursor:not-allowed;' : ''}">
                    ${canAfford ? 'BUY' : 'INSUFFICIENT COINS'}
                </button>
            </div>
        `;
    }).join('');
    
    toggleModal('shop-modal');
};

window.openInventory = () => {
    const acc = allAccounts[currentAccIdx];
    const inventoryList = document.getElementById('inventory-list');
    
    const potions = ['luckyPotion1', 'luckyPotion2', 'luckyPotion3', 'heavenlyDice'];
    const inventoryHTML = potions.map(key => {
        const item = SHOP_ITEMS[key];
        const count = acc.inventory[key] || 0;
        
        if (key === 'heavenlyDice') {
            return `
                <div class="inventory-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4 style="margin:0; color:#fff;">${item.name}</h4>
                        <div style="font-size:0.8rem; color:#94a3b8;">100x luck for one roll</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="color:#fbbf24; font-weight:bold;">x${count}</span>
                        <button onclick="usePotion('${key}')" class="btn-primary" ${count === 0 ? 'disabled style="opacity:0.5;"' : ''}>
                            USE
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="inventory-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h4 style="margin:0; color:#fff;">${item.name}</h4>
                        <div style="font-size:0.8rem; color:#94a3b8;">${item.luckMultiplier}x luck multiplier</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="color:#fbbf24; font-weight:bold;">x${count}</span>
                        <button onclick="usePotion('${key}')" class="btn-primary" ${count === 0 ? 'disabled style="opacity:0.5;"' : ''}>
                            USE
                        </button>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    inventoryList.innerHTML = inventoryHTML || '<p style="text-align:center; opacity:0.5; padding:20px;">No items in inventory</p>';
    toggleModal('inventory-modal');
};

window.openTransfer = () => {
    const acc = allAccounts[currentAccIdx];
    const transferList = document.getElementById('transfer-list');
    
    transferList.innerHTML = allAccounts.map((targetAcc, i) => {
        if (i === currentAccIdx) return '';
        
        return `
            <div class="transfer-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h4 style="margin:0; color:#fff;">${targetAcc.name}</h4>
                    <span style="color:#fbbf24;">${targetAcc.coins.toLocaleString()} </span>
                </div>
                <div style="display:flex; gap:10px;">
                    <input type="number" id="transfer-amount-${i}" placeholder="Amount" min="1" max="${acc.coins}" 
                           style="flex:1; background:#000; border:1px solid #374151; color:#fff; padding:8px; border-radius:5px;">
                    <button onclick="transferCoins(${i}, parseInt(document.getElementById('transfer-amount-${i}').value) || 0)" 
                            class="btn-primary">TRANSFER</button>
                </div>
            </div>
        `;
    }).join('');
    
    toggleModal('transfer-modal');
};

window.switchAcc = (i) => { 
    currentAccIdx = i; lastRankIdx = Math.floor(allAccounts[i].points / 400); 
    playerSets = 0; botSets = 0; queueBot(); updateUI(); resetRound(); updateDots(); toggleModal('acc-modal'); 
};

window.deleteAcc = (i) => { if(allAccounts.length > 1 && confirm("Delete profile?")) { allAccounts.splice(i,1); currentAccIdx = 0; updateUI(); renderAccounts(); }};

window.createNewAccount = () => {
    const nameInput = document.getElementById('new-acc-name');
    const name = nameInput.value.trim();
    if (name.length < 1) {
        showNotification("Name must be at least 1 character!", "error");
        return;
    }
    
    const newAcc = {
        name: name.substring(0, 12),
        points: 0,
        streak: 0,
        bestStreak: 0,
        wins: 0,
        losses: 0,
        history: [],
        pb: 0,
        coins: 0, // Start with 0 coins
        permanentLuckBoost: 1.0,
        permanentCoinBoost: 1.0,
        maxAchievedLuck: 2.0,
        inventory: {
            luckyPotion1: 0,
            luckyPotion2: 0,
            luckyPotion3: 0,
            heavenlyDice: 0
        },
        activePotions: [],
        weeklyRank: "Bronze",
        weeklyDivision: 1,
        lastWeeklyReset: Date.now(),
        weeklyHistory: [], // Track weekly rank endings and rewards
        highestRpEver: 0 // Track highest RP ever reached
    };
    
    allAccounts.push(newAcc);
    nameInput.value = '';
    renderAccounts();
    save();
    showNotification(`Profile "${name}" created!`, "success");
};

function renderAccounts() {
    document.getElementById('acc-list').innerHTML = allAccounts.map((a, i) => `
        <div class="acc-item" style="display:flex; align-items:center; background:#1e293b; margin-bottom:8px; border-radius:10px; border-left: 4px solid ${i === currentAccIdx ? '#ef4444' : 'transparent'}">
            <div onclick="switchAcc(${i})" style="flex:1; padding:12px; cursor:pointer;"><div style="font-weight:900;">${a.name}</div><div style="font-size:0.7rem; opacity:0.6;">${Math.floor(a.points)} RP</div></div>
            <button onclick="deleteAcc(${i})" style="padding:15px; background:none; border:none; color:#ef4444;">✕</button>
        </div>`).join('');
    
    // Always render accounts when modal opens
    save();
}

window.editName = () => { let n = prompt("Identity Update:", allAccounts[currentAccIdx].name); if(n && n.trim().length > 0) { allAccounts[currentAccIdx].name = n.trim().substring(0, 12); updateUI(); }};
window.updateSettings = () => { settings.roundNumbers = document.getElementById('round-toggle').checked; save(); updateUI(); };
window.updateLuckScaling = () => {
    const slider = document.getElementById('luck-scale-slider');
    const valueDisplay = document.getElementById('luck-scale-value');
    const scaleValue = parseInt(slider.value);
    
    settings.luckScale = scaleValue;
    valueDisplay.innerText = `${scaleValue}x`;
    
    // Update max luck display in UI
    const acc = allAccounts[currentAccIdx];
    const baseLuck = playerLuck * acc.permanentLuckBoost;
    const maxAchievedLuck = Math.max(baseLuck, acc.maxAchievedLuck || baseLuck);
    const scaledMax = Math.min(maxAchievedLuck, scaleValue);
    
    // Store max achieved luck
    if (baseLuck > (acc.maxAchievedLuck || 0)) {
        acc.maxAchievedLuck = baseLuck;
    }
    
    const luckEl = document.getElementById('luck-display');
    if (luckEl) {
        luckEl.innerHTML = `
            <div>Base: ${playerLuck.toFixed(1)}x</div>
            <div>Permanent: ${acc.permanentLuckBoost.toFixed(2)}x</div>
            <div>Max Achieved: ${(acc.maxAchievedLuck || baseLuck).toFixed(2)}x</div>
            <div>Scaled Max: ${scaledMax.toFixed(2)}x</div>
            <div style="color: #22c55e;">Total: ${calculateTotalLuck().toFixed(2)}x</div>
        `;
    }
    
    save();
    updateUI();
};

window.openRankRewards = () => {
    const rewardsHTML = Object.entries(WEEKLY_REWARDS).map(([rankKey, reward]) => {
        if (rankKey === "Nightmare") {
            return `
                <div style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:8px; border-left: 3px solid #ef4444;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <h4 style="margin:0; color:#ef4444;">${rankKey.toUpperCase()}</h4>
                        <span style="color:#fbbf24; font-weight:bold;">DYNAMIC</span>
                    </div>
                    <div style="font-size:0.9rem; color:#94a3b8; line-height:1.4;">
                        Base: 2,000,000 coins<br>
                        + 200,000 per 100 RP above 2400 RP
                    </div>
                </div>
            `;
        }
        
        return `
            <div style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:8px; border-left: 3px solid #22c55e;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h4 style="margin:0; color:#fff;">${rankKey.toUpperCase()}</h4>
                    <span style="color:#fbbf24; font-weight:bold;">${reward.toLocaleString()} </span>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('rank-rewards-list').innerHTML = rewardsHTML;
    toggleModal('rank-rewards-modal');
};

window.wipeData = () => { 
    if(confirm("Wipe all data? This will fix corrupted saves!")) { 
        // Clear all specific localStorage keys
        localStorage.removeItem('crimson_accounts');
        localStorage.removeItem('crimson_global_highs');
        localStorage.removeItem('crimson_current_acc');
        localStorage.removeItem('crimson_settings');
        localStorage.removeItem('crimson_admin_persist');
        localStorage.removeItem('crimson_match_state');
        // Clear global high rolls from memory
        globalHighRolls = [];
        // Clear any other potential keys
        localStorage.clear();
        // Force reload to reset everything
        setTimeout(() => {
            location.reload(); 
        }, 100);
    }
};

window.debugReset = () => {
    if(confirm("Debug reset? This will give you test coins and fix data issues!")) {
        localStorage.clear();
        location.reload();
    }
};
window.onload = init;
