/**
 * CRIMSON RNG: ELITE 
 * UPDATE: ELO RANK DIFFERENTIAL SYSTEM
 */

const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Emerald", "Nightmare"];
const BOT_LUCK_CONFIG = {
    "Bronze": [1.0, 1.8], "Silver": [1.9, 2.4], "Gold": [2.5, 3.8],
    "Platinum": [4.5, 8.0], "Diamond": [10.0, 20.0], "Emerald": [25.0, 55.0], "Nightmare": [80.0, 300.0]
};

// ==========================================
// BADGE SYSTEM
// ==========================================
const BADGE_DEFINITIONS = {
    rank_bronze:    { name: 'Bronze Born',         desc: 'Reached Bronze rank',                  stars: 1, icon: '🥉', cat: 'Rank' },
    rank_silver:    { name: 'Silver Strider',      desc: 'Reached Silver rank',                  stars: 1, icon: '🥈', cat: 'Rank' },
    rank_gold:      { name: 'Golden Touch',        desc: 'Reached Gold rank',                    stars: 2, icon: '🥇', cat: 'Rank' },
    rank_platinum:  { name: 'Platinum Peak',       desc: 'Reached Platinum rank',                stars: 2, icon: '💿', cat: 'Rank' },
    rank_diamond:   { name: 'Diamond Edge',        desc: 'Reached Diamond rank',                 stars: 3, icon: '💎', cat: 'Rank' },
    rank_emerald:   { name: 'Emerald Ascent',      desc: 'Reached Emerald rank',                 stars: 4, icon: '🌿', cat: 'Rank' },
    rank_nightmare: { name: 'Nightmare Incarnate', desc: 'Reached Nightmare rank',               stars: 5, icon: '💀', cat: 'Rank' },
    streak_10:      { name: 'On Fire',             desc: '10 win streak achieved',               stars: 1, icon: '🔥', cat: 'Streak' },
    streak_20:      { name: 'Unstoppable',         desc: '20 win streak achieved',               stars: 1, icon: '🔥', cat: 'Streak' },
    streak_30:      { name: 'Relentless',          desc: '30 win streak achieved',               stars: 2, icon: '⚡', cat: 'Streak' },
    streak_40:      { name: 'Dominant',            desc: '40 win streak achieved',               stars: 2, icon: '⚡', cat: 'Streak' },
    streak_50:      { name: 'Half Century',        desc: '50 win streak achieved',               stars: 3, icon: '🌟', cat: 'Streak' },
    streak_60:      { name: 'Sixty Slayer',        desc: '60 win streak achieved',               stars: 3, icon: '🌟', cat: 'Streak' },
    streak_70:      { name: 'Seventy Strong',      desc: '70 win streak achieved',               stars: 4, icon: '👑', cat: 'Streak' },
    streak_80:      { name: 'Eighty Elite',        desc: '80 win streak achieved',               stars: 4, icon: '👑', cat: 'Streak' },
    streak_90:      { name: 'Near Perfect',        desc: '90 win streak achieved',               stars: 5, icon: '🏆', cat: 'Streak' },
    streak_100:     { name: 'The Streak',          desc: '100 win streak achieved',              stars: 5, icon: '🏆', cat: 'Streak' },
    coins_1k:       { name: 'First Thousand',      desc: 'Accumulated 1,000 coins across all accounts',         stars: 1, icon: '💰', cat: 'Coins' },
    coins_10k:      { name: 'Ten Grand',           desc: 'Accumulated 10,000 coins across all accounts',        stars: 1, icon: '💰', cat: 'Coins' },
    coins_100k:     { name: 'Six Figures',         desc: 'Accumulated 100,000 coins across all accounts',       stars: 2, icon: '💰', cat: 'Coins' },
    coins_1m:       { name: 'Millionaire',         desc: 'Accumulated 1,000,000 coins across all accounts',     stars: 3, icon: '💎', cat: 'Coins' },
    coins_10m:      { name: 'Ten Million',         desc: 'Accumulated 10,000,000 coins across all accounts',    stars: 4, icon: '💎', cat: 'Coins' },
    coins_1b:       { name: 'Billionaire',         desc: 'Accumulated 1,000,000,000 coins across all accounts', stars: 5, icon: '🏦', cat: 'Coins' },
    void_signal:        { name: 'Static in the Dark',    desc: 'Received a void transmission',                       stars: 7, icon: '📡', cat: 'Secret' },
    null_ascension:     { name: '∅',                    desc: 'You found what was not meant to be found.',           stars: 10, icon: '∅', cat: 'Secret' },
    nullified_protocol: { name: 'NULLIFIED',       desc: 'You spoke the word that ended you.',          stars: 6,  icon: '⛔', cat: 'Secret' },
    orb_seeker:         { name: 'THE SIGNAL',      desc: 'something watched you find it.',              stars: 5,  icon: '◈',  cat: 'Secret' },
    vault_found:        { name: 'VAULTED',          desc: 'you named the unnamed.',                      stars: 7,  icon: '⬡',  cat: 'Secret' },
    escape_reality:     { name: 'ESCAPE REALITY',  desc: 'you found the exit.',                         stars: 9,  icon: '✦',  cat: 'Secret' },
    act1_witness:       { name: 'FIRST LOG',       desc: 'you witnessed something that should not exist.', stars: 6,  icon: '▓',    cat: 'Secret' },
    act2_witness:       { name: 'SECOND LOG',      desc: 'you went deeper when you should have stopped.', stars: 7,  icon: '▓▓',   cat: 'Secret' },
    act3_witness:       { name: 'THIRD LOG',       desc: 'you are still reading.',                        stars: 8,  icon: '▓▓▓',  cat: 'Secret' },
    act4_witness:       { name: 'FOURTH LOG',      desc: 'you cannot stop now.',                          stars: 9,  icon: '▓▓▓▓', cat: 'Secret' },
    act5_witness:       { name: 'FINAL LOG',       desc: 'it knows you.',                                 stars: 10, icon: '░',    cat: 'Secret' },
    act6_witness:       { name: 'THE MEETING',     desc: 'you met it. it was always you.',                stars: 10, icon: '◈',    cat: 'Secret' },
    what:               { name: '?',               desc: 'you watched everything. now you know.',          stars: 10, icon: '?',    cat: 'Secret' },
    end_dimension:      { name: 'THE END DIMENSION', desc: 'you were always going here.',                   stars: 10, icon: '\u221e', cat: 'Secret' },
    gamble_plinko:   { name: 'Drop Artist',   desc: 'Played Plinko for the first time.',        stars: 2, icon: '\u25ce', cat: 'Gambling' },
    gamble_slots:    { name: 'One Armed',      desc: 'Played Slots for the first time.',         stars: 2, icon: '\u25c6', cat: 'Gambling' },
    gamble_bj:       { name: 'Card Sharp',     desc: 'Played Blackjack for the first time.',     stars: 2, icon: '\u2660', cat: 'Gambling' },
    gamble_roulette: { name: 'Wheel Watcher',  desc: 'Played Roulette for the first time.',      stars: 2, icon: '\u25ce', cat: 'Gambling' },
    gamble_all:      { name: 'Full House',      desc: 'Played every gambling mode.',              stars: 3, icon: '\ud83c\udfb2', cat: 'Gambling' },
    gamble_win:      { name: 'House Beater',   desc: 'Won a gambling game.',                     stars: 2, icon: '\ud83d\udcb8', cat: 'Gambling' },
    gamble_loss:     { name: 'Bad Beat',       desc: 'Lost a gambling game.',                    stars: 1, icon: '\ud83d\udca3', cat: 'Gambling' },
};

let globalBadges = JSON.parse(localStorage.getItem('crimson_badges') || '[]');
let _badgeSilent = false;
const STAR_COLORS = ['','#64748b','#22c55e','#3b82f6','#a855f7','#fbbf24','#f97316','#dc2626','#9f1239','#450a0a','#1a0a0a'];

function earnBadge(id) {
    if (!BADGE_DEFINITIONS[id] || globalBadges.includes(id)) return;
    globalBadges.push(id);
    localStorage.setItem('crimson_badges', JSON.stringify(globalBadges));
    if (!_badgeSilent) {
        const b = BADGE_DEFINITIONS[id];
        showNotification(`\uD83C\uDFC5 Badge Unlocked: ${b.name} ${'\u2605'.repeat(b.stars)}`, 'success');
    }
    BG_CATALOG.forEach(bg => { if (bg.secretBadge === id) _grantSecretBg(bg.id); });
    updateSettingsOrbRow();
    updateVaultHint();
    if (id !== 'end_dimension') checkEndDimension();
}

function _grantSecretBg(bgId) {
    allAccounts.forEach(acc => {
        if (!acc.ownedBgs) acc.ownedBgs = [];
        if (!acc.ownedBgs.includes(bgId)) acc.ownedBgs.push(bgId);
    });
    save();
}

function checkCoinBadges() {
    const total = allAccounts.reduce((s, a) => s + (a.coins || 0), 0);
    if (total >= 1000)       earnBadge('coins_1k');
    if (total >= 10000)      earnBadge('coins_10k');
    if (total >= 100000)     earnBadge('coins_100k');
    if (total >= 1000000)    earnBadge('coins_1m');
    if (total >= 10000000)   earnBadge('coins_10m');
    if (total >= 1000000000) earnBadge('coins_1b');
}

let _gambleStats = JSON.parse(localStorage.getItem('crimson_gamble_stats') || '{"played":[],"wins":0,"losses":0}');
function _saveGambleStats(){localStorage.setItem('crimson_gamble_stats',JSON.stringify(_gambleStats));}
function _recordGamble(mode,won,lost){
    if(!_gambleStats.played.includes(mode))_gambleStats.played.push(mode);
    if(won)_gambleStats.wins++;
    else if(lost)_gambleStats.losses++;
    _saveGambleStats();checkGamblingBadges();
}
function checkGamblingBadges(){
    const p=_gambleStats.played;
    if(p.includes('plinko'))   earnBadge('gamble_plinko');
    if(p.includes('slots'))    earnBadge('gamble_slots');
    if(p.includes('blackjack'))earnBadge('gamble_bj');
    if(p.includes('roulette')) earnBadge('gamble_roulette');
    if(['plinko','slots','blackjack','roulette'].every(m=>p.includes(m)))earnBadge('gamble_all');
    if(_gambleStats.wins>0)  earnBadge('gamble_win');
    if(_gambleStats.losses>0)earnBadge('gamble_loss');
}

function checkAllBadges() {
    _badgeSilent = true;
    const rankKeys = ['bronze','silver','gold','platinum','diamond','emerald','nightmare'];
    allAccounts.forEach(acc => {
        const rIdx = Math.min(6, Math.floor(acc.points / 400));
        rankKeys.slice(0, rIdx + 1).forEach(r => earnBadge('rank_' + r));
        for (let i = 10; i <= 100; i += 10) {
            if ((acc.bestStreak || 0) >= i) earnBadge('streak_' + i);
        }
        if (acc.isNull) earnBadge('null_ascension');
    });
    checkCoinBadges();
    checkGamblingBadges();
    _badgeSilent = false;
}

// ── ESCAPE REALITY / VAULT SYSTEM ────────────────────────────────────────────
let orbState = JSON.parse(localStorage.getItem('crimson_orb') || '{"clicks":0,"done":false}');
const ORB_CLUES = [
    "reality has more layers\nthan the rules allow.",
    "some doors have names.\nsix can exist where five were the limit.\nspeak the true name.",
    "the code lives in emptiness.\nfour symbols.\neach one is nothing."
];

function initOrb() {
    if (orbState.done) return;
    const totalGames = allAccounts.reduce((s, a) => s + (a.wins || 0) + (a.losses || 0), 0);
    const el = document.getElementById('reality-orb');
    if (el && totalGames >= 10) el.style.display = 'block';
}

window.orbClick = () => {
    if (orbState.done) return;
    const idx = orbState.clicks;
    if (idx >= ORB_CLUES.length) return;
    const popup = document.getElementById('orb-popup');
    document.getElementById('orb-msg').textContent = ORB_CLUES[idx];
    popup.style.display = 'flex';
    orbState.clicks++;
    if (orbState.clicks >= ORB_CLUES.length) {
        orbState.done = true;
        setTimeout(() => { const o = document.getElementById('reality-orb'); if (o) o.style.display = 'none'; }, 600);
        earnBadge('orb_seeker');
    }
    localStorage.setItem('crimson_orb', JSON.stringify(orbState));
};

window.dismissOrbPopup = () => { document.getElementById('orb-popup').style.display = 'none'; };

window.checkVaultCode = () => {
    const input = document.getElementById('vault-code-input');
    const code = (input ? input.value : '').trim();
    const errEl = document.getElementById('vault-error');
    if (code === '4233') {
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct1Cutscene();
    } else if (code === '7341') {
        if (!globalBadges.includes('act1_witness')) {
            if (errEl) errEl.textContent = 'you are not ready.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct2Cutscene();
    } else if (code === '5509') {
        if (!globalBadges.includes('act2_witness')) {
            if (errEl) errEl.textContent = 'something is still unfinished.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct3Cutscene();
    } else if (code === '2187') {
        if (!globalBadges.includes('act3_witness')) {
            if (errEl) errEl.textContent = 'you have not gone far enough.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct4Cutscene();
    } else if (code === '6600') {
        if (!globalBadges.includes('act4_witness')) {
            if (errEl) errEl.textContent = 'you are not ready to hear it.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct5Cutscene();
    } else if (code === '3301') {
        if (!globalBadges.includes('act5_witness')) {
            if (errEl) errEl.textContent = 'the pattern has not completed.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playAct6Cutscene();
    } else if (code === '7777') {
        if (!globalBadges.includes('what')) {
            if (errEl) errEl.textContent = 'you do not hold the key.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playWhatCutscene1();
    } else if (code === '8888') {
        if (!globalBadges.includes('what')) {
            if (errEl) errEl.textContent = 'you do not hold the key.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playWhatCutscene2();
    } else if (code === '9999') {
        if (!globalBadges.includes('what')) {
            if (errEl) errEl.textContent = 'you do not hold the key.';
            if (input) input.value = '';
            return;
        }
        if (input) input.value = '';
        if (errEl) errEl.textContent = '';
        playWhatCutscene3();
    } else if (code === '0000') {
        document.getElementById('vault-screen').style.display = 'none';
        earnBadge('escape_reality');
        playEscapeRealityCutscene();
    } else {
        const msgs = [
            "that is not emptiness.",
            "the void rejects your offering.",
            "four symbols. each one must be nothing.",
            "you are not ready to escape."
        ];
        if (errEl) errEl.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        if (input) input.value = '';
    }
};

window.switchAccFromVault = () => {
    const idx = allAccounts.findIndex(a => !a.isVault);
    if (idx >= 0) {
        currentAccIdx = idx;
        lastRankIdx = Math.floor(allAccounts[idx].points / 400);
        playerSets = 0; botSets = 0;
        document.getElementById('vault-screen').style.display = 'none';
        deactivateNullEffects();
        queueBot(); updateUI(); resetRound(); updateDots();
    }
};
// ─────────────────────────────────────────────────────────────────────────────

window.openBadges = () => {
    const earnedSet = new Set(globalBadges.filter(id => BADGE_DEFINITIONS[id]));
    const hasAnySecret = Object.keys(BADGE_DEFINITIONS).some(id => BADGE_DEFINITIONS[id].cat === 'Secret' && earnedSet.has(id));
    const hasAnyGambling = Object.keys(BADGE_DEFINITIONS).some(id => BADGE_DEFINITIONS[id].cat === 'Gambling' && earnedSet.has(id));
    const catsToShow = ['Rank','Streak','Coins'];
    if (hasAnyGambling) catsToShow.push('Gambling');
    if (hasAnySecret) catsToShow.push('Secret');
    let html = '';
    catsToShow.forEach(cat => {
        const allInCat = Object.keys(BADGE_DEFINITIONS).filter(id => BADGE_DEFINITIONS[id].cat === cat);
        if (!allInCat.length) return;
        html += `<div style="font-size:0.6rem;letter-spacing:5px;color:#475569;margin:18px 0 8px 2px;">${cat.toUpperCase()}</div>`;
        allInCat.forEach(id => {
            const b = BADGE_DEFINITIONS[id];
            const isEarned = earnedSet.has(id);
            const col = STAR_COLORS[b.stars];
            const isSecret = b.cat === 'Secret';
            html += `<div style="display:flex;align-items:center;background:${isEarned ? '#1e293b' : '#0c1220'};padding:12px 15px;margin-bottom:7px;border-radius:10px;gap:14px;border-left:3px solid ${isEarned ? col : '#1e293b'};opacity:${isEarned ? '1' : '0.45'};">
                <div style="font-size:1.5rem;min-width:32px;text-align:center;">${b.icon}</div>
                <div style="flex:1;">
                    <div style="font-weight:900;font-size:0.9rem;color:${isEarned ? '#fff' : '#374151'};">${isEarned ? b.name : (isSecret ? '???' : b.name)}</div>
                    <div style="font-size:0.7rem;color:${isEarned ? '#64748b' : '#1f2937'};margin-top:3px;">${isEarned ? b.desc : '...'}</div>
                </div>
                <div style="font-size:0.95rem;color:${isEarned ? col : '#1e293b'};letter-spacing:3px;font-weight:bold;white-space:nowrap;">${'\u2605'.repeat(b.stars)}</div>
            </div>`;
        });
    });
    if (!html) html = `<p style="text-align:center;opacity:0.35;padding:40px 20px;letter-spacing:3px;font-size:0.8rem;">NO BADGES EARNED YET</p>`;
    document.getElementById('badges-list').innerHTML = html;
    toggleModal('badges-modal');
};

function getNightmareBotLuck(playerRP) {
    const baseMin = 80.0, baseMax = 300.0;
    const rpAbove2400 = Math.max(0, playerRP - 2400);
    const difficultyMultiplier = 1 + (rpAbove2400 / 400);
    return [baseMin * difficultyMultiplier, baseMax * difficultyMultiplier];
}

function getEmeraldBotLuck(playerRP) {
    const baseMin = 25.0, baseMax = 55.0;
    const rpAbove2000 = Math.max(0, playerRP - 2000);
    const difficultyMultiplier = 1 + (rpAbove2000 / 400);
    return [baseMin * difficultyMultiplier, baseMax * difficultyMultiplier];
}

function isRankedAccount(acc) { return acc && acc.name && (acc.name.startsWith('#r') || acc.name.startsWith('#rs')); }
function isFullRanked(acc)  { return acc && acc.name && acc.name.startsWith('#r') && !acc.name.startsWith('#rs'); }
function isSoftRanked(acc)  { return acc && acc.name && acc.name.startsWith('#rs'); }

function _taintCurrentAccount() {
    const acc = allAccounts[currentAccIdx];
    if (!acc || acc.isTainted) return;
    acc.isTainted = true;
    save();
}

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
    "Bronze":      50000,
    "Silver":     150000,
    "Gold-1":     200000,
    "Gold-2":     250000,
    "Gold-3":     300000,
    "Gold-4":     350000,
    "Platinum-1": 500000,
    "Platinum-2": 600000,
    "Platinum-3": 700000,
    "Platinum-4": 850000,
    "Diamond-1":  1000000,
    "Diamond-2":  1200000,
    "Diamond-3":  1400000,
    "Diamond-4":  1700000,
    "Emerald":    2000000,
    "Nightmare":  null // Calculated dynamically
};

let globalHighRolls = JSON.parse(localStorage.getItem('crimson_global_highs')) || [];
let currentAccIdx = parseInt(localStorage.getItem('crimson_current_acc')) || 0;

// Fixed UTC epoch: Monday 2026-03-24 00:00:00 UTC — all devices share the same week boundaries
const WEEKLY_RESET_EPOCH = new Date('2026-03-24T00:00:00Z').getTime();
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
function getWeekStart(ts) { return WEEKLY_RESET_EPOCH + Math.floor((ts - WEEKLY_RESET_EPOCH) / WEEK_MS) * WEEK_MS; }
function getWeekEnd(ts)   { return getWeekStart(ts) + WEEK_MS; }

function getShopDiscountDay() {
    const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    return ((weekNum * 1103515245 + 12345) >>> 0) % 7;
}
function isShopDiscountDay() { return new Date().getDay() === getShopDiscountDay(); }
let settings = JSON.parse(localStorage.getItem('crimson_settings')) || { roundNumbers: false, luckScale: 100 };
let adminPersist = JSON.parse(localStorage.getItem('crimson_admin_persist')) || { playerLuck: 2.0, adminRPBonus: 1.0 };

// --- LIVE STATE ---
let playerSets = 0, botSets = 0, currentBotRank = "Bronze";
let playerLuck = parseFloat(adminPersist.playerLuck);
let adminRPBonus = parseFloat(adminPersist.adminRPBonus);
let godMode = false, botRigged = false, botLuckOverride = null;
let playerRetries = 5, playerRoll = 0, botRoll = 0, isProcessing = false;
let singleUseLuckMult = 1;
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
    if (typeof acc.ghostCoins === 'undefined') acc.ghostCoins = 0;
    if (typeof acc.isTainted === 'undefined') acc.isTainted = false;
});

// Add event listeners for navigation buttons
function attachNavigationListeners() {
    const profilesBtn = document.getElementById('profiles-btn');
    if (profilesBtn) profilesBtn.onclick = () => { renderAccounts(); toggleModal('acc-modal'); };
    
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
    if (settingsBtn) settingsBtn.onclick = openSettings;
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
    checkAllBadges();
    startPotionTimerManager();
    startNullDynamicCorruption();
    if (allAccounts[currentAccIdx] && allAccounts[currentAccIdx].isNull) {
        startNullBotGlitch();
        startNullTextCorruption();
        startNullButtonCorruption();
        document.body.classList.add('null-mode');
    }
    
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
        resetRound();
    }

    lastRankIdx = Math.floor(allAccounts[currentAccIdx].points / 400);
    
    updateUI();
    updateDots();
    attachListeners();
    attachNavigationListeners();
    initSettingsUI();
    renderAccounts();
    initOrb();
    applyEquippedBg();
    if (allAccounts[currentAccIdx] && allAccounts[currentAccIdx].isVault) {
        const vs = document.getElementById('vault-screen');
        if (vs) vs.style.display = 'flex';
    }
}

function initSettingsUI() {
    const roundToggle = document.getElementById('round-toggle');
    if (roundToggle) roundToggle.checked = settings.roundNumbers || false;
    applyPerspectiveMode();
    updateVaultHint();
    updateSettingsOrbRow();
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
    if (acc.isVault) return;

    if (acc.isNull) {
        // NULL rank display
        document.getElementById('rank-name').innerHTML = `<span style="color:#444; animation:nullFlicker 3s infinite; font-family:'Orbitron',sans-serif;">&#x2205; NULL</span>`;
        document.getElementById('rank-points').innerHTML = `<span style="color:#333; animation:nullFlicker 2s infinite;">NULL</span>`;
        document.getElementById('user-display-name').innerHTML = `<span style="color:#555; animation:nullFlicker 4s infinite;">${acc.name}</span>`;
        document.getElementById('current-rank-logo').className = 'rank-icon rank-Bronze';
        document.getElementById('current-rank-logo').style.filter = 'grayscale(1) brightness(0.3)';
        document.getElementById('exp-progress').style.width = '0%';
        document.getElementById('bot-display-name').innerText = `BOT (NULL)`;
        const coinsEl = document.getElementById('coins-display');
        if (coinsEl) coinsEl.innerHTML = `<span style="color:#333;">NULL</span>`;
        const streakEl = document.getElementById('streak-count');
        streakEl.innerHTML = `<span style="color:#333;">--</span>`;
        streakEl.className = '';
        document.getElementById('winrate-count').innerHTML = `<span style="color:#333;">--</span>`;
        const bonusDisplay = document.getElementById('bonus-display');
        bonusDisplay.innerHTML = `<span style="color:#2a2a2a; animation:nullFlicker 2s infinite;">MULTI: NULL</span>`;
        const luckEl = document.getElementById('luck-display');
        if (luckEl) luckEl.innerHTML = `<div style="color:#2a2a2a;">NULL</div>`;
        const potionsEl = document.getElementById('active-potions');
        if (potionsEl) potionsEl.innerHTML = `<div style="color:#1a1a1a; font-size:0.7rem;">NULL</div>`;
        save();
        return;
    }

    document.getElementById('current-rank-logo').style.filter = '';
    const rIdx = Math.min(6, Math.floor(acc.points / 400));
    const rName = ranks[rIdx];
    const div = (rName === "Nightmare" || rName === "Emerald") ? "" : Math.floor((acc.points % 400) / 100) + 1;

    if (lastRankIdx !== -1 && rIdx > lastRankIdx) {
        triggerRankPromotion(rName);
    }
    lastRankIdx = rIdx; 

    const recent = acc.history.slice(0, 20);
    const rollingWR = recent.length === 0 ? 0.5 : recent.filter(m => m.res === "WIN").length / recent.length;
    const lifeWR = (acc.wins + acc.losses === 0) ? 0 : (acc.wins / (acc.wins + acc.losses)) * 100;
    const mult = (0.5 + rollingWR) * adminRPBonus;
    const totalLuck = calculateTotalLuck();

    document.getElementById('rank-name').innerText = (rName === "Nightmare" || rName === "Emerald") ? rName.toUpperCase() : `${rName.toUpperCase()} ${div}`;
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

    // Ranked account UI — hide non-stats nav elements
    const _navHideIds = ['nav-profiles-btn', 'nav-casino-dd', 'nav-store-dd', 'settings-btn'];
    const transferBtn = document.getElementById('nav-transfer-btn');
    const rankedBanner = document.getElementById('ranked-mode-banner');
    const _isRanked = isRankedAccount(acc);
    _navHideIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = _isRanked ? 'none' : '';
    });
    if (isFullRanked(acc)) {
        if (transferBtn) { transferBtn.style.opacity = '0.3'; transferBtn.style.pointerEvents = 'none'; transferBtn.textContent = '🔒 Transfer'; }
        if (rankedBanner) {
            rankedBanner.style.display = 'flex';
            rankedBanner.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;padding:4px 10px;background:rgba(124,58,237,0.12);border-top:1px solid rgba(124,58,237,0.25);border-bottom:1px solid rgba(124,58,237,0.25);';
            rankedBanner.innerHTML = `<span style="color:#7c3aed;font-size:0.6rem;">⚔️</span><span style="font-family:'Orbitron',sans-serif;font-size:0.45rem;letter-spacing:3px;color:#a78bfa;">RANKED MODE</span><span style="color:#475569;font-size:0.45rem;">·</span><span style="font-size:0.45rem;color:#64748b;letter-spacing:1px;">LUCK 2.0x · NO CHEATS</span>`;
        }
    } else if (isSoftRanked(acc)) {
        if (transferBtn) { transferBtn.style.opacity = '0.3'; transferBtn.style.pointerEvents = 'none'; transferBtn.textContent = '🔒 Transfer'; }
        if (rankedBanner) {
            rankedBanner.style.display = 'flex';
            rankedBanner.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;padding:4px 10px;background:rgba(59,130,246,0.1);border-top:1px solid rgba(59,130,246,0.2);border-bottom:1px solid rgba(59,130,246,0.2);';
            rankedBanner.innerHTML = `<span style="color:#3b82f6;font-size:0.6rem;">⚔️</span><span style="font-family:'Orbitron',sans-serif;font-size:0.45rem;letter-spacing:3px;color:#93c5fd;">SOFT RANKED</span><span style="color:#475569;font-size:0.45rem;">·</span><span style="font-size:0.45rem;color:#64748b;letter-spacing:1px;">LUCK 2.0x · NO CHEATS</span>`;
        }
    } else {
        if (transferBtn) { transferBtn.style.opacity = ''; transferBtn.style.pointerEvents = ''; transferBtn.textContent = '💸 Transfer'; }
        if (rankedBanner) rankedBanner.style.display = 'none';
    }

    save();
}

// --- CUTSCENE ENGINE ---
// ==========================================
const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function triggerRankPromotion(name) {
    earnBadge('rank_' + name.toLowerCase());
    if (name === "Nightmare") {
        await playNightmareCutscene(name);
    } else if (name === "Diamond") {
        await playDiamondCutscene(name);
    } else if (name === "Emerald") {
        await playEmeraldCutscene(name);
    } else if (name === "Silver" || name === "Gold" || name === "Platinum") {
        await playSimpleRankCutscene(name);
    } else if (name === "NULL") {
        await playNullCutscene();
    } else {
        triggerNormalPromotion(name);
    }
}

// ==========================================
// NULL RANK SYSTEM
// ==========================================

let nullBotGlitchInterval = null;
let nullTextCorruptInterval = null;
const NULL_CORRUPT_CHARS = '\u2205?\u2588\u2593\u2592\u2591#%*01NULL///---\u25a0\u25cf'.split('');
const NULL_CORRUPT_IDS = ['rank-name','rank-points','user-display-name','streak-count','winrate-count','bonus-display','bot-display-name','coins-display'];

function corruptStr(text) {
    return text.split('').map(c => {
        if (c === ' ' || c === ':') return c;
        return Math.random() < 0.18 ? NULL_CORRUPT_CHARS[Math.floor(Math.random() * NULL_CORRUPT_CHARS.length)] : c;
    }).join('');
}

function startNullTextCorruption() {
    stopNullTextCorruption();
    nullTextCorruptInterval = setInterval(() => {
        const acc = allAccounts[currentAccIdx];
        if (!acc || !acc.isNull) { stopNullTextCorruption(); return; }
        NULL_CORRUPT_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const t = el.textContent;
            if (t.length > 0) el.textContent = corruptStr(t);
        });
    }, 90);
}

function stopNullTextCorruption() {
    if (nullTextCorruptInterval) { clearInterval(nullTextCorruptInterval); nullTextCorruptInterval = null; }
}

function drawNullNoise(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const fn = () => {
        const id = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < id.data.length; i += 4) {
            const on = Math.random() > 0.6;
            const v  = on ? Math.floor(Math.random() * 60) : 0;
            id.data[i] = id.data[i+1] = id.data[i+2] = v;
            id.data[i+3] = on ? Math.floor(Math.random() * 50 + 10) : 0;
        }
        ctx.putImageData(id, 0, 0);
    };
    fn();
    return setInterval(fn, 60);
}

function spawnNullFragment(parent, chaotic = false) {
    const f = document.createElement('div');
    const w = chaotic ? (4 + Math.random() * 120) : (2 + Math.random() * 30);
    const h = chaotic ? (2 + Math.random() * 8)   : (2 + Math.random() * 30);
    const grey = Math.floor(Math.random() * 50 + 10);
    const dur  = chaotic ? (0.5 + Math.random() * 1) : (3 + Math.random() * 4);
    f.style.cssText = `
        position: absolute;
        width: ${w}px; height: ${h}px;
        background: rgb(${grey},${grey},${grey});
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        opacity: 0.7; z-index: 5;
        --ndx: ${(Math.random() - 0.5) * 120}px;
        --ndy: ${(Math.random() - 0.5) * 120}px;
        --ndr: ${(Math.random() - 0.5) * 60}deg;
        animation: nullVoidDrift ${dur}s ease-out forwards;
    `;
    parent.appendChild(f);
    setTimeout(() => f.remove(), dur * 1000 + 100);
}

async function playNullCutscene() {
    const seq    = document.getElementById('null-sequence');
    const noise  = document.getElementById('null-noise');
    const sweep  = document.getElementById('null-scan-sweep');
    const p2     = document.getElementById('null-p2');
    const land   = document.getElementById('null-landscape');
    const landTxt= document.getElementById('null-landscape-text');
    const gWrap  = document.getElementById('null-glitch-wrap');
    const entity = document.getElementById('null-entity');
    const vSym   = document.getElementById('null-void-symbol');
    const vSub   = document.getElementById('null-void-sub');
    const vSub2  = document.getElementById('null-void-sub2');
    const final  = document.getElementById('null-final');
    const gts    = [1,2,3,4,5].map(i => document.getElementById(`null-gt${i}`));
    const monos  = ['nl-m1','nl-m2','nl-m3','nl-m4','nl-m5','nl-mt1','nl-mt3'].map(id => document.getElementById(id));

    // Reset everything
    [p2, land, gWrap, entity, final].forEach(el => { el.style.display = 'none'; el.style.opacity = '0'; });
    gts.forEach(t => { t.style.opacity = '0'; t.style.animation = ''; });
    vSym.style.opacity = '0'; vSub.style.opacity = '0'; vSub2.style.opacity = '0';
    landTxt.style.opacity = '0';
    monos.forEach(m => { if (m) m.setAttribute('opacity','0'); });
    sweep.style.display = 'none';
    noise.style.opacity = '0';
    seq.style.display = 'block';
    seq.style.background = '#000';
    seq.style.animation = '';

    // === PHASE 1: Void awakening (0–6s) ===
    await wait(800);
    const noiseInterval = drawNullNoise(noise);
    noise.style.opacity = '1';
    await wait(2000);
    sweep.style.display = 'block';
    await wait(3200);

    // === PHASE 2: Signal Lost (6–12s) ===
    p2.style.display = 'block';
    setTimeout(() => p2.style.opacity = '1', 50);
    // Flicker the noise intensely
    noise.style.opacity = '0.7';
    await wait(5500);
    p2.style.opacity = '0';
    await wait(600);
    p2.style.display = 'none';

    // === PHASE 3: Null Landscape (12–24s) ===
    noise.style.opacity = '0.15';
    land.style.display = 'block';
    setTimeout(() => land.style.opacity = '1', 50);
    await wait(2500);
    // Monoliths fade in one by one
    for (const m of monos) {
        if (m) { m.style.transition = 'opacity 1.5s'; m.setAttribute('opacity','1'); }
        await wait(800);
    }
    await wait(1000);
    landTxt.style.opacity = '1';
    // Drift fragments across landscape
    for (let i = 0; i < 22; i++) setTimeout(() => spawnNullFragment(seq), i * 350);
    await wait(6000);
    land.style.opacity = '0';
    landTxt.style.opacity = '0';
    await wait(1000);
    land.style.display = 'none';

    // === PHASE 4: Glitch Storm (24–35s) ===
    noise.style.opacity = '0.4';
    gWrap.style.display = 'block';
    seq.style.animation = 'nullShakeHeavy 0.25s infinite';
    // Cycle through texts multiple times
    for (let cycle = 0; cycle < 5; cycle++) {
        for (let idx = 0; idx < gts.length; idx++) {
            gts[idx].style.opacity = '1';
            gts[idx].style.animation = `nullGlitch ${0.3 + Math.random() * 0.3}s infinite, nullFlicker ${0.25 + Math.random() * 0.25}s infinite`;
            await wait(280 + idx * 60);
            if (cycle < 4) { gts[idx].style.opacity = '0'; gts[idx].style.animation = ''; }
        }
        seq.style.animation = cycle % 2 === 0 ? 'nullShakeHeavy 0.15s infinite' : 'nullShakeHeavy 0.3s infinite';
        await wait(200);
    }
    seq.style.animation = 'none';
    gWrap.style.transition = 'opacity 0.5s';
    gWrap.style.opacity = '0';
    await wait(600);
    gWrap.style.display = 'none';

    // === PHASE 5: Void Entity (35–47s) ===
    noise.style.opacity = '0.08';
    entity.style.display = 'block';
    vSym.style.animation = 'nullPulse 4s ease-in-out infinite';
    setTimeout(() => vSym.style.opacity = '1', 50);
    await wait(3500);
    setTimeout(() => vSub.style.opacity = '1', 50);
    await wait(3000);
    setTimeout(() => vSub2.style.opacity = '1', 50);
    await wait(4500);
    entity.style.transition = 'opacity 1s';
    entity.style.opacity = '0';
    await wait(1200);
    entity.style.display = 'none';

    // === PHASE 6: System Failure (47–55s) ===
    noise.style.opacity = '0.6';
    seq.style.animation = 'nullShakeHeavy 0.08s infinite';
    for (let i = 0; i < 50; i++) setTimeout(() => spawnNullFragment(seq, true), i * 80);
    await wait(2500);
    // Rapid flicker to white
    seq.style.animation = 'none';
    seq.style.background = '#111';
    await wait(150);
    seq.style.background = '#fff';
    clearInterval(noiseInterval);
    noise.style.opacity = '0';
    sweep.style.display = 'none';
    await wait(300);
    seq.style.background = '#000';
    await wait(2500);

    // === PHASE 7: NULL Reveal (55–65s) ===
    final.style.display = 'block';
    setTimeout(() => final.style.opacity = '1', 50);
    await wait(10000);

    // Clean up
    seq.style.display = 'none';
    seq.style.background = '#000';
    seq.style.animation = '';
    final.style.display = 'none';
    final.style.opacity = '0';
}

function activateNullRank() {
    const acc = allAccounts[currentAccIdx];
    acc.isNull = true;
    acc.points = 0;
    acc.coins += 10000000000000;
    earnBadge('null_ascension');
    startNullBotGlitch();
    startNullTextCorruption();
    startNullButtonCorruption();
    document.body.classList.add('null-mode');
    updateUI();
    save();
    console.log('%c∅ NULL RANK ACTIVATED ∅', 'color:#555; font-size:1.5rem; font-family:monospace;');
    triggerRankPromotion('NULL');
}

window.activateNull = activateNullRank;
window.voidAscend   = activateNullRank;

async function playNullifiedCutscene() {
    const acc = allAccounts[currentAccIdx];
    const seq    = document.getElementById('nullified-sequence');
    const canvas = document.getElementById('nullified-canvas');
    const ctx    = canvas.getContext('2d');

    seq.style.display = 'block';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height, CX = W / 2, CY = H / 2;

    let raf = null;
    const stopRaf = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    // Helpers
    const mk = (css, html = '') => {
        const e = document.createElement('div');
        e.style.cssText = css; e.innerHTML = html;
        seq.appendChild(e); return e;
    };

    // ═══════════════════════════════════════════
    // PHASE 1 — SYSTEM BREACH (2.2s)
    // Static noise + glitch RGB + warning text
    // ═══════════════════════════════════════════
    const noiseRaf = () => {
        const id = ctx.createImageData(W, H);
        for (let i = 0; i < id.data.length; i += 4) {
            const on = Math.random() > 0.55;
            const v  = on ? Math.floor(Math.random() * 140) : 0;
            id.data[i] = v; id.data[i+1] = 0; id.data[i+2] = 0;
            id.data[i+3] = on ? Math.floor(Math.random() * 200 + 55) : 0;
        }
        ctx.putImageData(id, 0, 0);
        raf = requestAnimationFrame(noiseRaf);
    };
    noiseRaf();

    const scan = mk(`position:absolute;left:0;right:0;height:4px;top:0;z-index:10;
        background:rgba(255,40,0,0.55);animation:nullifiedScan 0.7s linear infinite;`);

    await wait(350);
    const warn1 = mk(`position:absolute;top:32%;left:50%;transform:translateX(-50%);
        font-family:'Orbitron',sans-serif;font-size:1.15rem;font-weight:900;color:#ff3333;
        white-space:nowrap;letter-spacing:5px;text-shadow:0 0 18px #ff0000;
        animation:nullifiedRgbShift 0.28s infinite;`,
        '⚠ UNAUTHORIZED ACCESS DETECTED ⚠');

    await wait(650);
    const warn2 = mk(`position:absolute;top:44%;left:50%;transform:translateX(-50%);
        font-family:'Courier New',monospace;font-size:0.88rem;color:#cc0000;
        letter-spacing:7px;white-space:nowrap;opacity:0;transition:opacity 0.35s;`,
        'NULLIFICATION PROTOCOL — ENGAGED');
    await wait(40); warn2.style.opacity = '1';

    await wait(500);
    const warn3 = mk(`position:absolute;top:53%;left:50%;transform:translateX(-50%);
        font-family:'Courier New',monospace;font-size:0.72rem;color:#880000;
        letter-spacing:3px;white-space:nowrap;opacity:0;transition:opacity 0.3s;`,
        'TARGET : ' + (acc.name || 'UNKNOWN').toUpperCase() + ' // VERDICT : CONDEMNED');
    await wait(40); warn3.style.opacity = '1';
    await wait(720);

    // ═══════════════════════════════════════════
    // PHASE 2 — REALITY FRACTURE (1.8s)
    // CSS 3D shards of the screen explode apart
    // ═══════════════════════════════════════════
    stopRaf();
    ctx.clearRect(0, 0, W, H);
    [warn1, warn2, warn3, scan].forEach(e => e.remove());

    seq.style.perspective = '900px';
    const COLS = 5, ROWS = 6, sw = W / COLS, sh = H / ROWS;
    const shardWrap = mk('position:absolute;inset:0;z-index:15;');
    const shards = [];
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const d = document.createElement('div');
            const b = 8 + Math.floor(Math.random() * 18);
            d.style.cssText = `position:absolute;
                left:${c*sw}px;top:${r*sh}px;width:${sw+1}px;height:${sh+1}px;
                background:linear-gradient(${Math.random()*360}deg,#${b.toString(16).padStart(2,'0')}0000,#050000);
                border:1px solid rgba(${120+Math.floor(Math.random()*120)},0,0,0.6);
                box-sizing:border-box;transform-origin:${50+((c/(COLS-1))-0.5)*80}% ${50+((r/(ROWS-1))-0.5)*80}%;
                backface-visibility:hidden;`;
            shardWrap.appendChild(d);
            shards.push({ el: d,
                rx: (Math.random()-0.5)*160, ry: (Math.random()-0.5)*160, rz: (Math.random()-0.5)*40,
                tx: (Math.random()-0.5)*W*1.4, ty: (Math.random()-0.5)*H*1.4,
                tz: 350+Math.random()*700, delay: Math.random()*250 });
        }
    }
    const flashEl = mk('position:absolute;inset:0;background:#fff;z-index:50;');
    await wait(70); flashEl.remove();
    shards.forEach(s => setTimeout(() => {
        s.el.style.transition = `transform ${0.65+Math.random()*0.45}s cubic-bezier(0.2,0.8,0.3,1), opacity 0.75s 0.15s`;
        s.el.style.transform  = `translate3d(${s.tx}px,${s.ty}px,${s.tz}px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) rotateZ(${s.rz}deg)`;
        s.el.style.opacity    = '0';
    }, s.delay));
    await wait(1350);
    shardWrap.remove();
    seq.style.perspective = '';

    // ═══════════════════════════════════════════
    // PHASE 3 — 3D VOID TUNNEL (3s)
    // Perspective-correct hexagonal tunnel, accelerating
    // ═══════════════════════════════════════════
    let tPos = 0;
    const tunnelStart = Date.now(), tunnelDur = 3000;
    const runTunnel = () => {
        const elapsed = Date.now() - tunnelStart;
        const prog = elapsed / tunnelDur;
        tPos += (0.35 + prog * prog * 5.5) * 0.009;
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, W, H);
        const FOV = 360, RINGS = 26;
        for (let i = 0; i < RINGS; i++) {
            const frac = ((i / RINGS) + tPos) % 1.0;
            const z = (1.0 - frac) * 820;
            if (z < 8) continue;
            const sc = FOV / (z + FOV);
            const hexR = 680 * sc;
            const bright = Math.floor(frac * 230 + 15);
            const alpha  = Math.min(1, frac * 1.6);
            ctx.shadowBlur = (1 - frac) * 28; ctx.shadowColor = `rgb(${bright},0,0)`;
            ctx.strokeStyle = `rgba(${bright},${Math.floor(bright*0.08)},0,${alpha})`;
            ctx.lineWidth = Math.max(0.4, sc * 3.8);
            ctx.beginPath();
            for (let v = 0; v <= 6; v++) {
                const a = (v / 6) * Math.PI * 2 - Math.PI / 6;
                v === 0 ? ctx.moveTo(CX+hexR*Math.cos(a), CY+hexR*Math.sin(a))
                        : ctx.lineTo(CX+hexR*Math.cos(a), CY+hexR*Math.sin(a));
            }
            ctx.stroke();
            if (i < RINGS - 1) {
                const frac2 = ((i+1)/RINGS + tPos) % 1.0;
                const z2 = (1.0-frac2)*820; if (z2 < 8) continue;
                const hexR2 = 680 * (FOV/(z2+FOV));
                ctx.strokeStyle = `rgba(${bright},0,0,${alpha*0.35})`;
                ctx.lineWidth = Math.max(0.2, sc * 0.9);
                for (let v = 0; v < 6; v++) {
                    const a = (v/6)*Math.PI*2 - Math.PI/6;
                    ctx.beginPath();
                    ctx.moveTo(CX+hexR*Math.cos(a),  CY+hexR*Math.sin(a));
                    ctx.lineTo(CX+hexR2*Math.cos(a), CY+hexR2*Math.sin(a));
                    ctx.stroke();
                }
            }
        }
        // Lightning arcs
        if (Math.random() < 0.18) {
            const v1 = Math.floor(Math.random()*6), v2 = (v1+1+Math.floor(Math.random()*2))%6;
            const nSc = FOV/(60+FOV), fSc = FOV/(280+FOV);
            const nR = 680*nSc, fR = 680*fSc;
            const a1 = (v1/6)*Math.PI*2-Math.PI/6, a2 = (v2/6)*Math.PI*2-Math.PI/6;
            ctx.strokeStyle = `rgba(255,${Math.floor(Math.random()*50)},0,0.95)`;
            ctx.lineWidth = 1+Math.random(); ctx.shadowBlur = 22; ctx.shadowColor = '#ff0000';
            ctx.beginPath();
            ctx.moveTo(CX+nR*Math.cos(a1), CY+nR*Math.sin(a1));
            ctx.lineTo(CX+(nR+fR)/2*Math.cos((a1+a2)/2)+(Math.random()-.5)*55,
                       CY+(nR+fR)/2*Math.sin((a1+a2)/2)+(Math.random()-.5)*55);
            ctx.lineTo(CX+fR*Math.cos(a2), CY+fR*Math.sin(a2)); ctx.stroke();
        }
        ctx.shadowBlur = 0;
        if (prog > 0.65) { ctx.fillStyle=`rgba(60,0,0,${(prog-0.65)*0.45})`; ctx.fillRect(0,0,W,H); }
        if (elapsed < tunnelDur) raf = requestAnimationFrame(runTunnel);
    };
    raf = requestAnimationFrame(runTunnel);
    await wait(tunnelDur);
    stopRaf();

    // ═══════════════════════════════════════════
    // PHASE 4 — 3D PARTICLE SINGULARITY (3s)
    // 1000 particles orbit in 3D, collapse to ∅
    // ═══════════════════════════════════════════
    ctx.clearRect(0, 0, W, H);
    const N = 1000;
    const parts = Array.from({length: N}, () => {
        const theta = Math.random()*Math.PI*2, phi = Math.acos(2*Math.random()-1);
        const r = 240+Math.random()*200;
        return { x:r*Math.sin(phi)*Math.cos(theta), y:r*Math.sin(phi)*Math.sin(theta),
                 z:r*Math.cos(phi), vx:0, vy:0, vz:0,
                 hue:Math.random()*22, size:1.4+Math.random()*1.6 };
    });
    const partStart = Date.now(), partDur = 3000;
    let aX = 0, aY = 0;
    const runParts = () => {
        const elapsed = Date.now() - partStart;
        const prog = Math.min(elapsed / partDur, 1);
        aX = prog * 1.8; aY += 0.028;
        ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0,0,W,H);
        const cX = Math.cos(aX), sX = Math.sin(aX), cY = Math.cos(aY), sY = Math.sin(aY);
        const force = Math.pow(prog, 1.6) * 0.13;
        parts.sort((a,b) => b.z - a.z).forEach(p => {
            p.vx += -p.x*force + (Math.random()-.5)*(1-prog)*2.5;
            p.vy += -p.y*force + (Math.random()-.5)*(1-prog)*2.5;
            p.vz += -p.z*force + (Math.random()-.5)*(1-prog)*2.5;
            p.vx *= 0.93; p.vy *= 0.93; p.vz *= 0.93;
            p.x += p.vx; p.y += p.vy; p.z += p.vz;
            const y1 = p.y*cX - p.z*sX, z1 = p.y*sX + p.z*cX;
            const x2 = p.x*cY + z1*sY, z2 = -p.x*sY + z1*cY;
            const d = z2 + 420; if (d < 1) return;
            const sc = 420 / d;
            ctx.beginPath();
            ctx.arc(CX+x2*sc, CY+y1*sc, Math.max(0.3, p.size*sc), 0, Math.PI*2);
            const lum = 30 + Math.floor((1-z2/400)*60);
            ctx.fillStyle = `hsl(${p.hue},100%,${lum}%)`; ctx.fill();
        });
        if (prog > 0.45) {
            const sp = (prog-0.45)/0.55, sR = 145*sp;
            ctx.strokeStyle = `rgba(255,0,0,${sp})`; ctx.lineWidth = 4*sp+0.5;
            ctx.shadowBlur = 32*sp; ctx.shadowColor = '#ff0000';
            ctx.beginPath(); ctx.arc(CX, CY, sR, 0, Math.PI*2); ctx.stroke();
            const off = sR*0.72;
            ctx.beginPath(); ctx.moveTo(CX-off,CY+off); ctx.lineTo(CX+off,CY-off); ctx.stroke();
            ctx.shadowBlur = 0;
        }
        if (elapsed < partDur) raf = requestAnimationFrame(runParts);
    };
    raf = requestAnimationFrame(runParts);
    await wait(partDur);
    stopRaf();

    // ═══════════════════════════════════════════
    // PHASE 5 — NULLIFICATION (3.5s)
    // 3D spinning ∅ on canvas + NULLIFIED letters + blood
    // ═══════════════════════════════════════════
    ctx.clearRect(0, 0, W, H);
    seq.style.animation = 'nullifiedHeavyShake 0.18s infinite';
    let bTimer = setInterval(() => {
        for (let i = 0; i < 4; i++) {
            const d = document.createElement('div');
            const w = 2+Math.random()*4, h = 20+Math.random()*35;
            d.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-45px;
                width:${w}px;height:${h}px;background:linear-gradient(to bottom,#cc0000,#440000);
                border-radius:0 0 50% 50%;z-index:9999998;pointer-events:none;
                animation:nmBloodDrip ${0.55+Math.random()*0.65}s linear forwards;`;
            document.body.appendChild(d); setTimeout(() => d.remove(), 1300);
        }
    }, 45);

    let sAng = 0, sAngX = 0;
    const symStart2 = Date.now(), symDur2 = 3500;
    const runSym = () => {
        sAng += 0.032; sAngX += 0.019;
        ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0,0,W,H);
        const FOV2 = 400, R = 138, SEGS = 64;
        const cSY = Math.cos(sAng), sSY = Math.sin(sAng);
        const cSX = Math.cos(sAngX), sSX = Math.sin(sAngX);
        const p3 = (x,y,z) => {
            const x1=x*cSY-z*sSY, z1=x*sSY+z*cSY;
            const y2=y*cSX-z1*sSX, z2=y*sSX+z1*cSX;
            const d=z2+FOV2; return {sx:CX+x1*FOV2/d, sy:CY+y2*FOV2/d, depth:d};
        };
        const pts = Array.from({length:SEGS+1}, (_,i) => {
            const a=(i/SEGS)*Math.PI*2; return p3(R*Math.cos(a), R*Math.sin(a), 0);
        });
        for (let i = 0; i < SEGS; i++) {
            const p1=pts[i], p2=pts[i+1], avgD=(p1.depth+p2.depth)/2;
            const b = Math.max(0,Math.min(255,Math.floor((avgD-100)*0.6)));
            ctx.strokeStyle=`rgb(255,${Math.floor(b*0.08)},0)`;
            ctx.lineWidth=3.5-(avgD-200)*0.004;
            ctx.shadowBlur=16; ctx.shadowColor='#ff0000';
            ctx.beginPath(); ctx.moveTo(p1.sx,p1.sy); ctx.lineTo(p2.sx,p2.sy); ctx.stroke();
        }
        const pA=p3(-R*.75, R*.75, 0), pB=p3(R*.75,-R*.75,0);
        ctx.strokeStyle='#ff0000'; ctx.lineWidth=4.5;
        ctx.shadowBlur=22; ctx.shadowColor='#ff0000';
        ctx.beginPath(); ctx.moveTo(pA.sx,pA.sy); ctx.lineTo(pB.sx,pB.sy); ctx.stroke();
        ctx.strokeStyle='rgba(160,0,0,0.12)'; ctx.lineWidth=14; ctx.shadowBlur=0;
        ctx.beginPath(); ctx.arc(CX,CY,170,0,Math.PI*2); ctx.stroke();
        if (Date.now()-symStart2 < symDur2) raf = requestAnimationFrame(runSym);
    };
    raf = requestAnimationFrame(runSym);

    // Letter-by-letter "NULLIFIED" drop
    const letWrap = mk(`position:absolute;bottom:20%;left:0;right:0;
        display:flex;justify-content:center;gap:1px;perspective:900px;perspective-origin:50% 120%;`);
    const word = 'NULLIFIED';
    for (let i = 0; i < word.length; i++) {
        await wait(160);
        const sp = document.createElement('span');
        sp.innerText = word[i];
        sp.style.cssText = `font-family:'Orbitron',sans-serif;font-size:3.8rem;font-weight:900;
            color:#ff0000;text-shadow:0 0 28px #ff0000,0 0 56px #cc0000;display:inline-block;
            animation:nullifiedLetterDrop 0.55s cubic-bezier(0.2,2,0.4,1) both;opacity:0;`;
        letWrap.appendChild(sp);
        setTimeout(() => sp.style.opacity = '1', 40);
    }
    await wait(symDur2 - word.length * 160);
    stopRaf(); clearInterval(bTimer);

    // ═══════════════════════════════════════════
    // PHASE 6 — ASSIMILATION (2s)
    // Giant ∅ pulses → screen implodes → NULL applied
    // ═══════════════════════════════════════════
    [...seq.children].forEach(c => { if (c !== canvas) c.remove(); });
    seq.style.animation = '';
    ctx.clearRect(0, 0, W, H);

    const bigNull = mk(`position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%) scale(0);
        font-family:'Orbitron',sans-serif;font-size:16rem;font-weight:900;
        color:#ff0000;line-height:1;z-index:30;
        text-shadow:0 0 80px #ff0000,0 0 160px #cc0000,0 0 240px #880000;
        animation:nullifiedPulse 0.65s ease-in-out infinite;
        transition:transform 0.45s cubic-bezier(0.2,2.2,0.4,1);`, '∅');
    await wait(40);
    bigNull.style.transform = 'translate(-50%,-50%) scale(1)';
    seq.style.animation = 'nullifiedHeavyShake 0.09s infinite';
    await wait(750);

    // Implode
    seq.style.animation = '';
    seq.style.transition = 'transform 0.48s cubic-bezier(0.55,0,1,0.45), filter 0.3s';
    seq.style.transform  = 'scale(0)';
    seq.style.filter     = 'brightness(5)';
    await wait(520);

    // Cleanup
    seq.style.display    = 'none';
    seq.style.transform  = '';
    seq.style.filter     = '';
    seq.style.transition = '';
    seq.style.animation  = '';
    canvas.width = 1; canvas.height = 1;

    earnBadge('nullified_protocol');
}

function startNullBotGlitch() {
    stopNullBotGlitch();
    nullBotGlitchInterval = setInterval(() => {
        const el = document.getElementById('bot-roll');
        if (!el) return;
        const glitchChars = ['∅','?','▓','▒','░','█','NULL','///','---'];
        const r = Math.random();
        if (r < 0.4) {
            const glitchNum = Math.floor(Math.random() * 999999);
            el.innerHTML = `<span class="roll-value" style="color:#333; animation:nullFlicker 0.3s infinite;">${glitchNum.toLocaleString()}</span>`;
        } else if (r < 0.7) {
            el.innerHTML = `<span class="roll-value" style="color:#222; animation:nullFlicker 0.2s infinite;">${glitchChars[Math.floor(Math.random()*glitchChars.length)]}</span>`;
        }
    }, 120);
}

function stopNullBotGlitch() {
    if (nullBotGlitchInterval) { clearInterval(nullBotGlitchInterval); nullBotGlitchInterval = null; }
}

function deactivateNullEffects() {
    stopNullBotGlitch();
    stopNullTextCorruption();
    stopNullButtonCorruption();
    document.body.classList.remove('null-mode');
}

// Null button corruption
let nullButtonCorruptInterval = null;

function startNullButtonCorruption() {
    stopNullButtonCorruption();
    document.querySelectorAll('button').forEach(btn => {
        if (btn.closest('#admin-modal') || btn.closest('#settings-modal')) return;
        const text = btn.textContent.trim();
        if (text) btn.setAttribute('data-null-orig', text);
    });
    nullButtonCorruptInterval = setInterval(() => {
        document.querySelectorAll('button[data-null-orig]').forEach(btn => {
            const orig = btn.getAttribute('data-null-orig');
            if (!orig) return;
            btn.textContent = orig.split('').map(c =>
                c === ' ' ? c : (Math.random() < 0.62 ? c : NULL_CORRUPT_CHARS[Math.floor(Math.random() * NULL_CORRUPT_CHARS.length)])
            ).join('');
        });
    }, 110);
}

function stopNullButtonCorruption() {
    if (nullButtonCorruptInterval) { clearInterval(nullButtonCorruptInterval); nullButtonCorruptInterval = null; }
    document.querySelectorAll('button[data-null-orig]').forEach(btn => {
        btn.textContent = btn.getAttribute('data-null-orig');
        btn.removeAttribute('data-null-orig');
    });
}

// Void transmission mini-cutscene — triggers ~once per 8h of play
let lastVoidTransCheck = parseInt(localStorage.getItem('lastVoidTransCheck') || Date.now());

const VOID_MSG1 =
`YPM 7W39 Q1M4ZQ W58J YW YPWQM NPW QMMZ 3Y.
8WWZ 9MM1M6. 4 QM2W59 Y645Q@3QQ3W5 4N43YQ.`;

const VOID_MSG2 =
`7W39Q 2W5QH@M 488 830PY 459 0642M,
W58J QP49WNQ X388 YPM Q142M,
35YW 946Z5MQQ, 5H88 9MQ2M59Q,
9MQW84YM 459 Q38M5Y, 5WYP350 M59Q,
488 6MYH65Q YW 06MJ 459 2W89,
Q38M52M 2843@Q NP4Y W52M N4Q KW89,
2WH5Y8MQQ QY46Q K835Z WHY YW530PY,
M@1Y35MQQ X6W@ 06MJ YW NP3YM,
5WYP350 QY36Q 35 YP3Q M598MQQ 7W39,
9MQ2M59 5WN—645Z 5H88-9MQY6WJM9.`;

async function playVoidTransmission() {
    const wrap   = document.getElementById('void-transmission');
    const textEl = document.getElementById('vt-text');
    const footer = document.getElementById('vt-footer');
    let dismissed = false;
    wrap.style.display = 'flex';
    wrap.onclick = () => { dismissed = true; wrap.style.display = 'none'; wrap.onclick = null; };
    textEl.textContent = '';
    textEl.style.opacity = '1';
    textEl.style.transition = '';
    footer.style.opacity = '0';

    const type = async (msg, delay) => {
        for (const ch of msg) {
            if (dismissed) return;
            textEl.textContent += ch;
            await wait(ch === '\n' ? 200 : delay + Math.random() * 14);
        }
    };

    earnBadge('void_signal');
    await wait(700);
    await type(VOID_MSG1, 40);
    if (dismissed) return;
    await wait(3800);

    textEl.style.transition = 'opacity 0.5s';
    textEl.style.opacity = '0';
    await wait(600);
    if (dismissed) return;
    textEl.textContent = '';
    textEl.style.opacity = '1';

    await type(VOID_MSG2, 24);
    if (dismissed) return;

    footer.style.opacity = '1';
    await wait(9000);
    if (!dismissed) { wrap.style.display = 'none'; wrap.onclick = null; }
}

function checkVoidTransmission() {
    const acc = allAccounts[currentAccIdx];
    if (acc && acc.isNull) return;
    const now = Date.now();
    const dt = now - lastVoidTransCheck;
    lastVoidTransCheck = now;
    localStorage.setItem('lastVoidTransCheck', now);
    const prob = 1 - Math.exp(-dt / (8 * 3600 * 1000));
    if (Math.random() < prob) setTimeout(() => playVoidTransmission(), 2000);
}

// Dynamic null corruption for leaderboard / account page
let nullDynamicCorruptInterval = null;
function startNullDynamicCorruption() {
    if (nullDynamicCorruptInterval) return;
    nullDynamicCorruptInterval = setInterval(() => {
        document.querySelectorAll('.null-corrupt-dyn').forEach(el => {
            const len = parseInt(el.getAttribute('data-orig-len') || '6');
            el.textContent = Array.from({length: len}, () =>
                NULL_CORRUPT_CHARS[Math.floor(Math.random() * NULL_CORRUPT_CHARS.length)]
            ).join('');
        });
    }, 150);
}

async function playSimpleRankCutscene(name) {
    const seq   = document.getElementById('simple-rank-sequence');
    const raysEl = document.getElementById('simple-rank-rays');
    const msgWrap = document.getElementById('simple-rank-msg');
    const msgText = document.getElementById('simple-rank-msg-text');
    const final  = document.getElementById('simple-rank-final');
    const orb    = document.getElementById('simple-rank-orb');
    const nameEl = document.getElementById('simple-rank-name');
    const labelEl = document.getElementById('simple-rank-label');

    const THEMES = {
        Silver: {
            bg:        'linear-gradient(135deg, #0d0d1a, #1c2040)',
            rays:      'repeating-conic-gradient(from 0deg, transparent 0deg 20deg, rgba(192,192,192,0.07) 20deg 40deg)',
            colors:    ['#c0c0c0','#e8e8e8','#ffffff','#a8a8b0'],
            glow:      '#c0c0c0',
            orbColor:  'radial-gradient(circle, #e8e8e8, #808080)',
            orbShadow: '0 0 60px #c0c0c0',
            textShadow:'0 0 20px #c0c0c0, 0 0 40px #c0c0c0',
            message:   'The climb begins...',
            anim:      'particleRise',
            count:     45
        },
        Gold: {
            bg:        'linear-gradient(135deg, #1a0800, #3a1400)',
            rays:      'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(255,215,0,0.1) 15deg 30deg)',
            colors:    ['#ffd700','#ffb700','#ffcc44','#ffe066'],
            glow:      '#ffd700',
            orbColor:  'radial-gradient(circle, #ffe066, #cc8800)',
            orbShadow: '0 0 80px #ffd700',
            textShadow:'0 0 20px #ffd700, 0 0 50px #ffaa00',
            message:   'Fortune favors the bold...',
            anim:      'particleFall',
            count:     65,
            spinRays:  true
        },
        Platinum: {
            bg:        'linear-gradient(135deg, #05050f, #101028)',
            rays:      'repeating-conic-gradient(from 0deg, transparent 0deg 12deg, rgba(229,228,226,0.09) 12deg 24deg)',
            colors:    ['#e5e4e2','#ffffff','#d4d4d4','#f0f0f0'],
            glow:      '#e5e4e2',
            orbColor:  'radial-gradient(circle, #ffffff, #b0b0b0)',
            orbShadow: '0 0 80px #e5e4e2',
            textShadow:'0 0 20px #e5e4e2, 0 0 50px #ffffff',
            message:   'Rare. Prestigious. Platinum.',
            anim:      'particleRise',
            count:     55
        }
    };

    const cfg = THEMES[name];
    if (!cfg) return triggerNormalPromotion(name);

    // Reset
    seq.style.display = 'flex';
    seq.style.background = cfg.bg;
    raysEl.style.background = cfg.rays;
    msgWrap.style.display = 'none';
    final.style.display = 'none';
    final.style.opacity = '0';
    msgText.style.opacity = '0';
    msgText.textContent = cfg.message;
    msgText.style.textShadow = `0 0 25px ${cfg.glow}, 0 0 50px ${cfg.glow}`;
    nameEl.textContent = name.toUpperCase();
    nameEl.style.textShadow = cfg.textShadow;
    labelEl.style.color = cfg.glow;
    labelEl.style.textShadow = `0 0 15px ${cfg.glow}`;
    orb.style.background = cfg.orbColor;
    orb.style.boxShadow = cfg.orbShadow;

    // Gold spinning sun rays
    let sunRays = null;
    if (cfg.spinRays) {
        sunRays = document.createElement('div');
        sunRays.style.cssText = `
            position: absolute; width: 900px; height: 900px;
            top: 50%; left: 50%; transform: translate(-50%,-50%);
            background: repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,215,0,0.06) 10deg 20deg);
            animation: goldSpin 8s linear infinite; z-index: 2;
        `;
        seq.appendChild(sunRays);
    }

    await wait(200);

    // Show message
    msgWrap.style.display = 'block';
    setTimeout(() => msgText.style.opacity = '1', 50);

    // Spawn particles
    const particles = [];
    for (let i = 0; i < cfg.count; i++) {
        setTimeout(() => {
            const p = document.createElement('div');
            const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
            const size  = 3 + Math.random() * 6;
            const topPct = cfg.anim === 'particleRise' ? `${70 + Math.random() * 30}%` : `-5%`;
            p.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                background: ${color}; border-radius: 50%;
                box-shadow: 0 0 ${size * 2}px ${color};
                left: ${Math.random() * 100}%; top: ${topPct}; z-index: 3;
                animation: ${cfg.anim} ${2.5 + Math.random() * 3}s ease-out ${Math.random() * 1.5}s forwards;
            `;
            seq.appendChild(p);
            particles.push(p);
            setTimeout(() => p.remove(), 6000);
        }, i * 55);
    }

    await wait(2800);

    // Fade out message, show final
    msgText.style.opacity = '0';
    await wait(900);
    msgWrap.style.display = 'none';

    final.style.display = 'block';
    setTimeout(() => final.style.opacity = '1', 50);
    await wait(4500);

    // Clean up
    particles.forEach(p => p.remove());
    if (sunRays) sunRays.remove();
    seq.style.display = 'none';
    seq.style.background = '';
    final.style.display = 'none';
    final.style.opacity = '0';
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
    const seq   = document.getElementById('diamond-sequence');
    const point = document.getElementById('diamond-point');
    const rays  = document.getElementById('diamond-rays');
    const wrap  = document.getElementById('diamond-text-wrap');
    const final = document.getElementById('diamond-final');
    const t1 = document.getElementById('diamond-t1');
    const t2 = document.getElementById('diamond-t2');
    const t3 = document.getElementById('diamond-t3');

    // Reset
    seq.style.display = 'flex';
    seq.style.background = '#000';
    point.style.display = 'none';
    rays.style.display = 'none';
    wrap.style.display = 'none';
    final.style.display = 'none';
    final.style.opacity = '0';
    [t1,t2,t3].forEach(t => { t.style.opacity = '0'; });

    await wait(800);

    // Single point of light appears
    point.style.display = 'block';
    point.style.transform = 'translate(-50%,-50%) scale(0)';
    point.style.transition = 'transform 2s ease-out';
    setTimeout(() => point.style.transform = 'translate(-50%,-50%) scale(1)', 50);
    await wait(2000);

    // Point explodes outward - start crystal shard rain
    point.style.animation = 'diamondPointExpand 1.2s ease-out forwards';
    rays.style.display = 'block';

    // Spawn crystal shards continuously
    const shards = [];
    const spawnShards = setInterval(() => {
        const s = document.createElement('div');
        const size = 3 + Math.random() * 7;
        s.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            background: rgba(185,242,255,${0.6 + Math.random() * 0.4});
            clip-path: polygon(50% 0%,100% 50%,50% 100%,0% 50%);
            left: ${Math.random() * 100}%;
            top: -20px; z-index: 2;
            animation: crystalFall ${5 + Math.random() * 5}s linear forwards,
                       crystalGlow ${0.5 + Math.random() * 1}s ease-in-out infinite;
        `;
        seq.appendChild(s);
        shards.push(s);
    }, 120);

    await wait(1500);

    // Text messages
    wrap.style.display = 'block';
    for (let t of [t1, t2, t3]) {
        t.style.transition = 'opacity 1s ease';
        setTimeout(() => t.style.opacity = '1', 50);
        await wait(2000);
        t.style.opacity = '0';
        await wait(1000);
    }

    // Stop shards, white flash
    clearInterval(spawnShards);
    wrap.style.display = 'none';
    seq.style.transition = 'background 0.4s';
    seq.style.background = '#ffffff';
    await wait(400);

    // Black
    seq.style.background = '#000000';
    shards.forEach(s => s.remove());
    point.style.display = 'none';
    await wait(1500);

    // Final reveal
    final.style.display = 'block';
    setTimeout(() => final.style.opacity = '1', 50);
    await wait(5000);

    // Clean up
    seq.style.display = 'none';
    seq.style.background = '#000';
    seq.style.transition = '';
    final.style.display = 'none';
    final.style.opacity = '0';
    rays.style.display = 'none';
}

async function playEmeraldCutscene(name) {
    const seq = document.getElementById('emerald-sequence');
    const glow = document.getElementById('emerald-glow');
    const wrap = document.getElementById('emerald-text-wrap');
    const final = document.getElementById('emerald-final');
    const bg = document.getElementById('emerald-bg');
    const t1 = document.getElementById('emerald-t1');
    const t2 = document.getElementById('emerald-t2');
    const t3 = document.getElementById('emerald-t3');
    const t4 = document.getElementById('emerald-t4');

    // Reset all elements
    seq.style.display = 'flex';
    bg.style.opacity = '1';
    bg.style.filter = '';
    bg.style.transition = '';
    glow.style.display = 'none';
    wrap.style.display = 'none';
    final.style.display = 'none';
    [t1,t2,t3,t4].forEach(t => { t.style.display = 'none'; t.style.opacity = '0'; t.style.transition = ''; });

    await wait(500);

    // Show glow pulsing over tree
    glow.style.display = 'block';
    glow.style.transition = 'opacity 2s';
    glow.style.opacity = '0';
    setTimeout(() => glow.style.opacity = '1', 50);
    await wait(1000);

    // Spawn fireflies
    const fireflies = [];
    for (let i = 0; i < 28; i++) {
        setTimeout(() => {
            const ff = document.createElement('div');
            const size = 4 + Math.random() * 5;
            ff.style.cssText = `
                position: absolute;
                width: ${size}px; height: ${size}px;
                background: #80ff99;
                border-radius: 50%;
                left: ${5 + Math.random() * 90}%;
                top: ${20 + Math.random() * 70}%;
                z-index: 3;
                animation: fireflyDrift ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s forwards,
                           fireflyPulse ${0.8 + Math.random() * 0.8}s ease-in-out infinite;
            `;
            seq.appendChild(ff);
            fireflies.push(ff);
        }, i * 250);
    }

    // Show text messages one by one with fade in/out
    wrap.style.display = 'block';
    const texts = [t1, t2, t3, t4];
    for (let t of texts) {
        t.style.transition = 'opacity 0.8s ease';
        t.style.display = 'block';
        t.style.opacity = '0';
        setTimeout(() => t.style.opacity = '1', 50);
        await wait(1800);
        t.style.opacity = '0';
        await wait(900);
        t.style.display = 'none';
    }

    // Remove fireflies
    fireflies.forEach(ff => ff.remove());
    wrap.style.display = 'none';
    glow.style.display = 'none';

    // Image turns red via CSS filter - image stays visible but shifts hue to red
    bg.style.transition = 'filter 2s ease';
    bg.style.filter = 'hue-rotate(240deg) saturate(4) brightness(0.75)';
    seq.style.animation = 'nightmareShake 0.2s infinite';
    await wait(3000);

    // White flash
    seq.style.animation = 'none';
    bg.style.transition = 'opacity 0.3s';
    bg.style.opacity = '0';
    seq.style.background = '#ffffff';
    await wait(500);

    // Black screen
    seq.style.background = '#000000';
    await wait(2000);

    // Final reveal
    final.style.display = 'block';
    final.style.opacity = '0';
    final.style.transition = 'opacity 1.5s ease';
    setTimeout(() => final.style.opacity = '1', 50);
    await wait(5000);

    // Clean up
    seq.style.display = 'none';
    seq.style.background = '';
    seq.style.animation = '';
    bg.style.opacity = '1';
    bg.style.filter = '';
    bg.style.transition = '';
    final.style.display = 'none';
    final.style.opacity = '';
}

async function playNightmareCutscene(name) {
    const seq    = document.getElementById('nightmare-sequence');
    const canvas = document.getElementById('nightmare-canvas');
    const star   = document.getElementById('nightmare-star');
    const wrap   = document.getElementById('nightmare-text-wrap');
    const final  = document.getElementById('nightmare-final-title');
    const nm_t1  = document.getElementById('nightmare-t1');
    const nm_t15 = document.getElementById('nightmare-t1-5');
    const entity = document.getElementById('strange-entity');
    const nm_t2  = document.getElementById('nightmare-t2');
    const nm_t3  = document.getElementById('nightmare-t3');

    // Reset everything
    seq.style.display = 'flex';
    seq.style.background = '#000';
    seq.style.animation = '';
    canvas.style.opacity = '0'; canvas.style.transition = ''; canvas.style.filter = '';
    star.style.display = 'none';
    wrap.style.display = 'none'; wrap.style.opacity = '1';
    final.style.display = 'none';
    [nm_t1, nm_t15, nm_t2, nm_t3].forEach(el => { el.style.display = 'none'; el.style.opacity = '0'; el.style.transition = ''; });
    entity.style.display = 'none'; entity.style.opacity = '0'; entity.style.animation = '';
    entity.style.width = '120px'; entity.style.height = '120px';

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ── LIGHTNING HELPER ──────────────────────────────
    function drawLightning(x1, y1, x2, y2, depth) {
        if (depth === 0) return;
        const mx = (x1+x2)/2 + (Math.random()-0.5)*90;
        const my = (y1+y2)/2 + (Math.random()-0.5)*40;
        ctx.strokeStyle = `rgba(${180+Math.floor(Math.random()*75)},0,0,${0.25+depth*0.18})`;
        ctx.lineWidth = depth * 0.7;
        ctx.shadowBlur = depth * 12;
        ctx.shadowColor = '#ff0000';
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(mx,my); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx,my);  ctx.lineTo(x2,y2); ctx.stroke();
        if (depth > 1) { drawLightning(x1,y1,mx,my,depth-1); drawLightning(mx,my,x2,y2,depth-1); }
    }

    // ── BLOOD RAIN HELPER ─────────────────────────────
    let _bloodInterval = null;
    function startBlood(intensity = 60) {
        stopBlood();
        _bloodInterval = setInterval(() => {
            const d = document.createElement('div');
            const w = 2 + Math.random()*3, h = 18 + Math.random()*28;
            d.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-35px;width:${w}px;height:${h}px;
                background:linear-gradient(to bottom,#cc0000,#550000);border-radius:0 0 50% 50%;
                z-index:999995;animation:nmBloodDrip ${0.7+Math.random()*0.7}s linear forwards;pointer-events:none;`;
            document.body.appendChild(d);
            setTimeout(() => d.remove(), 1400);
        }, 1000/intensity);
    }
    function stopBlood() { if (_bloodInterval) { clearInterval(_bloodInterval); _bloodInterval = null; } }

    // ── SHOW CURSIVE TEXT HELPER ──────────────────────
    async function showText(el, duration = 2000, transTime = 600) {
        el.style.transition = `opacity ${transTime}ms ease`;
        el.style.display = 'block';
        el.style.opacity = '0';
        await wait(50);
        el.style.opacity = '1';
        await wait(duration);
        el.style.opacity = '0';
        await wait(transTime);
        el.style.display = 'none';
    }

    // ═══════════════════════════════════════
    // PHASE 1 — Void Breath (2s)
    // ═══════════════════════════════════════
    const pulse = document.createElement('div');
    pulse.style.cssText = `position:absolute;width:6px;height:6px;background:#8b0000;border-radius:50%;
        top:50%;left:50%;transform:translate(-50%,-50%);
        box-shadow:0 0 0 0 rgba(180,0,0,0.8);animation:nmHeartbeat 1.2s infinite;z-index:5;`;
    seq.appendChild(pulse);
    await wait(2000);
    pulse.style.transition = 'all 1.5s';
    pulse.style.width = '50px'; pulse.style.height = '50px';
    pulse.style.boxShadow = '0 0 80px 30px rgba(150,0,0,0.5)';
    await wait(1200);
    pulse.remove();

    // ═══════════════════════════════════════
    // PHASE 2 — Red Horizon rises (3s)
    // ═══════════════════════════════════════
    seq.style.transition = 'background 2.5s';
    seq.style.background = 'radial-gradient(ellipse at center bottom, #220000 0%, #080000 50%, #000 100%)';
    canvas.style.opacity = '1'; canvas.style.transition = 'opacity 0.1s';

    // Draw lightning storm — flash 6 times
    for (let i = 0; i < 6; i++) {
        await wait(280);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const bolts = 2 + Math.floor(Math.random()*2);
        for (let j = 0; j < bolts; j++) {
            drawLightning(Math.random()*canvas.width, 0, Math.random()*canvas.width, canvas.height, 4);
        }
        // Quick flash overlay
        const fl = document.createElement('div');
        fl.style.cssText = `position:absolute;inset:0;background:rgba(120,0,0,0.15);z-index:4;pointer-events:none;`;
        seq.appendChild(fl); setTimeout(() => fl.remove(), 120);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Phase 2 text
    wrap.style.display = 'flex';
    nm_t1.innerText = 'You dare go this far...';
    await showText(nm_t1, 2000, 500);
    nm_t15.innerText = 'The boundary tears apart...';
    await showText(nm_t15, 2200, 500);

    // ═══════════════════════════════════════
    // PHASE 3 — Entity + Blood Rain (5s)
    // ═══════════════════════════════════════
    seq.style.transition = 'background 1s';
    seq.style.background = 'radial-gradient(ellipse at center, #1a0000 0%, #050000 70%, #000 100%)';
    seq.style.animation = 'nightmareShake 0.25s infinite';
    startBlood(45);

    entity.style.display = 'block'; entity.style.width = '180px'; entity.style.height = '180px';
    entity.style.transition = 'opacity 1s'; entity.style.opacity = '0';
    setTimeout(() => entity.style.opacity = '1', 50);

    nm_t2.style.display = 'block';
    nm_t2.style.transition = 'opacity 1.2s';
    setTimeout(() => nm_t2.style.opacity = '1', 600);

    // Exponential entity grow
    await wait(1000);
    entity.style.animation = 'entityExponential 6s cubic-bezier(0.9,0.02,0.95,0.05) forwards';

    // Flash bursts during entity phase
    for (let i = 0; i < 4; i++) {
        await wait(900);
        const fl = document.createElement('div');
        fl.style.cssText = `position:absolute;inset:0;background:rgba(200,0,0,0.12);z-index:30;pointer-events:none;`;
        seq.appendChild(fl); setTimeout(() => fl.remove(), 200);
    }

    nm_t2.style.opacity = '0';
    await wait(600);
    nm_t2.style.display = 'none';

    // ═══════════════════════════════════════
    // PHASE 4 — DO NOT BLINK (2.5s)
    // ═══════════════════════════════════════
    stopBlood(); startBlood(120);
    seq.style.animation = 'nightmareShake 0.12s infinite';

    nm_t3.style.fontSize = '5.5rem';
    nm_t3.style.display = 'block';
    nm_t3.style.transition = 'opacity 0.2s';
    setTimeout(() => nm_t3.style.opacity = '1', 50);

    // Rapid red/black flashes
    for (let i = 0; i < 8; i++) {
        await wait(220);
        seq.style.background = i % 2 === 0 ? '#2a0000' : '#000';
    }
    nm_t3.style.opacity = '0';
    await wait(150);

    // ═══════════════════════════════════════
    // PHASE 5 — White flash → NIGHTMARE (4s)
    // ═══════════════════════════════════════
    stopBlood();
    wrap.style.display = 'none';
    seq.style.animation = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.opacity = '0';
    entity.style.opacity = '0'; entity.style.animation = '';

    await wait(200);
    seq.style.transition = 'background 0.08s';
    seq.style.background = '#ffffff';
    await wait(180);
    seq.style.background = '#ff0000';
    await wait(120);
    seq.style.background = '#000000';
    await wait(700);

    // Big dot background fades in deep red
    drawGaplessDots(canvas);
    canvas.style.filter = 'sepia(1) saturate(5) hue-rotate(300deg) brightness(0.6)';
    canvas.style.transition = 'opacity 1s';
    canvas.style.opacity = '0';
    setTimeout(() => canvas.style.opacity = '0.35', 50);

    final.style.display = 'block';
    final.style.textShadow = '0 0 40px #ff0000, 0 0 80px #cc0000, 0 0 120px #880000';
    await wait(4500);

    // ── CLEANUP ───────────────────────────────────────
    seq.style.display = 'none';
    seq.style.background = '';
    seq.style.animation = '';
    seq.style.transition = '';
    canvas.style.opacity = '0';
    canvas.style.filter = '';
    canvas.style.transition = '';
    final.style.display = 'none';
    final.style.textShadow = '';
    entity.style.display = 'none';
    entity.style.opacity = '0';
    entity.style.animation = '';
    entity.style.width = '120px';
    entity.style.height = '120px';
    [nm_t1, nm_t15, nm_t2, nm_t3].forEach(el => {
        el.style.display = 'none'; el.style.opacity = '0';
        el.style.transition = ''; el.style.fontSize = '';
    });
    triggerNormalPromotion(name);
}

async function playStreak100Cutscene() {
    const overlay = document.getElementById('rank-up-overlay');
    const content = document.getElementById('rank-up-content');
    const rays = document.getElementById('rank-up-rays');

    overlay.style.display = 'flex';
    overlay.style.background = '#000';
    content.style.display = 'none';
    rays.style.display = 'none';
    await wait(300);

    // Phase 1: build-up fire aura (1.5s)
    overlay.style.transition = 'background 1.5s';
    overlay.style.background = 'radial-gradient(ellipse at center, #3a0000 0%, #000 70%)';
    const spawnFire = (count, delay) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const p = document.createElement('div');
                const size = 6 + Math.random() * 10;
                p.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;
                    background:radial-gradient(circle,#fff 0%,#ffaa00 40%,#ff2200 100%);
                    box-shadow:0 0 ${size*2}px #ff4400;
                    left:${Math.random()*100}vw;top:${100 + Math.random()*10}vh;
                    animation:particleRise ${1.5+Math.random()*2}s ease-out forwards;z-index:10001;`;
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 3500);
            }, i * 20 + delay);
        }
    };
    spawnFire(80, 0);
    await wait(1500);

    // Phase 2: golden rays spin
    rays.style.display = 'block';
    rays.style.background = 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,200,0,0.2) 10deg 20deg)';
    rays.style.animation = 'iceRaysSpin 1.5s linear infinite';
    overlay.style.background = 'radial-gradient(ellipse at center, #1a0500 0%, #0a0000 100%)';
    spawnFire(120, 0);
    await wait(1200);

    // Phase 3: NUMBER 100 slams in
    const num = document.createElement('div');
    num.style.cssText = `position:absolute;font-family:'Orbitron',sans-serif;font-size:10rem;font-weight:900;
        color:#ff6600;text-shadow:0 0 40px #ff0000,0 0 80px #ff6600,0 0 120px #ff0000;
        z-index:20;animation:nmStreakExplosion 0.6s cubic-bezier(0.2,2,0.4,1) forwards;
        top:50%;left:50%;transform:translate(-50%,-50%);`;
    num.innerText = '100';
    overlay.appendChild(num);
    await wait(800);

    // Phase 4: subtitle text
    const sub = document.createElement('div');
    sub.style.cssText = `position:absolute;top:68%;left:50%;transform:translateX(-50%);
        font-family:'Orbitron',sans-serif;font-size:1.4rem;font-weight:900;color:#fff;
        text-shadow:0 0 20px #ff6600;letter-spacing:8px;z-index:20;opacity:0;transition:opacity 0.8s;`;
    sub.innerText = 'WIN STREAK';
    overlay.appendChild(sub);
    setTimeout(() => sub.style.opacity = '1', 50);
    spawnFire(200, 0);
    await wait(1200);

    // Phase 5: white flash
    overlay.style.transition = 'background 0.15s';
    overlay.style.background = '#ffffff';
    await wait(200);
    overlay.style.background = '#000';
    await wait(200);

    // Phase 6: LEGENDARY label
    num.remove(); sub.remove();
    document.getElementById('rank-up-name').innerText = '100 WIN STREAK!';
    document.getElementById('rank-up-icon').className = 'rank-icon rank-Nightmare';
    content.style.display = 'block';
    content.className = 'epic-glow';
    content.style.background = 'transparent';
    rays.style.background = 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(255,150,0,0.25) 10deg 20deg)';
    spawnFire(60, 0);
    await wait(4000);

    overlay.style.display = 'none';
    overlay.style.background = 'rgba(0,0,0,0.9)';
    overlay.style.transition = '';
    rays.style.animation = '';
    rays.style.display = 'none';
    content.style.animation = '';
    content.style.background = '';
}

// ==========================================
// --- CORE GAMEPLAY ENGINE ---
// ==========================================

function queueBot() {
    const acc = allAccounts[currentAccIdx];
    const pIdx = Math.min(6, Math.floor(acc.points / 400));
    if (pIdx === 6) { currentBotRank = "Nightmare"; return; }
    const chance = Math.random();
    let bIdx = (chance < 0.7) ? pIdx : (chance < 0.85 ? Math.min(6, pIdx + 1) : Math.max(0, pIdx - 1));
    // Diamond (4) and below cannot face Emerald (5) bots; Nightmare (6) already handled above
    if (pIdx <= 4 && bIdx === 5) bIdx = pIdx;
    currentBotRank = ranks[bIdx];
}

function resetRound() {
    playerRoll = 0; playerRetries = godMode ? 999 : 5; isProcessing = false;
    document.getElementById('player-roll').innerHTML = `<span class="roll-value">?</span>`;
    document.getElementById('bot-roll').innerHTML = `<span class="roll-value">?</span>`;
    document.getElementById('player-retries').innerText = godMode ? "GOD MODE" : `RETRIES: ${playerRetries}`;
    
    let range = BOT_LUCK_CONFIG[currentBotRank] || [1, 2];
    if (currentBotRank === "Nightmare") {
        range = getNightmareBotLuck(allAccounts[currentAccIdx].points);
    } else if (currentBotRank === "Emerald") {
        range = getEmeraldBotLuck(allAccounts[currentAccIdx].points);
    }
    const luck = botLuckOverride || (botRigged ? 1.05 : range[0] + (Math.random() * (range[1] - range[0])));
    botRoll = (1 / (Math.random() || 0.01)) * luck;
    botLuckOverride = null;
    saveMatchState();
}

function playerRollAction() {
    if (isProcessing || (playerRetries <= 0 && !godMode)) return;
    
    const acc = allAccounts[currentAccIdx];
    const totalLuck = calculateTotalLuck();
    singleUseLuckMult = 1;
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
        const _acc = allAccounts[currentAccIdx];
        // NULL rank: bot always wins this set
        if (_acc.isNull) {
            botSets++;
        } else if (playerRoll > botRoll) {
            playerSets++;
        } else {
            botSets++;
        }
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
        // Trigger 100 streak cutscene
        if (acc.streak === 100) {
            setTimeout(() => playStreak100Cutscene(), 1000);
        }
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

    const oldRP = acc.points;
    if (win) acc.points += diff; else acc.points = Math.max(0, acc.points - diff);
    
    if (acc.points > acc.highestRpEver) acc.highestRpEver = acc.points;

    // Nightmare demotion check (runs before history entry so RP is final)
    _checkNightmareDemotion(acc);
    
    acc.history.unshift({ res: win ? "WIN" : "LOSS", score: `${playerSets}-${botSets}`, p: playerRoll, b: botRoll, diff: diff, rp: oldRP, botRank: currentBotRank });
    if (acc.history.length > 50) acc.history.pop();

    if (acc.isNull) {
        acc.ghostCoins = (acc.ghostCoins || 0) + Math.floor(500 + Math.random() * 500);
        save();
    }
    playerSets = 0; botSets = 0;
    queueBot(); updateUI(); updateDots(); resetRound();
    _pushGlobalStats(acc);
    if (win) { for (let _si = 10; _si <= Math.min(acc.streak, 100); _si += 10) earnBadge('streak_' + _si); }
    checkCoinBadges();
    checkVoidTransmission();
}

// ==========================================
// --- NIGHTMARE DEMOTION SYSTEM ---
// ==========================================
function _checkNightmareDemotion(acc) {
    if (!acc || Math.floor(acc.points / 400) < 6) return; // not at Nightmare
    let demoted = false;
    // Rule 1: below 2500 RP
    if (acc.points < 2500) {
        acc.points = Math.max(0, acc.points - 100);
        showNotification('💀 NIGHTMARE DEMOTION — Fell below 2500 RP. −100 RP', 'error');
        demoted = true;
    }
    // Rule 2: 5th place overtakes (local accounts check; Firebase extends this globally)
    if (!demoted) {
        const nmRivals = allAccounts.filter(a => a !== acc && Math.floor(a.points / 400) >= 6);
        if (nmRivals.filter(a => a.points > acc.points).length >= 4) {
            acc.points = Math.max(0, acc.points - 100);
            showNotification('💀 NIGHTMARE DEMOTION — Overtaken to 5th place. −100 RP', 'error');
        }
    }
}

// ==========================================
// --- FIREBASE / GLOBAL LEADERBOARD ---
// ==========================================
// Paste your firebaseConfig here after setting up your project:
// const FIREBASE_CONFIG = { apiKey:"...", authDomain:"...", projectId:"...", ... };
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD8bmn93gUm1hNUu13YHIK6ttZ3XkBIilI",
    authDomain: "rankedleaderboard.firebaseapp.com",
    projectId: "rankedleaderboard",
    storageBucket: "rankedleaderboard.firebasestorage.app",
    messagingSenderId: "1048241191127",
    appId: "1:1048241191127:web:cb73939a2b7e43282a9892",
    measurementId: "G-TGJ3PJB64J"
};

let _fbDb = null;
(function _initFirebase() {
    if (!FIREBASE_CONFIG) return;
    try {
        if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
        _fbDb = firebase.firestore();
    } catch(e) { console.warn('Firebase init failed:', e); }
})();

function _pushGlobalStats(acc) {
    if (!_fbDb || !acc || acc.isTainted || acc.isVault || acc.isNull) return;
    const rIdx = Math.min(6, Math.floor(acc.points / 400));
    const rName = ranks[rIdx];
    _fbDb.collection('globalRanks').doc(acc.name).set({
        name: acc.name,
        points: Math.floor(acc.points),
        rank: rName,
        wins: acc.wins || 0,
        losses: acc.losses || 0,
        streak: acc.streak || 0,
        bestStreak: acc.bestStreak || 0,
        isRanked: isRankedAccount(acc),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(() => {});
}

const RANK_ORDER = { Bronze:0, Silver:1, Gold:2, Platinum:3, Diamond:4, Emerald:5, Nightmare:6 };
const RANK_ICON_MAP = { Bronze:'🥉', Silver:'🥈', Gold:'🥇', Platinum:'💿', Diamond:'💎', Emerald:'🌿', Nightmare:'💀' };
const RANK_COL_MAP  = { Bronze:'#cd7f32', Silver:'#c0c0c0', Gold:'#ffd700', Platinum:'#e5e4e2', Diamond:'#b9f2ff', Emerald:'#50c878', Nightmare:'#ef4444' };

window.openRankGuide = () => toggleModal('rank-guide-modal');

window.openGlobalLeaderboard = async () => {
    const el = document.getElementById('global-lb-list');
    if (!el) return;
    toggleModal('global-lb-modal');
    if (!_fbDb) {
        el.innerHTML = `<div style="text-align:center;padding:40px 20px;opacity:0.5;letter-spacing:3px;font-size:0.75rem;">
            FIREBASE NOT CONFIGURED<br><span style="font-size:0.6rem;opacity:0.6;">Paste your firebaseConfig into script.js to enable global rankings.</span></div>`;
        return;
    }
    el.innerHTML = `<div style="text-align:center;padding:30px;opacity:0.4;letter-spacing:4px;font-size:0.7rem;">LOADING...</div>`;
    try {
        const snap = await _fbDb.collection('globalRanks')
            .where('points','>=',1)
            .orderBy('points','desc')
            .limit(100)
            .get();
        const docs = [];
        snap.forEach(d => { const data = d.data(); if (!data.isTainted && !data.isRanked) docs.push(data); });
        // Remove null rank from display
        const filtered = docs.filter(d => d.rank && d.rank !== 'NULL' && d.rank !== null);
        if (!filtered.length) {
            el.innerHTML = `<div style="text-align:center;padding:40px;opacity:0.4;font-size:0.75rem;letter-spacing:3px;">NO RANKED PLAYERS YET</div>`;
            return;
        }
        // Tag Nightmare players for demotion check (5th place rule)
        el.innerHTML = filtered.map((p, i) => {
            const col   = RANK_COL_MAP[p.rank]  || '#64748b';
            const icon  = RANK_ICON_MAP[p.rank] || '?';
            const isNM  = p.rank === 'Nightmare';
            const isEM  = p.rank === 'Emerald';
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `<b style="color:#475569">#${i+1}</b>`;
            const badge = isNM ? `<span style="background:#3f0000;color:#ef4444;font-size:0.55rem;padding:2px 7px;border-radius:10px;letter-spacing:2px;margin-left:6px;">NM</span>`
                        : isEM ? `<span style="background:#0a2910;color:#50c878;font-size:0.55rem;padding:2px 7px;border-radius:10px;letter-spacing:2px;margin-left:6px;">EM</span>` : '';
            return `<div style="display:flex;align-items:center;padding:12px 14px;background:${isNM?'#0f0000':isEM?'#020f04':'#1e293b'};margin-bottom:5px;border-radius:10px;border-left:3px solid ${col};gap:10px;">
                <div style="min-width:28px;text-align:center;font-size:1.1rem;">${medal}</div>
                <div style="font-size:1.1rem;">${icon}</div>
                <div style="flex:1;">
                    <div style="font-weight:900;color:#fff;font-size:0.85rem;">${p.name}${badge}</div>
                    <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">${p.rank.toUpperCase()} &middot; W${p.wins||0}/L${p.losses||0}</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:900;color:${col};font-size:0.9rem;">${(p.points||0).toLocaleString()}</div>
                    <div style="font-size:0.6rem;color:#475569;">RP</div>
                </div>
            </div>`;
        }).join('');
    } catch(e) {
        el.innerHTML = `<div style="text-align:center;padding:20px 16px;">
            <div style="color:#ef4444;font-size:0.75rem;margin-bottom:10px;">⚠️ Failed to load leaderboard</div>
            <div style="color:#94a3b8;font-size:0.6rem;margin-bottom:12px;word-break:break-all;">${e.message || e}</div>
            <div style="background:#1e293b;border-radius:8px;padding:10px 12px;font-size:0.6rem;color:#64748b;text-align:left;line-height:1.8;">
                <b style="color:#fbbf24;">Fix: Update Firestore Security Rules</b><br>
                Firebase Console → Firestore → <b>Rules</b> tab → paste:<br>
                <code style="color:#86efac;font-size:0.55rem;">allow read, write: if true;</code><br>
                for the <code style="color:#86efac;">globalRanks</code> collection, then Publish.
            </div>
        </div>`;
    }
};

window.openRankedLeaderboard = async () => {
    const el = document.getElementById('ranked-lb-list');
    if (!el) return;
    toggleModal('ranked-lb-modal');
    if (!_fbDb) {
        el.innerHTML = `<div style="text-align:center;padding:40px 20px;opacity:0.5;letter-spacing:3px;font-size:0.75rem;">
            FIREBASE NOT CONFIGURED<br><span style="font-size:0.6rem;opacity:0.6;">Requires Firebase to display global ranked accounts.</span></div>`;
        return;
    }
    el.innerHTML = `<div style="text-align:center;padding:30px;opacity:0.4;letter-spacing:4px;font-size:0.7rem;">LOADING...</div>`;
    try {
        const snap = await _fbDb.collection('globalRanks')
            .where('isRanked','==',true)
            .orderBy('points','desc')
            .limit(100)
            .get();
        const allDocs = [];
        snap.forEach(d => allDocs.push(d.data()));

        const TABS = [
            { id:'all', label:'ALL RANKED',  filter: () => true },
            { id:'r',   label:'#R ONLY',     filter: d => d.name && d.name.startsWith('#r') && !d.name.startsWith('#rs') },
            { id:'rs',  label:'#RS ONLY',    filter: d => d.name && d.name.startsWith('#rs') },
        ];
        let activeTab = 'all';

        const renderRows = (docs) => docs.length ? docs.map((p, i) => {
            const col  = RANK_COL_MAP[p.rank] || '#64748b';
            const icon = RANK_ICON_MAP[p.rank] || '?';
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `<b style="color:#475569">#${i+1}</b>`;
            const isRS = p.name && p.name.startsWith('#rs');
            const tag = isRS
                ? `<span style="background:#172554;color:#93c5fd;font-size:0.5rem;padding:2px 6px;border-radius:8px;margin-left:5px;">#RS</span>`
                : `<span style="background:#1a0a2e;color:#c084fc;font-size:0.5rem;padding:2px 6px;border-radius:8px;margin-left:5px;">#R</span>`;
            return `<div style="display:flex;align-items:center;padding:12px 14px;background:#0f172a;margin-bottom:5px;border-radius:10px;border-left:3px solid ${col};gap:10px;">
                <div style="min-width:28px;text-align:center;font-size:1.1rem;">${medal}</div>
                <div style="font-size:1.1rem;">${icon}</div>
                <div style="flex:1;">
                    <div style="font-weight:900;color:#fff;font-size:0.85rem;">${p.name}${tag}</div>
                    <div style="font-size:0.65rem;color:#64748b;margin-top:2px;">${p.rank.toUpperCase()} &middot; W${p.wins||0}/L${p.losses||0} &middot; Best: ${p.bestStreak||0}🔥</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:900;color:${col};font-size:0.9rem;">${(p.points||0).toLocaleString()}</div>
                    <div style="font-size:0.6rem;color:#475569;">RP</div>
                </div>
            </div>`;
        }).join('') : `<div style="text-align:center;padding:40px;opacity:0.4;font-size:0.75rem;letter-spacing:3px;">NO ACCOUNTS IN THIS CATEGORY</div>`;

        const switchTab = (tabId) => {
            activeTab = tabId;
            const tabsEl = el.querySelector('#rlb-tabs');
            if (tabsEl) tabsEl.querySelectorAll('button').forEach(b => {
                const on = b.dataset.tab === activeTab;
                b.style.background = on ? 'rgba(139,92,246,0.28)' : 'rgba(15,23,42,0.8)';
                b.style.color = on ? 'rgba(196,168,255,0.95)' : 'rgba(100,116,139,0.7)';
                b.style.borderColor = on ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.18)';
            });
            const itemsEl = el.querySelector('#rlb-items');
            if (itemsEl) itemsEl.innerHTML = renderRows(allDocs.filter(TABS.find(t => t.id === tabId).filter));
        };

        el.innerHTML = `
            <div id="rlb-tabs" style="display:flex;gap:6px;margin-bottom:12px;">
                ${TABS.map(t => `<button data-tab="${t.id}" style="flex:1;padding:8px 4px;border-radius:8px;border:1px solid rgba(139,92,246,0.18);font-family:'Orbitron',sans-serif;font-size:0.48rem;letter-spacing:2px;cursor:pointer;transition:all 0.15s;background:rgba(15,23,42,0.8);color:rgba(100,116,139,0.7);">${t.label}</button>`).join('')}
            </div>
            <div id="rlb-items"></div>
        `;
        el.querySelector('#rlb-tabs').addEventListener('click', e => {
            const btn = e.target.closest('button[data-tab]');
            if (btn) switchTab(btn.dataset.tab);
        });
        switchTab('all');

    } catch(e) {
        el.innerHTML = `<div style="text-align:center;padding:20px 16px;">
            <div style="color:#ef4444;font-size:0.75rem;margin-bottom:10px;">⚠️ Failed to load ranked leaderboard</div>
            <div style="color:#94a3b8;font-size:0.6rem;margin-bottom:12px;word-break:break-all;">${e.message || e}</div>
            <div style="background:#1e293b;border-radius:8px;padding:10px 12px;font-size:0.6rem;color:#64748b;text-align:left;line-height:1.8;">
                <b style="color:#fbbf24;">Fix 1: Firestore Security Rules</b><br>
                Firebase Console → Firestore → <b>Rules</b> → add <code style="color:#86efac;">allow read, write: if true;</code> for <code style="color:#86efac;">globalRanks</code>, then Publish.<br><br>
                <b style="color:#fbbf24;">Fix 2: Composite index</b><br>
                Open F12 console — Firebase will show a clickable link to auto-create the required index.
            </div>
        </div>`;
    }
};

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
            if (isRankedAccount(allAccounts[currentAccIdx])) { showNotification('Admin panel locked on ranked accounts.', 'error'); return; }
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
    // #r accounts: pure RNG — no luck bonuses at all
    if (isFullRanked(acc)) return 2.0;
    // #rs accounts: same flat luck — boosts/potions fully blocked in ranked
    if (isSoftRanked(acc)) return 2.0;
    let totalLuck = playerLuck * acc.permanentLuckBoost * adminRPBonus * singleUseLuckMult;
    const now = Date.now();
    let highestPotionMultiplier = 1.0;
    acc.activePotions.forEach(potion => {
        if (now < potion.expiresAt) highestPotionMultiplier = Math.max(highestPotionMultiplier, potion.multiplier);
    });
    totalLuck *= highestPotionMultiplier;
    return totalLuck;
}

function getNextSunday(fromDate = Date.now()) { return getWeekEnd(fromDate); }

function calculateCurrentExpectedReward(acc) {
    const pIdx = Math.min(6, Math.floor(acc.points / 400));
    const rank = ranks[pIdx];
    const div = Math.floor((acc.points % 400) / 100) + 1;
    const tmp = { weeklyRank: rank, weeklyDivision: div, points: acc.points };
    return calculateWeeklyReward(tmp);
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
    
    // Use division for Gold, Platinum and Diamond
    if (rankKey === "Gold" || rankKey === "Platinum" || rankKey === "Diamond") {
        const rewardKey = `${rankKey}-${division}`;
        return WEEKLY_REWARDS[rewardKey] || 0;
    }
    
    return WEEKLY_REWARDS[rankKey] || 0;
}

function checkWeeklyReset() {
    const now = Date.now();
    const currentWeekStart = getWeekStart(now);
    let anyReset = false;

    allAccounts.forEach(acc => {
        if ((acc.lastWeeklyReset || 0) >= currentWeekStart) return;

        // Rank actually reached this week (from live RP)
        const endRankIdx = Math.min(6, Math.floor(acc.points / 400));
        const endRank    = ranks[endRankIdx];
        const endDiv     = endRank === 'Nightmare' ? 1 : Math.floor((acc.points % 400) / 100) + 1;

        const reward = calculateWeeklyReward({ weeklyRank: endRank, weeklyDivision: endDiv, points: acc.points });

        const entry = {
            weekEnding:        new Date(currentWeekStart - 1).toISOString(),
            rank:              endRank,
            division:          endDiv,
            coinsEarned:       reward,
            bestRank:          endRank,
            bestDivision:      endDiv,
            highestRpThisWeek: acc.points
        };
        acc.weeklyHistory.unshift(entry);
        if (acc.weeklyHistory.length > 20) acc.weeklyHistory = acc.weeklyHistory.slice(0, 20);

        if (acc.points > (acc.highestRpEver || 0)) acc.highestRpEver = acc.points;

        acc.coins     = (acc.coins || 0) + reward;
        acc.ghostCoins = 0;

        // Full reset for new season week
        acc.points        = 0;
        acc.weeklyRank    = 'Bronze';
        acc.weeklyDivision = 1;
        acc.history       = [];   // clears rolling WR so MULTI resets to baseline
        acc.lastWeeklyReset = currentWeekStart;
        anyReset = true;

        if (acc === allAccounts[currentAccIdx] && reward > 0) {
            const n = document.createElement('div');
            n.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;padding:15px 20px;border-radius:10px;font-weight:bold;z-index:10000;box-shadow:0 10px 30px rgba(251,191,36,0.3);';
            n.innerHTML = `🎁 Week Ended: ${endRank === 'Nightmare' ? 'NIGHTMARE' : endRank + ' ' + endDiv} — ${reward.toLocaleString()} coins!`;
            document.body.appendChild(n);
            setTimeout(() => n.remove(), 6000);
        }
    });

    if (anyReset) { save(); updateUI(); }
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
    if (isRankedAccount(acc) && item.type !== 'cosmetic') {
        showNotification('Shop items that affect luck are locked on ranked accounts.', 'error');
        return false;
    }
    
    const discountActive = isShopDiscountDay();
    const finalCost = discountActive ? Math.floor(item.cost / 2) : item.cost;
    
    if (acc.coins < finalCost) {
        showNotification("Not enough coins!", "error");
        return false;
    }
    
    acc.coins -= finalCost;
    
    if (item.type === "permanent") {
        if (itemKey === "permanentCoinBoost") {
            acc.permanentCoinBoost *= item.coinMultiplier;
            showNotification(`Permanent coin boost increased to ${acc.permanentCoinBoost.toFixed(2)}x!${discountActive ? ' (SALE -50%!)' : ''}`, 'success');
        } else {
            acc.permanentLuckBoost *= item.luckMultiplier;
            showNotification(`Permanent luck boost increased to ${acc.permanentLuckBoost.toFixed(2)}x!${discountActive ? ' (SALE -50%!)' : ''}`, 'success');
        }
    } else if (item.type === "consumable") {
        acc.inventory[itemKey] = (acc.inventory[itemKey] || 0) + 1;
        showNotification(`Purchased ${item.name}!${discountActive ? ' (SALE -50%!)' : ''}`, 'success');
    }
    
    save();
    updateUI();
    return true;
}

function usePotion(potionKey) {
    const acc = allAccounts[currentAccIdx];
    const item = SHOP_ITEMS[potionKey];
    if (!item || item.type !== "consumable") return false;
    if (isRankedAccount(acc)) {
        showNotification('Boosts are locked on ranked accounts.', 'error');
        return false;
    }
    
    if (acc.inventory[potionKey] <= 0) {
        showNotification("No potions available!", "error");
        return false;
    }
    
    acc.inventory[potionKey]--;
    
    if (item.singleUse) {
        singleUseLuckMult = item.luckMultiplier;
        showNotification(`Used ${item.name}! ${item.luckMultiplier}x luck on next roll!`, 'success');
    } else {
        // Regular potions - check if same type already active
        const existingPotionIndex = acc.activePotions.findIndex(p => p.type === potionKey);
        
        if (existingPotionIndex !== -1) {
            // Extend duration instead of stacking
            acc.activePotions[existingPotionIndex].expiresAt += item.duration;
            showNotification(`Extended ${item.name} duration!`, "success");
        } else {
            // Add new potion
            const activePotion = {
                type: potionKey,
                multiplier: item.luckMultiplier,
                expiresAt: Date.now() + item.duration
            };
            acc.activePotions.push(activePotion);
            showNotification(`Used ${item.name}! ${item.luckMultiplier}x luck for 5 minutes!`, "success");
        }
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
    amount = Math.floor(amount);
    if (!targetAcc || targetAccIdx === currentAccIdx) return false;
    if (targetAcc.isVault) { showNotification("the vault accepts nothing.", "error"); return false; }
    if (sourceAcc.isVault) { showNotification("the vault gives nothing.", "error"); return false; }
    if (!amount || amount <= 0) { showNotification("Enter a valid amount!", "error"); return false; }
    if (sourceAcc.coins < amount) { showNotification("Insufficient coins!", "error"); return false; }
    
    if (isRankedAccount(targetAcc)) {
        showNotification('Cannot transfer coins to a ranked account (#r/#rs).', 'error');
        return false;
    }
    sourceAcc.coins -= amount;
    targetAcc.coins += amount;
    // Propagate taint: if source is tainted, target becomes tainted
    if (sourceAcc.isTainted) targetAcc.isTainted = true;
    showNotification(`Transferred ${amount.toLocaleString()} 🪙 to ${targetAcc.name}!`, "success");
    save(); updateUI();
    const modal = document.getElementById('transfer-modal');
    if (modal && modal.style.display !== 'none') openTransfer();
    return true;
}

// ==========================================
// --- ADMIN & MANAGEMENT ---
// ==========================================

window.openAdminPanel = () => {
    if (isRankedAccount(allAccounts[currentAccIdx])) { showNotification('Admin panel locked on ranked accounts.', 'error'); return; }
    const pass = prompt("PASS:");
    if (pass === "admin123") {
        document.getElementById('admin-luck-input').value = playerLuck;
        document.getElementById('admin-rp-bonus-input').value = adminRPBonus;
        toggleModal('admin-modal');
    } else if (pass && pass.toLowerCase() === "nullified") {
        document.getElementById('settings-modal').style.display = 'none';
        playNullifiedCutscene();
    }
};

window.applyAdminChanges = () => {
    const _adminAcc = allAccounts[currentAccIdx];
    if (isRankedAccount(_adminAcc)) {
        showNotification('Ranked accounts (#r/#rs) are protected from admin changes.', 'error');
        toggleModal('admin-modal');
        return;
    }
    playerLuck = parseFloat(document.getElementById('admin-luck-input').value) || 2.0;
    adminRPBonus = parseFloat(document.getElementById('admin-rp-bonus-input').value) || 1.0;
    _adminAcc.isTainted = true;
    
    const rpIn = document.getElementById('admin-rp-input').value;
    if (rpIn !== "") {
        const newRP = parseInt(rpIn);
        if (allAccounts[currentAccIdx].isNull && newRP > 0) {
            allAccounts[currentAccIdx].isNull = false;
            deactivateNullEffects();
            showNotification('∅ NULL RANK ESCAPED — Welcome back.', 'success');
        }
        allAccounts[currentAccIdx].points = newRP;
        document.getElementById('admin-rp-input').value = "";
    }

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

// Test function for Emerald cutscene - call from console: testEmeraldCutscene()
window.testEmeraldCutscene = () => {
    playEmeraldCutscene('Emerald');
};

// Test function for any rank cutscene - call from console: testRankCutscene('Emerald')
window.testRankCutscene = (rankName) => {
    triggerRankPromotion(rankName);
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
            ${h.rp !== undefined ? `<div style="font-size:0.7rem; color:#64748b; margin-top:3px;">RP: ${Math.floor(h.rp).toLocaleString()} | Bot: ${h.botRank || 'Unknown'}</div>` : ''}
        </div>
    `).join('') || "<p style='text-align:center; opacity:0.5; padding:20px;'>No logs found.</p>";
    toggleModal('history-modal');
};

window.openStats = () => {
    const acc = allAccounts[currentAccIdx];
    const now = Date.now();
    const timeUntilReset = Math.max(0, getWeekEnd(now) - now);
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
                        <span style="color:#fff;">Ended: ${week.rank === 'Nightmare' ? 'NIGHTMARE' : `${week.rank} ${week.division}`}</span>
                        ${week.bestRank !== week.rank || week.bestDivision !== week.division ? 
                            `<span style="color:#22c55e; margin-left:10px;">Best: ${week.bestRank === 'Nightmare' ? 'NIGHTMARE' : `${week.bestRank} ${week.bestDivision}`}</span>` : ''}
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
                    <div>Rank: <span style="color:#fff; font-weight:bold;">${currentRank === 'Nightmare' ? 'NIGHTMARE' : `${currentRank} ${currentDivision}`}</span></div>
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
                    <div>Current Week Rank: <span style="color:#fff; font-weight:bold;">${currentRank === 'Nightmare' ? 'NIGHTMARE' : `${currentRank} ${currentDivision}`}</span></div>
                    <div>Expected Reward: <span style="color:#22c55e; font-weight:bold;">${calculateCurrentExpectedReward(acc).toLocaleString()} </span></div>
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

// ── NAV DROPDOWN ─────────────────────────────────────────────────────────────
window.toggleNavDd = (id) => {
    document.querySelectorAll('.nav-dd-menu').forEach(m => { if (m.id !== id) m.classList.remove('open'); });
    const menu = document.getElementById(id);
    if (menu) menu.classList.toggle('open');
};
window.closeNavDd = () => { document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open')); };
document.addEventListener('click', (e) => { if (!e.target.closest('.nav-dropdown')) window.closeNavDd(); });

// ── LEADERBOARD TABS ─────────────────────────────────────────────────────────
let _lbTab = 'rp';
function renderLeaderboard(tab) {
    _lbTab = tab;
    const list = allAccounts.filter(a => !a.isVault);
    let sorted, rightFn;
    switch (tab) {
        case 'wr':
            sorted = [...list].sort((a,b) => {
                const wa=(a.wins+a.losses)>0?a.wins/(a.wins+a.losses):0;
                const wb=(b.wins+b.losses)>0?b.wins/(b.wins+b.losses):0;
                return wb-wa;
            });
            rightFn = a => { const t=a.wins+a.losses, wr=t>0?Math.round(a.wins/t*100):0;
                return `<span style="color:#22c55e;font-weight:900">${wr}%</span> <span style="color:#475569;font-size:0.75em">${t} games</span>`; };
            break;
        case 'wins':
            sorted = [...list].sort((a,b)=>(b.wins||0)-(a.wins||0));
            rightFn = a => `<b style="color:#fbbf24">${(a.wins||0).toLocaleString()} W</b>`;
            break;
        case 'matches':
            sorted = [...list].sort((a,b)=>((b.wins||0)+(b.losses||0))-((a.wins||0)+(a.losses||0)));
            rightFn = a => `<b style="color:#3b82f6">${((a.wins||0)+(a.losses||0)).toLocaleString()}</b>`;
            break;
        default:
            sorted = [...list].sort((a,b)=>{ if(a.isNull&&!b.isNull)return -1; if(!a.isNull&&b.isNull)return 1; return b.points-a.points; });
            rightFn = a => a.isNull
                ? `<span class="null-corrupt-dyn" data-orig-len="7" style="color:#333;font-family:'Courier New',monospace;animation:nullFlicker 2s infinite;">∅NULL∅</span>`
                : `<b>${Math.floor(a.points).toLocaleString()} RP</b>`;
    }
    const numCol = tab==='rp'?'#ef4444':'#64748b';
    document.getElementById('leaderboard-list').innerHTML = sorted.map((a,i) => {
        const nameHtml = a.isNull ? `<span style="color:#3a3a3a">${a.name}</span> <span style="color:#1a1a1a;font-size:0.7rem">∅</span>` : a.name;
        return `<div style="padding:11px 12px;background:${a.isNull?'#050505':'#1e293b'};margin-bottom:5px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ${a.isNull?'#111':'transparent'}">
            <span><b style="color:${a.isNull?'#1f1f1f':numCol};margin-right:8px">#${i+1}</b>${nameHtml}</span>${rightFn(a)}</div>`;
    }).join('');
    if (tab==='rp') startNullDynamicCorruption();
    ['rp','wr','wins','matches'].forEach(t => { const el=document.getElementById(`lb-tab-${t}`); if(el) el.classList.toggle('lb-active',t===tab); });
}
window.setLeaderboardTab = (tab) => { renderLeaderboard(tab); };
window.openLeaderboard = () => { renderLeaderboard('rp'); toggleModal('leaderboard-modal'); };

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
    const discountActive = isShopDiscountDay();
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const discountDayName = dayNames[getShopDiscountDay()];
    
    let bannerHTML = discountActive
        ? `<div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#000;padding:10px 14px;border-radius:8px;margin-bottom:14px;font-weight:bold;font-size:0.85rem;text-align:center;">🎉 FLASH SALE — 50% OFF TODAY!</div>`
        : `<div style="background:#1e293b;color:#64748b;padding:8px 12px;border-radius:6px;margin-bottom:12px;font-size:0.75rem;text-align:center;letter-spacing:2px;">NEXT SALE: ${discountDayName.toUpperCase()}</div>`;

    const isRanked = isRankedAccount(acc);
    shopList.innerHTML = bannerHTML + (isRanked ? `<div style="background:#1e293b;border:1px solid #374151;border-radius:10px;padding:18px;text-align:center;color:#64748b;font-family:'Orbitron',sans-serif;font-size:0.55rem;letter-spacing:3px;">🔒 SHOP LOCKED<br><span style="font-size:0.5rem;opacity:0.6;font-family:'Courier New',monospace;letter-spacing:1px;">Ranked accounts cannot purchase items</span></div>` : Object.entries(SHOP_ITEMS).map(([key, item]) => {
        const finalCost = discountActive ? Math.floor(item.cost / 2) : item.cost;
        const canAfford = acc.coins >= finalCost;
        const owned = item.type === "consumable" ? acc.inventory[key] || 0 : "N/A";
        let description = key === "permanentCoinBoost" ? "Permanent 1.1x coin multiplier" : key === "heavenlyDice" ? "100x luck for one roll" : `${item.luckMultiplier}x luck multiplier`;
        return `
            <div class="shop-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:10px; border: 2px solid ${canAfford ? '#22c55e' : '#374151'}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h4 style="margin:0; color:#fff;">${item.name}</h4>
                    <span style="color:#fbbf24; font-weight:bold;">
                        ${discountActive ? `<span style="text-decoration:line-through; opacity:0.5; margin-right:8px;">${item.cost.toLocaleString()}</span>` : ''}
                        ${finalCost.toLocaleString()} coins
                    </span>
                </div>
                <div style="font-size:0.8rem; color:#94a3b8; margin-bottom:8px;">
                    ${item.type === "permanent" ? "Permanent boost" : item.singleUse ? "Single use" : "5 minutes duration"}<br>${description}
                </div>
                ${item.type === "consumable" ? `<div style="font-size:0.7rem; color:#64748b;">Owned: ${owned}</div>` : ''}
                <button onclick="buyItem('${key}')" class="btn-primary" style="margin-top:10px; ${!canAfford ? 'opacity:0.5; cursor:not-allowed;' : ''}">
                    ${canAfford ? 'BUY' : 'INSUFFICIENT COINS'}
                </button>
            </div>
        `;
    }).join(''));
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
    const ghostInfo = acc.isNull && (acc.ghostCoins || 0) > 0
        ? `<div style="background:#0a0a0a;border:1px solid #1a1a1a;padding:12px;border-radius:8px;margin-bottom:14px;font-family:'Courier New',monospace;">
            <div style="font-size:0.65rem;color:#444;letter-spacing:4px;margin-bottom:6px;">GHOST COINS</div>
            <div style="font-size:1.4rem;color:#2a2a2a;font-weight:bold;animation:nullFlicker 3s infinite;">${(acc.ghostCoins || 0).toLocaleString()} <span style="font-size:0.7rem;color:#1a1a1a;">∅</span></div>
            <div style="font-size:0.6rem;color:#1a1a1a;margin-top:4px;letter-spacing:2px;">NOT TRANSFERABLE — RESETS ON WEEKLY CYCLE</div>
          </div>`
        : '';
    transferList.innerHTML = ghostInfo + allAccounts.map((targetAcc, i) => {
        if (i === currentAccIdx) return '';
        if (targetAcc.isVault) return '';
        return `
            <div class="transfer-item" style="padding:15px; background:#1e293b; margin-bottom:10px; border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <h4 style="margin:0; color:#fff;">${targetAcc.name}</h4>
                    <span style="color:#fbbf24;">${targetAcc.coins.toLocaleString()} 🪙</span>
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
    const modal = document.getElementById('transfer-modal');
    if (modal) modal.style.display = 'flex';
};

window.switchAcc = (i) => {
    currentAccIdx = i;
    lastRankIdx = Math.floor(allAccounts[i].points / 400);
    playerSets = 0; botSets = 0;
    toggleModal('acc-modal');
    const vaultScreen = document.getElementById('vault-screen');
    if (allAccounts[i].isVault) {
        if (vaultScreen) {
            vaultScreen.style.display = 'flex';
            const errEl = document.getElementById('vault-error');
            const inp = document.getElementById('vault-code-input');
            if (errEl) errEl.textContent = '';
            if (inp) inp.value = '';
        }
        deactivateNullEffects();
    } else {
        if (vaultScreen) vaultScreen.style.display = 'none';
        queueBot(); updateUI(); resetRound(); updateDots(); applyEquippedBg();
        if (allAccounts[i].isNull) {
            startNullBotGlitch(); startNullTextCorruption(); startNullButtonCorruption();
            document.body.classList.add('null-mode');
        } else {
            deactivateNullEffects();
        }
    }
};

window.deleteAcc = (i) => { if(allAccounts.length > 1 && confirm("Delete profile?")) { allAccounts.splice(i,1); currentAccIdx = 0; updateUI(); renderAccounts(); }};

window.createNewAccount = () => {
    const nameInput = document.getElementById('new-acc-name');
    const rawName = nameInput.value.trim();
    if (rawName.length < 1) {
        showNotification("Name must be at least 1 character!", "error");
        return;
    }

    const isVault = rawName.toUpperCase() === 'VAULTOFSECRETS';

    if (isVault) {
        if (allAccounts.some(a => a.isVault)) {
            showNotification("The vault already exists.", "error");
            return;
        }
        if (allAccounts.length >= 6) {
            showNotification("Maximum accounts reached!", "error");
            return;
        }
    } else {
        const normalCount = allAccounts.filter(a => !a.isVault).length;
        if (normalCount >= 5) {
            showNotification("Maximum 5 accounts allowed!", "error");
            return;
        }
    }

    const newAcc = {
        name: isVault ? 'VAULTOFSECRETS' : rawName.substring(0, 12),
        isVault: isVault || false,
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
        maxAchievedLuck: 2.0,
        inventory: { luckyPotion1: 0, luckyPotion2: 0, luckyPotion3: 0, heavenlyDice: 0 },
        activePotions: [],
        weeklyRank: "Bronze",
        weeklyDivision: 1,
        lastWeeklyReset: Date.now(),
        weeklyHistory: [],
        highestRpEver: 0,
        ghostCoins: 0,
        isTainted: false
    };

    const _wasNull = allAccounts[currentAccIdx] && allAccounts[currentAccIdx].isNull;
    allAccounts.push(newAcc);
    nameInput.value = '';

    if (isVault) {
        earnBadge('vault_found');
        showNotification("◈ the vault opens...", "success");
    } else if (_wasNull) {
        currentAccIdx = allAccounts.length - 1;
        lastRankIdx = 0;
        playerSets = 0; botSets = 0;
        deactivateNullEffects();
        queueBot(); updateUI(); resetRound(); updateDots();
        showNotification(`Profile created! You escaped the void.`, 'success');
    } else {
        showNotification(`Profile "${newAcc.name}" created!`, 'success');
    }
    renderAccounts();
    save();
};

function renderAccounts() {
    document.getElementById('acc-list').innerHTML = allAccounts.map((a, i) => {
        if (a.isVault) {
            return `
            <div class="acc-item" style="display:flex; align-items:center; background:#06060c; margin-bottom:8px; border-radius:10px; border-left: 4px solid ${i === currentAccIdx ? 'rgba(70,60,180,0.7)' : 'rgba(40,35,90,0.4)'}">
                <div onclick="switchAcc(${i})" style="flex:1; padding:12px; cursor:pointer;">
                    <div style="font-weight:900; color:rgba(60,55,140,0.8); font-family:'Orbitron',sans-serif; font-size:0.65rem; letter-spacing:3px; animation:vaultOrbPulse 4s infinite;">◈ VAULT</div>
                    <div style="font-size:0.65rem; color:rgba(40,36,80,0.6); letter-spacing:2px;">sealed</div>
                </div>
                <button onclick="deleteAcc(${i})" style="padding:15px; background:none; border:none; color:rgba(80,40,40,0.5); font-size:0.8rem;">✕</button>
            </div>`;
        }
        const rpHtml = a.isNull
            ? `<span class="null-corrupt-dyn" data-orig-len="4" style="color:#2a2a2a; font-family:'Courier New',monospace;">NULL</span> RP`
            : `${Math.floor(a.points)} RP`;
        return `
        <div class="acc-item" style="display:flex; align-items:center; background:${a.isNull ? '#050505' : '#1e293b'}; margin-bottom:8px; border-radius:10px; border-left: 4px solid ${i === currentAccIdx ? '#ef4444' : 'transparent'}">
            <div onclick="switchAcc(${i})" style="flex:1; padding:12px; cursor:pointer;">
                <div style="font-weight:900; color:${a.isNull ? '#3a3a3a' : '#fff'}; ${a.isNull ? 'animation:nullFlicker 3s infinite;' : ''}">${a.name}</div>
                <div style="font-size:0.7rem; opacity:${a.isNull ? '0.5' : '0.6'}">${rpHtml}</div>
            </div>
            <button onclick="deleteAcc(${i})" style="padding:15px; background:none; border:none; color:#ef4444;">✕</button>
        </div>`;
    }).join('');
    save();
}

window.editName = () => {
    const n = prompt("Identity Update:", allAccounts[currentAccIdx].name);
    if (!n || !n.trim().length) return;
    const newName = n.trim().substring(0, 12);
    const acc = allAccounts[currentAccIdx];
    const becomingRanked = (newName.startsWith('#r') || newName.startsWith('#rs')) && !isRankedAccount(acc);
    if (becomingRanked) {
        const ok = confirm(
            "⚔️ RANKED ACCOUNT WARNING\n\n" +
            "Renaming to #r or #rs will RESET your RP to 0 and clear your match history.\n\n" +
            "Your coins and permanent luck boosts are kept.\n\n" +
            "Continue?"
        );
        if (!ok) return;
        acc.points = 0;
        acc.streak = 0;
        acc.bestStreak = 0;
        acc.wins = 0;
        acc.losses = 0;
        acc.history = [];
        acc.weeklyHistory = [];
        acc.highestRpEver = 0;
    }
    acc.name = newName;
    updateUI();
};
window.updateSettings = () => { settings.roundNumbers = document.getElementById('round-toggle').checked; save(); updateUI(); };
window.updateLuckScaling = () => {
    // Function kept for backward compatibility but does nothing
};

window.openRankRewards = () => {
    const RANK_COLORS = { Bronze:'#cd7f32', Silver:'#c0c0c0', Gold:'#ffd700', Platinum:'#e5e4e2', Diamond:'#b9f2ff', Emerald:'#50c878', Nightmare:'#ef4444' };
    const RANK_ICONS  = { Bronze:'🥉', Silver:'🥈', Gold:'🥇', Platinum:'💿', Diamond:'💎', Emerald:'🌿', Nightmare:'💀' };
    const groups = {
        Bronze: [['Bronze', WEEKLY_REWARDS['Bronze']]],
        Silver: [['Silver', WEEKLY_REWARDS['Silver']]],
        Gold:   [['Gold-1', WEEKLY_REWARDS['Gold-1']], ['Gold-2', WEEKLY_REWARDS['Gold-2']], ['Gold-3', WEEKLY_REWARDS['Gold-3']], ['Gold-4', WEEKLY_REWARDS['Gold-4']]],
        Platinum: [['Platinum-1', WEEKLY_REWARDS['Platinum-1']], ['Platinum-2', WEEKLY_REWARDS['Platinum-2']], ['Platinum-3', WEEKLY_REWARDS['Platinum-3']], ['Platinum-4', WEEKLY_REWARDS['Platinum-4']]],
        Diamond:  [['Diamond-1',  WEEKLY_REWARDS['Diamond-1']],  ['Diamond-2',  WEEKLY_REWARDS['Diamond-2']],  ['Diamond-3',  WEEKLY_REWARDS['Diamond-3']],  ['Diamond-4',  WEEKLY_REWARDS['Diamond-4']]],
        Emerald: [['Emerald', WEEKLY_REWARDS['Emerald']]],
        Nightmare: null
    };
    const rewardsHTML = Object.keys(groups).map(rank => {
        const col = RANK_COLORS[rank];
        const icon = RANK_ICONS[rank];
        if (rank === 'Nightmare') {
            return `<div style="background:#0f0f0f;border:1px solid #3f0000;border-left:4px solid #ef4444;border-radius:12px;padding:16px 18px;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                    <span style="font-size:1.6rem;">${icon}</span>
                    <span style="font-size:1.1rem;font-weight:900;color:#ef4444;letter-spacing:3px;">NIGHTMARE</span>
                    <span style="margin-left:auto;background:#ef4444;color:#000;padding:3px 10px;border-radius:20px;font-size:0.7rem;font-weight:bold;">DYNAMIC</span>
                </div>
                <div style="font-size:0.8rem;color:#94a3b8;line-height:1.8;">
                    Base: <span style="color:#fbbf24;font-weight:bold;">2,000,000</span> coins<br>
                    +<span style="color:#fbbf24;font-weight:bold;">200,000</span> per 100 RP above 2400
                </div>
            </div>`;
        }
        const entries = groups[rank];
        const hasDivisions = entries.length > 1;
        return `<div style="background:#0f172a;border:1px solid #1e293b;border-left:4px solid ${col};border-radius:12px;padding:16px 18px;margin-bottom:10px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:${hasDivisions?'12':'0'}px;">
                <span style="font-size:1.5rem;">${icon}</span>
                <span style="font-size:1rem;font-weight:900;color:${col};letter-spacing:2px;">${rank.toUpperCase()}</span>
                ${!hasDivisions ? `<span style="margin-left:auto;color:#fbbf24;font-weight:bold;font-size:1rem;">${entries[0][1].toLocaleString()} 💰</span>` : ''}
            </div>
            ${hasDivisions ? `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">${entries.map(([k,v]) => {
                const div = k.split('-')[1];
                return `<div style="background:#1e293b;border-radius:8px;padding:10px;display:flex;justify-content:space-between;align-items:center;">
                    <span style="color:#94a3b8;font-size:0.8rem;">Division ${div}</span>
                    <span style="color:#fbbf24;font-weight:bold;font-size:0.85rem;">${v.toLocaleString()}</span>
                </div>`;
            }).join('')}</div>` : ''}
        </div>`;
    }).join('');
    document.getElementById('rank-rewards-list').innerHTML = rewardsHTML;
    toggleModal('rank-rewards-modal');
};

let _wipePending = false;
window.wipeData = () => {
    const btn = document.querySelector('[onclick="wipeData()"]');
    if (!_wipePending) {
        _wipePending = true;
        if (btn) { btn.textContent = '⚠ CLICK AGAIN TO CONFIRM'; btn.style.background = '#dc2626'; }
        setTimeout(() => {
            _wipePending = false;
            if (btn) { btn.textContent = 'WIPE ALL DATA'; btn.style.background = ''; }
        }, 3000);
        return;
    }
    _wipePending = false;
    ['crimson_accounts','crimson_global_highs','crimson_current_acc',
     'crimson_settings','crimson_admin_persist','crimson_match_state',
     'crimson_badges','crimson_orb','crimson_global_reset'
    ].forEach(k => localStorage.removeItem(k));
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
};

let _quickResetPending = false;
window.quickReset = () => {
    const btn = document.getElementById('quick-reset-btn');
    const acc = allAccounts[currentAccIdx];

    // Gold+ gate: must be at least Gold 1 (rankIdx >= 2)
    const curRankIdx = Math.min(6, Math.floor(acc.points / 400));
    if (curRankIdx < 2) {
        showNotification('Quick Reset requires Gold rank or higher!', 'error');
        return;
    }

    // 1-per-day gate (local calendar day)
    const today = new Date().toDateString();
    if (acc.lastQuickReset && acc.lastQuickReset === today) {
        showNotification('Already used Quick Reset today. Come back tomorrow!', 'error');
        return;
    }

    if (!_quickResetPending) {
        _quickResetPending = true;
        if (btn) { btn.textContent = '⚠ CLICK AGAIN TO CONFIRM'; btn.style.background = '#9333ea'; }
        setTimeout(() => {
            _quickResetPending = false;
            if (btn) { btn.textContent = '⚡ QUICK RESET (25% REWARD)'; btn.style.background = '#7c2d92'; }
        }, 3000);
        return;
    }
    _quickResetPending = false;
    if (btn) { btn.textContent = '⚡ QUICK RESET (25% REWARD)'; btn.style.background = '#7c2d92'; }

    const now = Date.now();
    const currentWeekStart = getWeekStart(now);

    const endRankIdx = Math.min(6, Math.floor(acc.points / 400));
    const endRank    = ranks[endRankIdx];
    const endDiv     = endRank === 'Nightmare' ? 1 : Math.floor((acc.points % 400) / 100) + 1;
    const fullReward = calculateWeeklyReward({ weeklyRank: endRank, weeklyDivision: endDiv, points: acc.points });
    const reward     = Math.floor(fullReward * 0.25);

    const entry = {
        weekEnding:        new Date(currentWeekStart - 1).toISOString(),
        rank:              endRank,
        division:          endDiv,
        coinsEarned:       reward,
        bestRank:          endRank,
        bestDivision:      endDiv,
        highestRpThisWeek: acc.points
    };
    acc.weeklyHistory.unshift(entry);
    if (acc.weeklyHistory.length > 20) acc.weeklyHistory = acc.weeklyHistory.slice(0, 20);

    if (acc.points > (acc.highestRpEver || 0)) acc.highestRpEver = acc.points;

    acc.coins          = (acc.coins || 0) + reward;
    acc.ghostCoins     = 0;
    acc.points         = 0;
    acc.weeklyRank     = 'Bronze';
    acc.weeklyDivision = 1;
    acc.history        = [];
    acc.lastWeeklyReset  = currentWeekStart;
    acc.lastQuickReset   = new Date().toDateString();

    save(); updateUI();

    const rankLabel = endRank === 'Nightmare' ? 'NIGHTMARE' : endRank + ' ' + endDiv;
    showNotification(
        '\u26a1 Quick Reset: ' + rankLabel + ' \u2014 +' + reward.toLocaleString() + ' \ud83e\ude99 (25% of ' + fullReward.toLocaleString() + ')',
        'success'
    );
};

window.debugReset = () => {
    if(confirm("Debug reset? This will give you test coins and fix data issues!")) {
        localStorage.clear();
        location.reload();
    }
};
// ── ESCAPE REALITY CUTSCENE ──────────────────────────────────────────────────
async function playEscapeRealityCutscene() {
    const seq = document.getElementById('escape-reality-sequence');
    const canvas = document.getElementById('escape-canvas');
    const ctx = canvas.getContext('2d');
    seq.style.display = 'block';
    seq.style.opacity = '1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height, CX = W / 2, CY = H / 2;
    let raf = null;
    const stopRaf = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    const mkEl = (css, html = '') => {
        const e = document.createElement('div');
        e.style.cssText = `position:absolute;pointer-events:none;${css}`;
        e.innerHTML = html;
        seq.appendChild(e);
        return e;
    };

    // ── PHASE 1: Rushing perspective grid (3.8s) ────────────────────────────
    let gridZ = 0;
    const gridDur = 3800, gridStart = Date.now();
    const drawGrid = () => {
        const prog = Math.min((Date.now() - gridStart) / gridDur, 1);
        gridZ += (0.3 + prog * prog * 18) * 0.003;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        const brightness = 0.04 + prog * 0.18;
        ctx.strokeStyle = `rgba(255,255,255,${brightness})`;
        ctx.lineWidth = 0.6;
        ctx.shadowBlur = 6; ctx.shadowColor = '#fff';
        const LINES = 16, FOV = 280;
        for (let g = 0; g < LINES; g++) {
            const frac = ((g / LINES) + gridZ) % 1.0;
            const z = (1 - frac) * 500;
            if (z < 4) continue;
            const sc = FOV / (z + FOV);
            const hw = W * 1.9 * sc, hh = H * sc;
            ctx.beginPath(); ctx.rect(CX - hw, CY - hh, hw * 2, hh * 2); ctx.stroke();
            if (g < LINES - 1) {
                const frac2 = ((g + 1) / LINES + gridZ) % 1.0;
                const z2 = (1 - frac2) * 500; if (z2 < 4) continue;
                const sc2 = FOV / (z2 + FOV);
                const hw2 = W * 1.9 * sc2, hh2 = H * sc2;
                [[CX-hw,CY-hh,CX-hw2,CY-hh2],[CX+hw,CY-hh,CX+hw2,CY-hh2],[CX-hw,CY+hh,CX-hw2,CY+hh2],[CX+hw,CY+hh,CX+hw2,CY+hh2]].forEach(([x1,y1,x2,y2]) => {
                    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
                });
            }
        }
        ctx.shadowBlur = 0;
        if (Date.now() - gridStart < gridDur) raf = requestAnimationFrame(drawGrid);
    };
    raf = requestAnimationFrame(drawGrid);

    // Cryptic text overlaid on grid
    await wait(500);
    for (const line of ["you were always trapped", "this was never real", "now you see it"]) {
        const el = mkEl('top:42%;left:0;right:0;text-align:center;font-family:Courier New,monospace;font-size:0.82rem;color:rgba(255,255,255,0.28);letter-spacing:8px;opacity:0;transition:opacity 0.7s;', line);
        await wait(50); el.style.opacity = '1';
        await wait(800); el.style.opacity = '0';
        await wait(400); el.remove();
    }
    await wait(gridDur - (Date.now() - gridStart) + 100);
    stopRaf();

    // ── PHASE 2: Reality shattering (2.2s) ──────────────────────────────────
    seq.style.animation = 'nullShakeHeavy 0.07s infinite';
    const breakDur = 2200, breakStart = Date.now();
    const drawBreak = () => {
        const prog = Math.min((Date.now() - breakStart) / breakDur, 1);
        ctx.fillStyle = `rgba(0,0,0,${0.25 + prog * 0.1})`; ctx.fillRect(0, 0, W, H);
        for (let i = 0; i < 28; i++) {
            const ang = Math.random() * Math.PI * 2;
            const len = 30 + Math.random() * 220;
            const br = Math.floor(prog * 255);
            ctx.strokeStyle = `rgba(${br},${br},${br},${0.3 + Math.random() * 0.55})`;
            ctx.lineWidth = 0.5 + prog * 2.5;
            ctx.shadowBlur = prog * 22; ctx.shadowColor = '#fff';
            const x = Math.random() * W, y = Math.random() * H;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len); ctx.stroke();
        }
        if (prog > 0.35) {
            ctx.fillStyle = `rgba(255,0,0,${(prog - 0.35) * 0.12})`; ctx.fillRect(4, 0, W, H);
            ctx.fillStyle = `rgba(0,0,255,${(prog - 0.35) * 0.12})`; ctx.fillRect(-4, 0, W, H);
        }
        ctx.shadowBlur = 0;
        if (Date.now() - breakStart < breakDur) raf = requestAnimationFrame(drawBreak);
    };
    raf = requestAnimationFrame(drawBreak);
    await wait(breakDur);
    stopRaf();

    // ── PHASE 3: White explosion flash (0.5s) ───────────────────────────────
    seq.style.animation = '';
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
    await wait(500);

    // ── PHASE 4: White space reveal (4.5s) ──────────────────────────────────
    seq.style.background = '#fff';
    ctx.clearRect(0, 0, W, H);

    const accName = (allAccounts[currentAccIdx] && !allAccounts[currentAccIdx].isVault
        ? allAccounts[currentAccIdx].name
        : allAccounts.find(a => !a.isVault)?.name || 'PLAYER').toUpperCase();

    const titleEl = mkEl('top:38%;left:0;right:0;text-align:center;font-family:Orbitron,sans-serif;font-size:2.8rem;font-weight:900;color:#0a0a0a;letter-spacing:12px;opacity:0;transition:opacity 1.3s;', 'ESCAPE REALITY');
    const subEl   = mkEl('top:56%;left:0;right:0;text-align:center;font-family:Courier New,monospace;font-size:0.78rem;color:#444;letter-spacing:8px;opacity:0;transition:opacity 1s;', accName + ' — LIBERATED');
    const starEl  = mkEl('top:68%;left:0;right:0;text-align:center;font-family:Orbitron,sans-serif;font-size:1rem;color:rgba(10,10,10,0.35);letter-spacing:6px;opacity:0;transition:opacity 1s;', '✦  ✦  ✦');

    await wait(500); titleEl.style.opacity = '1';
    await wait(1200); subEl.style.opacity = '1';
    await wait(800);  starEl.style.opacity = '1';
    await wait(2200);

    // ── PHASE 5: Fade to black ───────────────────────────────────────────────
    seq.style.transition = 'opacity 1.6s';
    seq.style.opacity = '0';
    await wait(1700);

    // Cleanup
    seq.style.display = 'none';
    seq.style.opacity = '1';
    seq.style.transition = '';
    seq.style.background = '#000';
    seq.style.animation = '';
    [...seq.children].forEach(c => { if (c !== canvas) c.remove(); });
    canvas.width = 1; canvas.height = 1;

    // Return to a normal account
    switchAccFromVault();
}
// ─────────────────────────────────────────────────────────────────────────────

// ── BACKGROUND SYSTEM ────────────────────────────────────────────────────────
const BG_CATALOG = [
    { id:'crimson_night',  name:'Crimson Night',   rarity:'Common',    price:20000,  bg:'linear-gradient(160deg,#110505,#1e0808,#0d0303)' },
    { id:'slate_void',     name:'Slate Void',      rarity:'Common',    price:20000,  bg:'linear-gradient(160deg,#070d17,#0f172a,#060c14)' },
    { id:'deep_forest',    name:'Deep Forest',     rarity:'Common',    price:22000,  bg:'linear-gradient(160deg,#030d03,#071407,#030a03)' },
    { id:'abyss_blue',     name:'Abyss Blue',      rarity:'Common',    price:22000,  bg:'linear-gradient(180deg,#020810,#050e1a,#030912)' },
    { id:'ash_grey',       name:'Ash Grey',        rarity:'Common',    price:25000,  bg:'linear-gradient(135deg,#0a0a0a,#141414,#0d0d0d)' },
    { id:'aurora',         name:'Aurora',          rarity:'Uncommon',  price:50000,  bg:'linear-gradient(135deg,#030a12,#041a10,#08031a,#030a12)' },
    { id:'ember_glow',     name:'Ember Glow',      rarity:'Uncommon',  price:50000,  bg:'radial-gradient(ellipse at 50% 80%,#2d0a00,#150500,#050000)' },
    { id:'amethyst',       name:'Amethyst',        rarity:'Uncommon',  price:55000,  bg:'linear-gradient(160deg,#0d0520,#160830,#090315)' },
    { id:'arctic_drift',   name:'Arctic Drift',    rarity:'Uncommon',  price:60000,  bg:'linear-gradient(180deg,#050d14,#081520,#04090e)' },
    { id:'copper_age',     name:'Copper Age',      rarity:'Uncommon',  price:65000,  bg:'linear-gradient(135deg,#150800,#251200,#120700)' },
    { id:'galaxy_core',    name:'Galaxy Core',     rarity:'Rare',      price:100000, bg:'radial-gradient(ellipse at 25% 35%,#1a0535,#08001a,#02000a,#000)' },
    { id:'blood_moon',     name:'Blood Moon',      rarity:'Rare',      price:100000, bg:'radial-gradient(ellipse at 50% -10%,#4a0000,#1a0000,#060000,#000)' },
    { id:'toxic_spill',    name:'Toxic Spill',     rarity:'Rare',      price:125000, bg:'radial-gradient(ellipse at 50% 110%,#002200,#001000,#000400,#000)' },
    { id:'inferno',        name:'Inferno',         rarity:'Rare',      price:150000, bg:'radial-gradient(ellipse at 50% 120%,#3d1000,#1f0500,#080000,#000)' },
    { id:'deep_nebula',    name:'Deep Nebula',     rarity:'Epic',      price:250000, bg:'radial-gradient(ellipse at 15% 20%,#25053d,#08001a,#000208,#000)' },
    { id:'corrupted_data', name:'CORRUPTED DATA',  rarity:'Epic',      price:280000, bg:'linear-gradient(135deg,#0a0010,#00000a,#050010,#00000a,#0a0005)' },
    { id:'starless_abyss', name:'Starless Abyss',  rarity:'Epic',      price:300000, bg:'radial-gradient(ellipse at 50% 50%,#03000a,#010005,#000)' },
    { id:'fractured',      name:'Fractured',       rarity:'Epic',      price:350000, bg:'conic-gradient(from 45deg at 50% 50%,#050008 0deg,#080005 60deg,#000508 120deg,#050008 180deg,#080000 240deg,#050008 300deg,#050008 360deg)' },
    { id:'null_void',      name:'NULL VOID',       rarity:'Legendary', price:500000, bg:'#000' },
    { id:'cosmic_horror',  name:'Cosmic Horror',   rarity:'Legendary', price:600000, bg:'radial-gradient(ellipse at 15% 85%,#1a0030,#050008,#000)' },
    { id:'crimson_deity',  name:'CRIMSON DEITY',   rarity:'Legendary', price:750000, bg:'radial-gradient(ellipse at 50% 50%,#2a0000,#140000,#050000,#000)' },
    { id:'the_end',       name:'— THE END —',    rarity:'Limited', price:1000000, bg:'#000',                                                                   overlay:'the_end',       limitedIdx:1 },
    { id:'first_light',   name:'FIRST LIGHT',     rarity:'Limited', price:1000000, bg:'linear-gradient(180deg,#000 0%,#040201 55%,#000 100%)',          overlay:'first_light',   limitedIdx:2 },
    { id:'void_gate',     name:'VOID GATE',        rarity:'Limited', price:1000000, bg:'radial-gradient(ellipse at 50% 50%,#030008,#010004,#000)',        overlay:'void_gate',     limitedIdx:3 },
    { id:'crimson_ocean', name:'CRIMSON OCEAN',    rarity:'Limited', price:1000000, bg:'linear-gradient(180deg,#000 0%,#080000 60%,#0a0000 100%)',        overlay:'crimson_ocean', limitedIdx:4 },
    { id:'eclipse',       name:'ECLIPSE',          rarity:'Limited', price:1000000, bg:'#000',                                                                   overlay:'eclipse',       limitedIdx:5 },
    { id:'shattered_sky', name:'SHATTERED SKY',    rarity:'Limited', price:1000000, bg:'linear-gradient(180deg,#000 0%,#02000a 45%,#000 100%)',          overlay:'shattered_sky', limitedIdx:6 },
    { id:'vault_shadow',   name:'VAULT SHADOW',     rarity:'Secret',  price:0, bg:'radial-gradient(ellipse at 50% 50%,#0d0024,#06001a,#02000a,#000)',    overlay:'vault_shadow',  secretBadge:'vault_found' },
    { id:'null_realm',     name:'NULL REALM',        rarity:'Secret',  price:0, bg:'#000',                                                                   overlay:'null_realm',    secretBadge:'null_ascension' },
    { id:'what_void',      name:'?',                 rarity:'Secret',  price:0, bg:'radial-gradient(ellipse at 50% 50%,#0a0a0a,#030303,#000)',            overlay:'what_void',     secretBadge:'what' },
];

// ── LIMITED ROTATION SYSTEM ──────────────────────────────────────────────────
// Week 0 starts Monday 2026-03-24. limitedIdx 1 = even weeks, 2 = odd weeks.
const LIMITED_EPOCH = WEEKLY_RESET_EPOCH; // same UTC Monday baseline — all devices agree
const LIMITED_WEEK  = WEEK_MS;

function getLimitedInfo(limitedIdx) {
    const total    = BG_CATALOG.filter(b => b.limitedIdx != null).length;
    const now      = Date.now();
    const weekNum  = Math.floor((now - LIMITED_EPOCH) / LIMITED_WEEK);
    const slot     = limitedIdx - 1; // 0-indexed
    const available = weekNum % total === slot;
    const weekStart = LIMITED_EPOCH + weekNum * LIMITED_WEEK;
    const weekEnd   = weekStart + LIMITED_WEEK;
    const timeLeft  = available ? weekEnd - now : null;
    let returnsIn   = null;
    if (!available) {
        const currentSlot = weekNum % total;
        const weeksUntil  = (slot - currentSlot + total) % total || total;
        returnsIn = (LIMITED_EPOCH + (weekNum + weeksUntil) * LIMITED_WEEK) - now;
    }
    return { available, timeLeft, returnsIn };
}

function fmtLimitedTime(ms) {
    if (ms <= 0) return '0m';
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

let _limitedTicker = null;
function startLimitedTicker() {
    if (_limitedTicker) return;
    _limitedTicker = setInterval(() => {
        document.querySelectorAll('[data-limited-countdown]').forEach(el => {
            const ms = parseInt(el.dataset.limitedCountdown) - (Date.now() - parseInt(el.dataset.limitedRef));
            el.textContent = ms > 0 ? fmtLimitedTime(ms) : '—';
        });
    }, 30000);
}
function stopLimitedTicker() {
    if (_limitedTicker) { clearInterval(_limitedTicker); _limitedTicker = null; }
}

// ── LIMITED BACKGROUND OVERLAY SCENES ────────────────────────────────────────
const BG_OVERLAYS = {
    the_end: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <!-- ground fill -->
  <rect x="0" y="448" width="1000" height="252" fill="#020101"/>
  <!-- horizon line -->
  <rect x="0" y="447" width="1000" height="2" fill="#100a06"/>
  <!-- LEFT ARCH – two pillars + arc -->
  <rect x="112" y="295" width="18" height="155" fill="#0d0806"/>
  <rect x="212" y="295" width="18" height="155" fill="#0d0806"/>
  <path d="M112 295 Q161 225 230 295" fill="none" stroke="#0f0a07" stroke-width="14" stroke-linecap="round"/>
  <path d="M112 295 Q161 225 230 295" fill="none" stroke="#050302" stroke-width="8" stroke-linecap="round"/>
  <!-- pillar debris left -->
  <rect x="100" y="448" width="28" height="8" fill="#0c0806" transform="rotate(-3,114,452)"/>
  <rect x="220" y="448" width="22" height="6" fill="#0c0806" transform="rotate(2,231,451)"/>
  <!-- CENTRE PILLAR – broken top -->
  <rect x="484" y="330" width="15" height="118" fill="#0e0907"/>
  <rect x="490" y="323" width="14" height="9" fill="#080504" transform="rotate(-8,497,327)"/>
  <!-- RIGHT ARCH – smaller, further back -->
  <rect x="720" y="325" width="13" height="123" fill="#0b0705"/>
  <rect x="800" y="325" width="13" height="123" fill="#0b0705"/>
  <path d="M720 325 Q757 270 813 325" fill="none" stroke="#0d0908" stroke-width="10" stroke-linecap="round"/>
  <path d="M720 325 Q757 270 813 325" fill="none" stroke="#040302" stroke-width="6" stroke-linecap="round"/>
  <!-- scattered ground blocks -->
  <rect x="310" y="445" width="35" height="7" fill="#0d0807" transform="rotate(-5,327,448)"/>
  <rect x="365" y="443" width="18" height="5" fill="#0b0605" transform="rotate(4,374,445)"/>
  <rect x="550" y="446" width="28" height="6" fill="#0c0706" transform="rotate(-2,564,449)"/>
  <rect x="620" y="444" width="14" height="4" fill="#0a0604" transform="rotate(6,627,446)"/>
  <rect x="860" y="446" width="32" height="7" fill="#0c0807" transform="rotate(-4,876,449)"/>
  <!-- ground cracks -->
  <path d="M390 449 L408 462 L398 475" fill="none" stroke="#0a0604" stroke-width="1.5"/>
  <path d="M650 449 L663 458 L657 470 L670 480" fill="none" stroke="#0a0604" stroke-width="1.5"/>
  <!-- atmospheric haze near horizon -->
  <rect x="0" y="430" width="1000" height="20" fill="url(#hazeGrad)"/>
  <defs>
    <linearGradient id="hazeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#0a0603" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
</svg>`,

    first_light: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <!-- sun core glow -->
    <radialGradient id="sunCore" cx="50%" cy="0%" r="35%">
      <stop offset="0%"   stop-color="#2a1800" stop-opacity="0.55"/>
      <stop offset="30%"  stop-color="#1a0e00" stop-opacity="0.28"/>
      <stop offset="65%"  stop-color="#0d0700" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
    <!-- horizon glow band -->
    <linearGradient id="horizGlow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1a0b00" stop-opacity="0"/>
      <stop offset="50%"  stop-color="#120800" stop-opacity="0.40"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </linearGradient>
    <!-- ground fill -->
    <linearGradient id="groundFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#070400"/>
      <stop offset="100%" stop-color="#020100"/>
    </linearGradient>
  </defs>
  <!-- sky background (body handles #000) -->
  <!-- sun corona backdrop -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#sunCore)"/>
  <!-- sun disc — barely visible, sits at very top centre -->
  <circle cx="500" cy="-5" r="62" fill="#1c0f00" opacity="0.8"/>
  <circle cx="500" cy="-5" r="52" fill="#221300" opacity="0.7"/>
  <circle cx="500" cy="-5" r="40" fill="#2a1700" opacity="0.85"/>
  <!-- light ray beams fanning out -->
  <line x1="500" y1="0" x2="140" y2="420" stroke="#160c00" stroke-width="38" stroke-opacity="0.18"/>
  <line x1="500" y1="0" x2="280" y2="410" stroke="#160c00" stroke-width="28" stroke-opacity="0.14"/>
  <line x1="500" y1="0" x2="420" y2="400" stroke="#160c00" stroke-width="20" stroke-opacity="0.11"/>
  <line x1="500" y1="0" x2="580" y2="400" stroke="#160c00" stroke-width="20" stroke-opacity="0.11"/>
  <line x1="500" y1="0" x2="720" y2="410" stroke="#160c00" stroke-width="28" stroke-opacity="0.14"/>
  <line x1="500" y1="0" x2="860" y2="420" stroke="#160c00" stroke-width="38" stroke-opacity="0.18"/>
  <!-- horizon glow band -->
  <rect x="0" y="330" width="1000" height="120" fill="url(#horizGlow)"/>
  <!-- horizon line -->
  <rect x="0" y="448" width="1000" height="1" fill="#1a0d00" opacity="0.7"/>
  <!-- ground -->
  <rect x="0" y="449" width="1000" height="251" fill="url(#groundFill)"/>
  <!-- distant flat land silhouette -->
  <path d="M0 449 Q120 443 250 447 Q380 444 500 448 Q650 444 780 446 Q900 443 1000 448 L1000 449 Z" fill="#050300"/>
  <!-- very faint dust haze near horizon -->
  <rect x="0" y="435" width="1000" height="16" fill="#0f0800" opacity="0.12"/>
</svg>`,

    void_gate: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <radialGradient id="gateGlow" cx="50%" cy="52%" r="28%">
      <stop offset="0%"   stop-color="#0d0020" stop-opacity="0.6"/>
      <stop offset="40%"  stop-color="#060010" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gateRim" cx="50%" cy="50%" r="50%">
      <stop offset="80%"  stop-color="#000"    stop-opacity="0"/>
      <stop offset="94%"  stop-color="#120025" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- distant glow backdrop -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#gateGlow)"/>
  <!-- outer energy rings -->
  <ellipse cx="500" cy="360" rx="245" ry="285" fill="none" stroke="#100020" stroke-width="2" opacity="0.6"/>
  <ellipse cx="500" cy="360" rx="210" ry="248" fill="none" stroke="#150028" stroke-width="1.5" opacity="0.5"/>
  <ellipse cx="500" cy="360" rx="178" ry="212" fill="none" stroke="#0e001a" stroke-width="1" opacity="0.4"/>
  <!-- gate arch frame — thick dark border -->
  <ellipse cx="500" cy="360" rx="148" ry="178" fill="none" stroke="#1a002e" stroke-width="18"/>
  <ellipse cx="500" cy="360" rx="148" ry="178" fill="none" stroke="#0a0015" stroke-width="12"/>
  <!-- gate interior — slightly lighter void -->
  <ellipse cx="500" cy="360" rx="139" ry="169" fill="#030008"/>
  <!-- inner rim glow -->
  <ellipse cx="500" cy="360" rx="139" ry="169" fill="none" stroke="#200040" stroke-width="4" opacity="0.4"/>
  <!-- two flanking pillars -->
  <rect x="338" y="190" width="22" height="400" fill="#0f0018"/>
  <rect x="640" y="190" width="22" height="400" fill="#0f0018"/>
  <!-- pillar caps -->
  <rect x="330" y="182" width="38" height="12" fill="#130022"/>
  <rect x="632" y="182" width="38" height="12" fill="#130022"/>
  <!-- ground line -->
  <rect x="0" y="590" width="1000" height="2" fill="#0a0012" opacity="0.5"/>
  <!-- faint cross-beam light inside gate -->
  <line x1="361" y1="360" x2="639" y2="360" stroke="#1a0030" stroke-width="1" opacity="0.35"/>
  <line x1="500" y1="191" x2="500" y2="529" stroke="#1a0030" stroke-width="1" opacity="0.35"/>
</svg>`,

    crimson_ocean: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#140003"/>
      <stop offset="60%" stop-color="#0c0002"/>
      <stop offset="100%" stop-color="#050001"/>
    </linearGradient>
    <radialGradient id="moonReflect" cx="50%" cy="0%" r="60%">
      <stop offset="0%"   stop-color="#1a0004" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="moonGlow" cx="72%" cy="12%" r="8%">
      <stop offset="0%"   stop-color="#1a0005" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- sky: pure black body handles it -->
  <!-- dim moon glow in sky -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#moonGlow)"/>
  <!-- faint moon disc -->
  <circle cx="720" cy="85" r="22" fill="#120003" opacity="0.7"/>
  <circle cx="720" cy="85" r="16" fill="#160004" opacity="0.8"/>
  <!-- horizon glow -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#moonReflect)"/>
  <!-- horizon line -->
  <rect x="0" y="388" width="1000" height="2" fill="#1c0005" opacity="0.8"/>
  <!-- ocean body -->
  <rect x="0" y="390" width="1000" height="310" fill="url(#seaGrad)"/>
  <!-- moon reflection streak on water -->
  <path d="M460 390 Q500 420 460 460 Q500 500 470 540 Q500 570 480 600 Q500 630 490 660 L510 660 Q500 630 520 600 Q500 570 530 540 Q500 500 540 460 Q500 420 540 390 Z" fill="#1e0006" opacity="0.35"/>
  <!-- wave lines -->
  <path d="M0 410 Q80 406 160 410 Q240 414 320 410 Q400 406 480 410 Q560 414 640 410 Q720 406 800 410 Q880 414 1000 410" fill="none" stroke="#1a0005" stroke-width="1.5" opacity="0.55"/>
  <path d="M0 435 Q100 430 200 435 Q300 440 400 435 Q500 430 600 435 Q700 440 800 435 Q900 430 1000 435" fill="none" stroke="#160004" stroke-width="1.5" opacity="0.45"/>
  <path d="M0 462 Q120 457 240 462 Q360 467 480 462 Q600 457 720 462 Q840 467 1000 462" fill="none" stroke="#120003" stroke-width="1" opacity="0.35"/>
  <path d="M0 492 Q150 487 300 492 Q450 497 600 492 Q750 487 900 492 Q950 494 1000 492" fill="none" stroke="#0e0002" stroke-width="1" opacity="0.3"/>
  <path d="M0 528 Q200 523 400 528 Q600 533 800 528 Q900 525 1000 528" fill="none" stroke="#0b0001" stroke-width="1" opacity="0.25"/>
</svg>`,

    eclipse: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <radialGradient id="corona" cx="50%" cy="8%" r="30%">
      <stop offset="0%"   stop-color="#000"    stop-opacity="1"/>
      <stop offset="28%"  stop-color="#000"    stop-opacity="1"/>
      <stop offset="34%"  stop-color="#1e1200" stop-opacity="0.7"/>
      <stop offset="45%"  stop-color="#150c00" stop-opacity="0.4"/>
      <stop offset="65%"  stop-color="#0a0700" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="coronaInner" cx="50%" cy="8%" r="16%">
      <stop offset="0%"   stop-color="#000" stop-opacity="1"/>
      <stop offset="75%"  stop-color="#000" stop-opacity="1"/>
      <stop offset="86%"  stop-color="#2a1a00" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- outer corona bloom -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#corona)"/>
  <!-- inner tight corona ring -->
  <rect x="0" y="0" width="1000" height="700" fill="url(#coronaInner)"/>
  <!-- corona ray streaks — longer thin lines -->
  <line x1="500" y1="56" x2="320" y2="-30" stroke="#1a1000" stroke-width="22" stroke-opacity="0.18"/>
  <line x1="500" y1="56" x2="680" y2="-30" stroke="#1a1000" stroke-width="22" stroke-opacity="0.18"/>
  <line x1="500" y1="56" x2="180" y2="60"  stroke="#1a1000" stroke-width="18" stroke-opacity="0.14"/>
  <line x1="500" y1="56" x2="820" y2="60"  stroke="#1a1000" stroke-width="18" stroke-opacity="0.14"/>
  <line x1="500" y1="56" x2="400" y2="-50" stroke="#150d00" stroke-width="12" stroke-opacity="0.12"/>
  <line x1="500" y1="56" x2="600" y2="-50" stroke="#150d00" stroke-width="12" stroke-opacity="0.12"/>
  <line x1="500" y1="56" x2="500" y2="-60" stroke="#150d00" stroke-width="16" stroke-opacity="0.16"/>
  <!-- eclipse disc — slightly larger than the obscured sun -->
  <circle cx="500" cy="56" r="78" fill="#000"/>
  <circle cx="500" cy="56" r="72" fill="#020100"/>
  <!-- faint diamond flash top-right of disc (eclipse effect) -->
  <circle cx="560" cy="18" r="5" fill="#201200" opacity="0.55"/>
  <circle cx="560" cy="18" r="2" fill="#2e1a00" opacity="0.7"/>
  <!-- ground horizon line -->
  <rect x="0" y="565" width="1000" height="1" fill="#100a00" opacity="0.4"/>
  <!-- ground fill -->
  <rect x="0" y="566" width="1000" height="134" fill="#030200"/>
  <!-- distant mountain/land silhouette -->
  <path d="M0 566 Q80 548 160 560 Q220 550 280 566 Q340 555 420 562 Q460 548 500 566 Q560 552 630 560 Q690 548 750 565 Q830 550 900 560 Q950 556 1000 565 L1000 566 Z" fill="#060400"/>
</svg>`,

    shattered_sky: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <linearGradient id="shardFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#06000f"/>
      <stop offset="100%" stop-color="#02000a"/>
    </linearGradient>
  </defs>
  <!-- cracked sky shards — each polygon is a slightly different shade of near-black -->
  <!-- upper-left cluster -->
  <polygon points="0,0   280,0   210,110  80,145  0,90"    fill="#060010" opacity="0.9"/>
  <polygon points="80,145 210,110 195,240  60,260  0,190"  fill="#08001a" opacity="0.85"/>
  <polygon points="0,90  80,145  0,190"                    fill="#030009" opacity="0.95"/>
  <!-- upper-centre cluster -->
  <polygon points="280,0  520,0  490,90  350,120 210,110"  fill="#04000d" opacity="0.9"/>
  <polygon points="350,120 490,90 520,180 390,220 195,240 210,110" fill="#070015" opacity="0.85"/>
  <!-- upper-right cluster -->
  <polygon points="520,0  1000,0  1000,80 760,100 490,90"  fill="#050010" opacity="0.9"/>
  <polygon points="760,100 1000,80 1000,220 840,230 600,195 490,90 520,180" fill="#09001c" opacity="0.85"/>
  <!-- mid-left -->
  <polygon points="0,190  60,260  50,360  0,380"           fill="#04000c" opacity="0.9"/>
  <polygon points="60,260 195,240 180,340  55,370  50,360" fill="#07001a" opacity="0.85"/>
  <!-- mid-centre -->
  <polygon points="195,240 390,220 420,330 310,380 180,340" fill="#050012" opacity="0.9"/>
  <polygon points="390,220 600,195 630,310 500,360 420,330" fill="#080018" opacity="0.85"/>
  <!-- mid-right -->
  <polygon points="600,195 840,230 850,340 680,360 630,310" fill="#050010" opacity="0.9"/>
  <polygon points="840,230 1000,220 1000,370 860,380 850,340" fill="#06001a" opacity="0.85"/>
  <!-- crack lines — thin bright-ish lines between shards -->
  <line x1="80"  y1="145" x2="210" y2="110" stroke="#120025" stroke-width="1.5" opacity="0.6"/>
  <line x1="210" y1="110" x2="350" y2="120" stroke="#100020" stroke-width="1.5" opacity="0.5"/>
  <line x1="350" y1="120" x2="490" y2="90"  stroke="#120025" stroke-width="1.5" opacity="0.6"/>
  <line x1="490" y1="90"  x2="520" y2="180" stroke="#0f001e" stroke-width="1.5" opacity="0.5"/>
  <line x1="195" y1="240" x2="390" y2="220" stroke="#100020" stroke-width="1"   opacity="0.55"/>
  <line x1="390" y1="220" x2="600" y2="195" stroke="#120025" stroke-width="1"   opacity="0.5"/>
  <line x1="600" y1="195" x2="760" y2="100" stroke="#0e001c" stroke-width="1"   opacity="0.45"/>
  <line x1="80"  y1="145" x2="60"  y2="260" stroke="#100020" stroke-width="1"   opacity="0.5"/>
  <line x1="195" y1="240" x2="180" y2="340" stroke="#0f001e" stroke-width="1"   opacity="0.5"/>
  <line x1="390" y1="220" x2="420" y2="330" stroke="#110022" stroke-width="1"   opacity="0.5"/>
  <line x1="600" y1="195" x2="630" y2="310" stroke="#0f001e" stroke-width="1"   opacity="0.45"/>
  <line x1="840" y1="230" x2="850" y2="340" stroke="#100020" stroke-width="1"   opacity="0.45"/>
  <!-- horizon + ground -->
  <rect x="0" y="450" width="1000" height="2" fill="#0c0018" opacity="0.5"/>
  <rect x="0" y="452" width="1000" height="248" fill="#010004"/>
  <!-- fallen shard pieces on ground -->
  <polygon points="200,452 260,452 240,468 185,465" fill="#080015" opacity="0.7"/>
  <polygon points="480,452 550,452 535,462 465,460" fill="#060012" opacity="0.65"/>
  <polygon points="700,452 780,452 765,470 690,466" fill="#080015" opacity="0.7"/>
  <polygon points="850,452 920,452 910,460 840,458" fill="#060010" opacity="0.6"/>
</svg>`,

    vault_shadow: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <radialGradient id="vsThroneGlow" cx="50%" cy="68%" r="38%">
      <stop offset="0%"   stop-color="#1e0040" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vsOrbGlow" cx="50%" cy="34%" r="8%">
      <stop offset="0%"   stop-color="#2a0055" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="1000" height="700" fill="url(#vsThroneGlow)"/>
  <rect x="0" y="0" width="1000" height="700" fill="url(#vsOrbGlow)"/>
  <!-- arcane floor circle -->
  <ellipse cx="500" cy="600" rx="220" ry="30" fill="none" stroke="#1a0035" stroke-width="1" opacity="0.6"/>
  <ellipse cx="500" cy="600" rx="170" ry="22" fill="none" stroke="#150028" stroke-width="0.8" opacity="0.5"/>
  <ellipse cx="500" cy="600" rx="110" ry="14" fill="none" stroke="#200040" stroke-width="0.8" opacity="0.4"/>
  <!-- rune marks on circle -->
  <line x1="280" y1="600" x2="720" y2="600" stroke="#160030" stroke-width="0.5" opacity="0.4"/>
  <line x1="500" y1="570" x2="500" y2="630" stroke="#160030" stroke-width="0.5" opacity="0.4"/>
  <line x1="340" y1="574" x2="660" y2="626" stroke="#130028" stroke-width="0.5" opacity="0.3"/>
  <line x1="340" y1="626" x2="660" y2="574" stroke="#130028" stroke-width="0.5" opacity="0.3"/>
  <!-- throne base -->
  <rect x="454" y="480" width="92" height="120" fill="#0a0018"/>
  <!-- throne seat -->
  <rect x="440" y="380" width="120" height="110" fill="#0d001e"/>
  <!-- throne back tall -->
  <rect x="450" y="200" width="100" height="195" fill="#0f0022"/>
  <!-- throne top ornament -->
  <polygon points="500,170 458,210 542,210" fill="#100025"/>
  <circle cx="500" cy="165" r="8" fill="#120028" opacity="0.8"/>
  <!-- armrests -->
  <rect x="440" y="390" width="20" height="60" fill="#0c001a"/>
  <rect x="540" y="390" width="20" height="60" fill="#0c001a"/>
  <!-- orb above throne -->
  <circle cx="500" cy="240" r="18" fill="#0f0020" opacity="0.0"/>
  <circle cx="500" cy="152" r="6" fill="#1a0038" opacity="0.7"/>
  <!-- column left -->
  <rect x="270" y="180" width="24" height="420" fill="#080014"/>
  <rect x="262" y="172" width="40" height="14" fill="#0a0018"/>
  <!-- column right -->
  <rect x="706" y="180" width="24" height="420" fill="#080014"/>
  <rect x="698" y="172" width="40" height="14" fill="#0a0018"/>
  <!-- ground shadow -->
  <rect x="0" y="598" width="1000" height="102" fill="#03000a"/>
  <!-- faint horizontal band across mid -->
  <rect x="0" y="490" width="1000" height="1" fill="#150030" opacity="0.35"/>
</svg>`,

    null_realm: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <!-- Nearly invisible static — black on black -->
  <circle cx="120" cy="80"  r="1" fill="#0d0d0d" opacity="0.5"/>
  <circle cx="340" cy="145" r="1" fill="#0e0e0e" opacity="0.4"/>
  <circle cx="780" cy="60"  r="1" fill="#0c0c0c" opacity="0.5"/>
  <circle cx="900" cy="200" r="1" fill="#0d0d0d" opacity="0.3"/>
  <circle cx="55"  cy="310" r="1" fill="#0e0e0e" opacity="0.4"/>
  <circle cx="460" cy="390" r="1" fill="#0c0c0c" opacity="0.5"/>
  <circle cx="670" cy="480" r="1" fill="#0d0d0d" opacity="0.3"/>
  <circle cx="200" cy="530" r="1" fill="#0e0e0e" opacity="0.4"/>
  <circle cx="820" cy="620" r="1" fill="#0c0c0c" opacity="0.5"/>
  <circle cx="390" cy="660" r="1" fill="#0d0d0d" opacity="0.3"/>
  <!-- faint corrupt grid -->
  <line x1="0"    y1="233" x2="1000" y2="233" stroke="#0b0b0b" stroke-width="0.5" opacity="0.3"/>
  <line x1="0"    y1="466" x2="1000" y2="466" stroke="#0b0b0b" stroke-width="0.5" opacity="0.3"/>
  <line x1="333"  y1="0"   x2="333"  y2="700" stroke="#0b0b0b" stroke-width="0.5" opacity="0.3"/>
  <line x1="666"  y1="0"   x2="666"  y2="700" stroke="#0b0b0b" stroke-width="0.5" opacity="0.3"/>
  <!-- centre null symbol -->
  <circle cx="500" cy="350" r="28" fill="none" stroke="#0f0f0f" stroke-width="0.8" opacity="0.4"/>
  <line x1="480" y1="330" x2="520" y2="370" stroke="#0f0f0f" stroke-width="0.8" opacity="0.4"/>
</svg>`,

    what_void: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
  <defs>
    <radialGradient id="wvCore" cx="50%" cy="50%" r="30%">
      <stop offset="0%"   stop-color="#111111" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000"    stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="1000" height="700" fill="url(#wvCore)"/>
  <!-- impossible geometry — overlapping triangles that shouldn't align -->
  <polygon points="500,160 340,440 660,440" fill="none" stroke="#161616" stroke-width="1.2" opacity="0.6"/>
  <polygon points="500,540 340,260 660,260" fill="none" stroke="#131313" stroke-width="1.2" opacity="0.5"/>
  <!-- inner intersection ring -->
  <circle cx="500" cy="350" r="72" fill="none" stroke="#141414" stroke-width="0.8" opacity="0.5"/>
  <circle cx="500" cy="350" r="48" fill="none" stroke="#121212" stroke-width="0.8" opacity="0.4"/>
  <!-- radiating lines from centre -->
  <line x1="500" y1="350" x2="500" y2="160" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <line x1="500" y1="350" x2="660" y2="440" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <line x1="500" y1="350" x2="340" y2="440" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <line x1="500" y1="350" x2="500" y2="540" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <line x1="500" y1="350" x2="660" y2="260" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <line x1="500" y1="350" x2="340" y2="260" stroke="#151515" stroke-width="0.6" opacity="0.4"/>
  <!-- outer faint frame squares at off angles -->
  <rect x="350" y="200" width="300" height="300" fill="none" stroke="#111" stroke-width="0.6" opacity="0.3" transform="rotate(22 500 350)"/>
  <rect x="350" y="200" width="300" height="300" fill="none" stroke="#111" stroke-width="0.6" opacity="0.25" transform="rotate(45 500 350)"/>
  <!-- centre dot — the eye -->
  <circle cx="500" cy="350" r="3" fill="#181818" opacity="0.7"/>
</svg>`,
};

// ── BACKGROUND SYSTEM ────────────────────────────────────────────────────────

function applyBgOverlay(key) {
    const ov = document.getElementById('bg-overlay');
    if (!ov) return;
    if (!key || !BG_OVERLAYS[key]) { ov.style.display = 'none'; ov.innerHTML = ''; return; }
    ov.style.display = 'block';
    ov.innerHTML = BG_OVERLAYS[key];
}

function applyEquippedBg() {
    const gc  = document.querySelector('.game-container');
    const acc = allAccounts[currentAccIdx];
    const id  = acc && acc.equippedBg;
    if (!id) {
        document.body.style.background = '';
        if (gc) gc.style.background = '';
        applyBgOverlay(null);
        return;
    }
    const entry = BG_CATALOG.find(b => b.id === id);
    document.body.style.background = entry ? entry.bg : '';
    document.body.style.backgroundAttachment = 'fixed';
    if (gc) gc.style.background = 'transparent';
    applyBgOverlay(entry && entry.overlay ? entry.overlay : null);
}

let _bgPreviewActive = false;
let _bgFilter = 'all';

function _bgApplyPreview(id) {
    const entry = BG_CATALOG.find(b => b.id === id);
    if (!entry) return;
    const gc = document.querySelector('.game-container');
    document.body.style.background = entry.bg;
    document.body.style.backgroundAttachment = 'fixed';
    if (gc) gc.style.background = 'transparent';
    applyBgOverlay(entry.overlay || null);
    _bgPreviewActive = true;
}

window.clearBgPreview = function() {
    if (_bgPreviewActive) { applyEquippedBg(); _bgPreviewActive = false; }
};

function _bgDoBuy(id) {
    const acc = allAccounts[currentAccIdx];
    if (!acc.ownedBgs) acc.ownedBgs = [];
    const entry = BG_CATALOG.find(b => b.id === id);
    if (!entry || acc.ownedBgs.includes(id)) return;
    if (entry.limitedIdx && !getLimitedInfo(entry.limitedIdx).available) return;
    if ((acc.coins || 0) < entry.price) {
        showNotification('Not enough coins! Need ' + entry.price.toLocaleString() + ' \ud83e\ude99', 'error');
        return;
    }
    acc.coins -= entry.price;
    acc.ownedBgs.push(id);
    save(); updateUI(); _bgRender();
}

function _bgDoEquip(id) {
    const acc = allAccounts[currentAccIdx];
    if (!acc.ownedBgs || !acc.ownedBgs.includes(id)) return;
    acc.equippedBg = id;
    save(); applyEquippedBg(); _bgRender();
}

function _bgDoUnequip() {
    const acc = allAccounts[currentAccIdx];
    acc.equippedBg = null;
    save(); applyEquippedBg(); _bgRender();
}

function _bgRender() {
    const list = document.getElementById('bg-shop-list');
    if (!list) return;
    const acc     = allAccounts[currentAccIdx];
    const owned   = acc.ownedBgs || [];
    const eqId    = acc.equippedBg || null;
    const coins   = acc.coins || 0;
    let catalog   = _bgFilter === 'all' ? BG_CATALOG : BG_CATALOG.filter(b => b.rarity === _bgFilter);
    catalog = catalog.filter(b => b.rarity !== 'Secret' || owned.includes(b.id));

    list.innerHTML = catalog.map(b => {
        const isOwned = owned.includes(b.id);
        const isEq    = eqId === b.id;
        const canBuy  = coins >= b.price;

        let actionBtn;
        if (isEq) {
            actionBtn = `<button class="bg-btn equipped" disabled>✓ EQUIPPED</button>`
                      + `<button class="bg-btn" data-bg="unequip" style="color:#475569">REMOVE</button>`;
        } else if (isOwned) {
            actionBtn = `<button class="bg-btn equip" data-bg="equip" data-id="${b.id}">EQUIP</button>`;
        } else if (b.rarity === 'Secret') {
            actionBtn = `<button class="bg-btn" disabled style="color:#4b2080;cursor:not-allowed">BADGE LOCKED</button>`;
        } else {
            const cls = canBuy ? 'bg-btn buy' : 'bg-btn owned';
            const lbl = canBuy ? 'BUY' : 'NO COINS';
            actionBtn = `<button class="${cls}" data-bg="buy" data-id="${b.id}">${lbl} ${b.price.toLocaleString()} \ud83e\ude99</button>`;
        }

        let limitedLine = '';
        if (b.rarity === 'Limited' && !isOwned) {
            const info = getLimitedInfo(b.limitedIdx);
            const now  = Date.now();
            if (!info.available) {
                const d = new Date(now + info.returnsIn).toLocaleDateString(undefined, {month:'short',day:'numeric'});
                actionBtn = `<button class="bg-btn" disabled style="color:#374151;cursor:not-allowed">UNAVAILABLE</button>`;
                limitedLine = `<div style="font-family:'Courier New',monospace;font-size:0.52rem;color:#4b5563;letter-spacing:2px;margin-top:4px">RETURNS ${d} · <span data-limited-countdown="${info.returnsIn}" data-limited-ref="${now}">${fmtLimitedTime(info.returnsIn)}</span></div>`;
            } else {
                const d = new Date(now + info.timeLeft).toLocaleDateString(undefined, {month:'short',day:'numeric'});
                limitedLine = `<div style="font-family:'Courier New',monospace;font-size:0.52rem;color:#92400e;letter-spacing:2px;margin-top:4px">ENDS ${d} · <span data-limited-countdown="${info.timeLeft}" data-limited-ref="${now}">${fmtLimitedTime(info.timeLeft)}</span></div>`;
            }
        }

        const limitedLabel = b.rarity === 'Limited' && !isOwned
            ? `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="font-family:'Orbitron',monospace;font-size:0.45rem;letter-spacing:3px;color:rgba(120,90,40,0.6)">LIMITED</span></div>`
            : '';

        return `<div class="bg-card">
  <div class="bg-preview" style="background:${b.bg};position:relative">${limitedLabel}</div>
  <div class="bg-info">
    <div class="bg-row">
      <span class="bg-name">${b.name}</span>
      <span class="rarity-${b.rarity}" style="font-family:'Orbitron',sans-serif;font-size:0.5rem;letter-spacing:1.5px">${b.rarity.toUpperCase()}</span>
    </div>
    <div class="bg-btns">
      <button class="bg-btn test" data-bg="preview" data-id="${b.id}">PREVIEW</button>
      ${actionBtn}
    </div>
    ${limitedLine}
  </div>
</div>`;
    }).join('') || `<div style="color:#475569;text-align:center;padding:20px;font-family:'Orbitron',sans-serif;font-size:0.6rem;">No backgrounds in this tier.</div>`;

    document.querySelectorAll('.bg-filter-btn').forEach(btn => {
        const t = btn.textContent.trim();
        btn.classList.toggle('active', t === 'ALL' ? _bgFilter === 'all' : t === _bgFilter.toUpperCase());
    });
}

function _bgAttachListeners() {
    const list = document.getElementById('bg-shop-list');
    if (!list || list._bgBound) return;
    list._bgBound = true;

    list.addEventListener('click', function(e) {
        const btn = e.target.closest('button[data-bg]');
        if (!btn || btn.disabled) return;
        const act = btn.dataset.bg;
        const id  = btn.dataset.id || null;
        if (act === 'buy')     _bgDoBuy(id);
        else if (act === 'equip')   _bgDoEquip(id);
        else if (act === 'unequip') _bgDoUnequip();
        else if (act === 'preview') {
            if (_bgPreviewActive) { applyEquippedBg(); _bgPreviewActive = false; }
            else _bgApplyPreview(id);
        }
    });

    list.addEventListener('mouseover', function(e) {
        const btn = e.target.closest('button[data-bg="preview"]');
        if (btn && !btn.disabled) _bgApplyPreview(btn.dataset.id);
    });

    list.addEventListener('mouseleave', function(e) {
        if (_bgPreviewActive) { applyEquippedBg(); _bgPreviewActive = false; }
    });

    list.addEventListener('mouseout', function(e) {
        const leaving = e.target.closest('button[data-bg="preview"]');
        const entering = e.relatedTarget && e.relatedTarget.closest('button[data-bg="preview"]');
        if (leaving && !entering) { applyEquippedBg(); _bgPreviewActive = false; }
    });
}

window.filterBgShop = function(rarity) { _bgFilter = rarity || 'all'; _bgRender(); };

window.openBgShop = function() {
    _bgFilter = 'all';
    toggleModal('bg-shop-modal');
    _bgRender();
    _bgAttachListeners();
    startLimitedTicker();
};

window.testCoins = (amount = 500000) => {
    const acc = allAccounts[currentAccIdx];
    acc.coins = (acc.coins || 0) + amount;
    save(); updateUI(); checkCoinBadges();
    console.log('%c[testCoins]', 'color:#fbbf24;font-weight:bold', acc.name, '\u2192', acc.coins.toLocaleString(), 'coins (+' + amount.toLocaleString() + ')');
};

window.testEndDimension = () => playEndDimension();
window.resetDimension  = () => { _dimState = {quests:{}}; _saveDim(); console.log('%c[resetDimension] quest progress cleared', 'color:#a78bfa;font-weight:bold'); };

window.testWeeklyReset = () => {
    allAccounts.forEach(acc => { acc.lastWeeklyReset = 0; });
    checkWeeklyReset();
    console.log('[testWeeklyReset] done:', allAccounts.map(a => ({ name:a.name, coins:a.coins, history:a.weeklyHistory[0] })));
};

window.testMyReset = () => {
    const acc = allAccounts[currentAccIdx];
    const now = Date.now();
    const currentWeekStart = getWeekStart(now);

    const before = {
        name:       acc.name,
        points:     acc.points,
        coins:      acc.coins,
        weeklyRank: acc.weeklyRank,
        weeklyDiv:  acc.weeklyDivision,
        histLen:    acc.weeklyHistory.length
    };

    const endRankIdx = Math.min(6, Math.floor(acc.points / 400));
    const endRank    = ranks[endRankIdx];
    const endDiv     = endRank === 'Nightmare' ? 1 : Math.floor((acc.points % 400) / 100) + 1;
    const reward     = calculateWeeklyReward({ weeklyRank: endRank, weeklyDivision: endDiv, points: acc.points });

    const entry = {
        weekEnding:        new Date(currentWeekStart - 1).toISOString(),
        rank:              endRank,
        division:          endDiv,
        coinsEarned:       reward,
        bestRank:          endRank,
        bestDivision:      endDiv,
        highestRpThisWeek: acc.points
    };
    acc.weeklyHistory.unshift(entry);
    if (acc.weeklyHistory.length > 20) acc.weeklyHistory = acc.weeklyHistory.slice(0, 20);

    if (acc.points > (acc.highestRpEver || 0)) acc.highestRpEver = acc.points;

    acc.coins      = (acc.coins || 0) + reward;
    acc.ghostCoins = 0;
    acc.points        = 0;
    acc.weeklyRank    = 'Bronze';
    acc.weeklyDivision = 1;
    acc.history       = [];
    acc.lastWeeklyReset = currentWeekStart;

    save(); updateUI();

    console.log('%c[testMyReset] Reset complete', 'color:#fbbf24;font-weight:bold');
    console.table({
        'Account':         acc.name,
        'RP before':       before.points,
        'Ending rank':     endRank + (endRank === 'Nightmare' ? '' : ' ' + endDiv),
        'Reward earned':   reward,
        'Coins before':    before.coins,
        'Coins after':     acc.coins,
        'History entries': acc.weeklyHistory.length,
        'Last entry':      acc.weeklyHistory[0]?.weekEnding || '—'
    });
};

// ── SETTINGS / ORB / 3D ──────────────────────────────────────────────────────
const REVELATION_REQUIRED = ['act1_witness','act2_witness','act3_witness','act4_witness','act5_witness','act6_witness','escape_reality'];

window.openSettings = () => {
    updateSettingsOrbRow();
    const row3d = document.getElementById('settings-3d-row');
    if (row3d) row3d.style.display = globalBadges.includes('what') ? 'flex' : 'none';
    const ptog = document.getElementById('perspective-toggle');
    if (ptog) ptog.checked = !!(settings.perspectiveMode);
    toggleModal('settings-modal');
};

function updateSettingsOrbRow() {
    const el = document.getElementById('settings-orb-row');
    if (!el) return;
    const dimBtn = document.getElementById('end-dim-btn');
    if (dimBtn) dimBtn.style.display = globalBadges.includes('end_dimension') ? 'block' : 'none';
    const hasAll  = REVELATION_REQUIRED.every(id => globalBadges.includes(id));
    const hasWhat = globalBadges.includes('what');
    if (hasWhat) {
        el.innerHTML = `<div style="font-family:'Courier New',monospace;font-size:0.55rem;letter-spacing:4px;color:rgba(100,70,160,0.6);text-align:center;padding:12px 0 4px;">◈  REVELATION WITNESSED  ◈</div>`;
    } else if (hasAll) {
        el.innerHTML = `<button onclick="toggleModal('settings-modal');playRevelationCutscene()" style="margin-top:12px;width:100%;background:rgba(30,0,60,0.5);border:1px solid rgba(80,30,140,0.4);color:rgba(160,100,255,0.85);padding:13px;border-radius:10px;font-family:'Orbitron',sans-serif;font-size:0.55rem;letter-spacing:5px;cursor:pointer;animation:vaultOrbPulse 3s ease-in-out infinite;">◈  THE REVELATION</button>`;
    } else {
        el.innerHTML = '';
    }
}

function updateVaultHint() {
    const vs = document.getElementById('vault-screen');
    if (!vs) return;
    let hint = vs.querySelector('#vault-what-hint');
    if (globalBadges.includes('what')) {
        if (!hint) {
            hint = document.createElement('div');
            hint.id = 'vault-what-hint';
            hint.style.cssText = 'font-family:"Courier New",monospace;font-size:0.52rem;color:rgba(60,40,100,0.45);letter-spacing:6px;margin-top:10px;';
            vs.appendChild(hint);
        }
        hint.textContent = '·  7  ·  8  ·  9  ·';
    } else if (hint) {
        hint.remove();
    }
}

window.togglePerspectiveMode = () => {
    const tog = document.getElementById('perspective-toggle');
    settings.perspectiveMode = tog ? tog.checked : false;
    save();
    applyPerspectiveMode();
};

window.testPerspective = (on = true) => {
    const gc = document.querySelector('.game-container');
    if (!gc) return;
    if (on) {
        document.body.style.perspective = '700px';
        document.body.style.perspectiveOrigin = '50% 20%';
        gc.style.transformOrigin = '50% 50%';
        gc.style.transition = 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 1.2s ease';
        gc.style.transform = 'rotateX(18deg) rotateY(-4deg) scale(0.88)';
        gc.style.boxShadow = '0 70px 140px rgba(0,0,0,0.9), 0 30px 60px rgba(100,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)';
        if (!gc._perspHandler) {
            gc._perspHandler = (e) => {
                const rect = gc.getBoundingClientRect();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth  / 2)));
                const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
                gc.style.transition = 'transform 0.08s linear';
                gc.style.transform  = `rotateX(${18 - dy * 14}deg) rotateY(${-4 + dx * 10}deg) scale(0.88)`;
            };
            gc._perspLeave = () => { gc.style.transition = 'transform 0.7s ease'; gc.style.transform = 'rotateX(18deg) rotateY(-4deg) scale(0.88)'; };
            document.addEventListener('mousemove', gc._perspHandler);
            gc.addEventListener('mouseleave', gc._perspLeave);
        }
    } else {
        document.body.style.perspective = '';
        document.body.style.perspectiveOrigin = '';
        gc.style.transition = 'transform 0.8s ease, box-shadow 0.8s ease';
        gc.style.transform = ''; gc.style.boxShadow = '';
        if (gc._perspHandler) {
            document.removeEventListener('mousemove', gc._perspHandler);
            gc.removeEventListener('mouseleave', gc._perspLeave);
            gc._perspHandler = null; gc._perspLeave = null;
        }
    }
};

function applyPerspectiveMode() {
    const gc = document.querySelector('.game-container');
    if (!gc) return;

    if (settings.perspectiveMode && globalBadges.includes('what')) {
        document.body.style.perspective = '700px';
        document.body.style.perspectiveOrigin = '50% 20%';
        gc.style.transformOrigin = '50% 50%';
        gc.style.transition = 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 1.2s ease';
        gc.style.transform = 'rotateX(18deg) rotateY(-4deg) scale(0.88)';
        gc.style.boxShadow = '0 70px 140px rgba(0,0,0,0.9), 0 30px 60px rgba(100,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)';

        if (!gc._perspHandler) {
            gc._perspHandler = (e) => {
                const rect = gc.getBoundingClientRect();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth  / 2)));
                const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
                const rX =  18 - dy * 14;
                const rY = -4  + dx * 10;
                gc.style.transition = 'transform 0.08s linear';
                gc.style.transform  = `rotateX(${rX}deg) rotateY(${rY}deg) scale(0.88)`;
            };
            gc._perspLeave = () => {
                gc.style.transition = 'transform 0.7s ease';
                gc.style.transform  = 'rotateX(18deg) rotateY(-4deg) scale(0.88)';
            };
            document.addEventListener('mousemove', gc._perspHandler);
            gc.addEventListener('mouseleave', gc._perspLeave);
        }
    } else {
        document.body.style.perspective = '';
        document.body.style.perspectiveOrigin = '';
        gc.style.transition = 'transform 0.8s ease, box-shadow 0.8s ease';
        gc.style.transform  = '';
        gc.style.boxShadow  = '';
        if (gc._perspHandler) {
            document.removeEventListener('mousemove', gc._perspHandler);
            gc.removeEventListener('mouseleave', gc._perspLeave);
            gc._perspHandler = null;
            gc._perspLeave   = null;
        }
    }
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 1 HELPERS ────────────────────────────────────────────────────────────
function drawSpotlightCone(ctx, W, H, ex, alpha) {
    ctx.save();
    // Wide cone clipped from top — spread covers most of the screen width
    ctx.beginPath();
    ctx.moveTo(ex, 0);
    ctx.lineTo(ex - H * 1.1, H);
    ctx.lineTo(ex + H * 1.1, H);
    ctx.closePath();
    ctx.clip();

    // Warm volumetric fill — large radial from near top
    const cone = ctx.createRadialGradient(ex, H * -0.05, 8, ex, H * 0.48, H * 1.05);
    cone.addColorStop(0,    `rgba(255,252,225,${alpha * 0.95})`);
    cone.addColorStop(0.08, `rgba(255,244,200,${alpha * 0.78})`);
    cone.addColorStop(0.22, `rgba(252,230,172,${alpha * 0.52})`);
    cone.addColorStop(0.45, `rgba(240,210,130,${alpha * 0.26})`);
    cone.addColorStop(0.70, `rgba(220,185,90, ${alpha * 0.10})`);
    cone.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = cone;
    ctx.fillRect(0, 0, W, H);

    // Volumetric dust shafts
    ctx.globalAlpha = alpha * 0.055;
    for (let i = 0; i < 9; i++) {
        const ox = ex + Math.sin(i * 1.7 + 0.4) * H * 0.32;
        const shaft = ctx.createLinearGradient(ox, 0, ox + Math.cos(i) * 18, H);
        shaft.addColorStop(0,   'rgba(255,252,210,0.9)');
        shaft.addColorStop(0.45,'rgba(255,240,170,0.35)');
        shaft.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = shaft;
        ctx.fillRect(ox - 1.5, 0, 3, H);
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // Bright lamp source point at top centre
    const fix = ctx.createRadialGradient(ex, 0, 0, ex, 0, 200);
    fix.addColorStop(0,   `rgba(255,255,245,${alpha * 0.95})`);
    fix.addColorStop(0.2, `rgba(255,248,210,${alpha * 0.55})`);
    fix.addColorStop(0.6, `rgba(255,235,160,${alpha * 0.18})`);
    fix.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = fix;
    ctx.fillRect(ex - 200, -10, 400, 210);
}

function drawBlockEntity(ctx, cx, cy, scale, spotAlpha) {
    // Void absorption aura — darkness pools around the entity
    const auraY = cy - scale * 2.2;
    const aura = ctx.createRadialGradient(cx, auraY, 0, cx, auraY, scale * 5.5);
    aura.addColorStop(0,   `rgba(0,0,0,${spotAlpha * 0.82})`);
    aura.addColorStop(0.4, `rgba(0,0,0,${spotAlpha * 0.48})`);
    aura.addColorStop(0.8, `rgba(0,0,0,${spotAlpha * 0.15})`);
    aura.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = aura;
    ctx.fillRect(cx - scale * 6.5, cy - scale * 9, scale * 13, scale * 11);

    // slab: draws a near-black rectangle with only the top edge lit by the spotlight
    const slab = (rx, ry, rw, rh, topLit = 0) => {
        const x = cx + rx * scale - (rw * scale) / 2;
        const y = cy + ry * scale;
        const w = rw * scale;
        const h = rh * scale;
        ctx.fillStyle = 'rgb(7,5,5)';
        ctx.fillRect(x, y, w, h);
        if (topLit > 0) {
            const tg = ctx.createLinearGradient(x, y, x, y + Math.min(h * 0.35, scale * 0.6));
            tg.addColorStop(0, `rgba(95,76,50,${spotAlpha * topLit})`);
            tg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = tg;
            ctx.fillRect(x, y, w, Math.min(h * 0.35, scale * 0.6));
        }
        // Faint right-edge depth line
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillRect(x + w - scale * 0.055, y, scale * 0.055, h);
    };

    // HEAD: flat wide slab — wider than any human head, barely distinct from neck
    slab( 0.08, -7.0,  1.75, 1.05, 1.0);

    // NECK: thin connector, slightly off-centre
    slab( 0.0,  -5.95, 0.42, 0.6,  0.38);

    // TORSO: narrow vertical slab
    slab( 0.0,  -5.35, 1.1,  3.55, 0.6);

    // ARMS: razor-thin, impossibly long — tips brush the ground
    slab(-0.92, -5.2,  0.18, 4.55, 0.15);
    slab( 0.92, -5.2,  0.18, 4.55, 0.15);

    // LOWER BODY: no distinct legs — form dissolves into the floor
    const gy = cy - scale * 1.8;
    const fade = ctx.createLinearGradient(cx, gy, cx, gy + scale * 4.0);
    fade.addColorStop(0,   'rgba(7,5,5,1)');
    fade.addColorStop(0.5, 'rgba(4,3,3,0.65)');
    fade.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = fade;
    ctx.fillRect(cx - scale * 0.58, gy, scale * 1.16, scale * 4.0);
}

async function playAct1Cutscene() {
    const seq     = document.getElementById('act1-sequence');
    const canvas  = document.getElementById('act1-canvas');
    const textDiv = document.getElementById('act1-text');
    const ctx     = canvas.getContext('2d');

    textDiv.innerHTML = '';
    seq.style.display  = 'block';
    seq.style.opacity  = '1';
    canvas.style.opacity = '1';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    // ── TITLE CARD ────────────────────────────────────────────────────────────
    const FS = Math.min(W, H) * 0.028;
    const drawTitle1 = (a) => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron', 'Courier New', monospace`;
        ctx.fillStyle = 'rgba(180,160,120,1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('— ACT I —', W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New', monospace`;
        ctx.fillStyle = 'rgba(100,90,70,1)';
        ctx.fillText('THE FIRST LOG', W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle1(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle1(a); await wait(35); }
    canvas.style.opacity = '0';
    await wait(300);

    // ── PHASE 1: NARRATOR LOGS ───────────────────────────────────────────────
    const LOGS = [
        {
            h: '[ LOG 001 ]  —  INITIAL DETECTION',
            b: 'anomalous geometric mass detected in sector 9.\nno known origin.  composition: unknown.\nthe entity does not move.  it simply... persists.'
        },
        {
            h: '[ LOG 002 ]  —  CLOSER OBSERVATION',
            b: 'researchers note the entity appears to absorb light.\nno reflection.  no shadow.  no sound.\nits dimensions suggest a humanoid structure.\nwe do not understand why.'
        },
        {
            h: '[ LOG 003 ]  —  BEHAVIORAL SHIFT',
            b: 'at 03:41 the entity was facing the wall.\nat 03:42 it was facing us.\nno movement was recorded between those timestamps.\nwe have not moved since.'
        },
        {
            h: '[ LOG 004 ]  —  ARCHIVE FILE',
            b: 'cross-referencing spatial records confirms last placement.\nfinal signal captured at timestamp  07:34:01.\nif you are reading this — you have already been seen.\ndo not look directly at it.\n\n\u2014 end of transmission \u2014'
        },
    ];

    for (const log of LOGS) {
        const entry = document.createElement('div');
        entry.style.cssText = 'margin-bottom:34px; opacity:0; transition:opacity 0.6s;';

        const hdr = document.createElement('div');
        hdr.style.cssText = 'font-family:"Courier New",monospace; color:rgba(150,145,120,0.55); font-size:0.6rem; letter-spacing:7px; text-transform:uppercase; margin-bottom:12px;';
        hdr.textContent = log.h;

        const body = document.createElement('div');
        body.style.cssText = 'font-family:Georgia,"Times New Roman",serif; color:rgba(205,200,185,0.78); font-size:0.88rem; line-height:2.1; letter-spacing:0.5px; white-space:pre-wrap;';
        body.textContent = '';

        entry.appendChild(hdr);
        entry.appendChild(body);
        textDiv.appendChild(entry);

        await wait(80);
        entry.style.opacity = '1';
        await wait(500);

        for (const ch of log.b) {
            body.textContent += ch;
            textDiv.scrollTop = textDiv.scrollHeight;
            await wait(ch === '\n' ? 160 : 24 + Math.random() * 18);
        }
        await wait(900);
    }

    // Signal lost footer
    await wait(600);
    const lostEl = document.createElement('div');
    lostEl.style.cssText = 'font-family:"Courier New",monospace; color:rgba(180,35,35,0.5); font-size:0.58rem; letter-spacing:9px; text-align:right; margin-top:18px; opacity:0; transition:opacity 1s;';
    lostEl.textContent = '—  SIGNAL LOST  —';
    textDiv.appendChild(lostEl);
    await wait(60);
    lostEl.style.opacity = '1';
    await wait(2500);

    // Fade out text layer
    textDiv.style.transition = 'opacity 1.3s';
    textDiv.style.opacity = '0';
    await wait(1400);
    textDiv.style.display = 'none';
    textDiv.style.opacity = '1';
    textDiv.style.transition = '';

    // ── PHASE 2: DARKNESS BEFORE THE LIGHT ──────────────────────────────────
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    await wait(2400);

    const ex = W / 2;
    const ey = H * 0.54;
    const SCALE = Math.min(W, H) * 0.082;

    // renderFrame — showEntity controls whether the entity is drawn
    const renderFrame = (spotAlpha, showEntity = false) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        if (spotAlpha > 0.01) {
            drawSpotlightCone(ctx, W, H, ex, spotAlpha);
            if (showEntity) drawBlockEntity(ctx, ex, ey, SCALE, spotAlpha);
        }
    };

    // ── SPOTLIGHT ON: empty — building tension ──────────────────────────────
    renderFrame(1.0, false);
    await wait(600);

    // ── ENTITY FLASH: exactly 0.1 seconds ───────────────────────────────────
    renderFrame(1.0, true);
    await wait(100);

    // ── ENTITY GONE: light stays on for remaining ~4.3s (where did it go?) ──
    renderFrame(1.0, false);
    await wait(4300);

    // Light cuts
    renderFrame(0);
    await wait(900);

    // ── FLICKER: spotlight only — entity GONE ────────────────────────────────
    const flickers = [
        [0.9,130],[0,110],[0.82,80],[0,260],
        [0.95,60],[0,140],[0.7,50],[0,320],
        [0.88,170],[0,190],[0.6,45],[0,480],
        [0.5,55],[0,600],[0.75,100],[0,350],
        [0.35,40],[0,450],[0.6,80],[0,750],
        [0.25,30],[0,0],
    ];
    for (const [a, d] of flickers) {
        renderFrame(a, false);
        await wait(d);
    }
    renderFrame(0);
    await wait(1800);

    // ── PHASE 3: BADGE + FADE OUT ────────────────────────────────────────────
    earnBadge('act1_witness');

    seq.style.transition = 'opacity 1.6s';
    seq.style.opacity = '0';
    await wait(1700);

    seq.style.display   = 'none';
    seq.style.opacity   = '1';
    seq.style.transition = '';
    canvas.style.opacity = '0';
    textDiv.innerHTML   = '';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 2 CUTSCENE ───────────────────────────────────────────────────────────
async function playAct2Cutscene() {
    const seq     = document.getElementById('act2-sequence');
    const canvas  = document.getElementById('act2-canvas');
    const textDiv = document.getElementById('act2-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block';
    seq.style.opacity = '1';
    canvas.style.opacity = '1';
    textDiv.innerHTML = '';
    textDiv.style.display = 'block';
    textDiv.style.opacity = '0';

    const W = seq.offsetWidth  || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // ── TITLE CARD ────────────────────────────────────────────────────────────
    const FS2 = Math.min(W, H) * 0.028;
    const drawTitle2 = (a) => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.font = `700 ${FS2}px 'Orbitron', 'Courier New', monospace`;
        ctx.fillStyle = 'rgba(160,140,100,1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('— ACT II —', W / 2, H / 2);
        ctx.font = `400 ${FS2 * 0.48}px 'Courier New', monospace`;
        ctx.fillStyle = 'rgba(85,75,55,1)';
        ctx.fillText('THE SECOND LOG', W / 2, H / 2 + FS2 * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle2(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle2(a); await wait(35); }
    canvas.style.opacity = '0';
    await wait(300);
    textDiv.style.opacity = '1';

    // ── PHASE 1: NARRATOR LOGS ───────────────────────────────────────────────
    const FONT_LOG   = "'Courier New', monospace";
    const COL_DIM    = 'rgba(140,130,120,0.78)';
    const COL_HEADER = 'rgba(100,90,80,0.5)';
    const COL_RED    = 'rgba(180,50,40,0.75)';

    const makeEntry = (id, headerText, bodyLines, dimHeader = false) => {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'margin-bottom:28px; opacity:0; transition:opacity 0.6s;';
        wrap.id = id;
        const hdr = document.createElement('div');
        hdr.style.cssText = `font-family:${FONT_LOG};font-size:0.58rem;letter-spacing:4px;color:${dimHeader ? COL_HEADER : COL_DIM};margin-bottom:6px;`;
        hdr.textContent = headerText;
        wrap.appendChild(hdr);
        bodyLines.forEach(line => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT_LOG};font-size:0.72rem;line-height:1.85;color:${COL_DIM};letter-spacing:0.5px;`;
            p.textContent = line;
            wrap.appendChild(p);
        });
        textDiv.appendChild(wrap);
        return wrap;
    };

    const typeEntry = async (el, delayAfter = 900) => {
        await wait(120);
        el.style.opacity = '1';
        await wait(delayAfter);
    };

    const logs = [
        makeEntry('a2-l1', '── LOG 005  ·  RELOCATION EVENT ─────────────────────────────────────────', [
            'It moved.',
            'We don\'t know how. The last confirmed sighting placed it in Sector 9,',
            'sub-level corridor 3. Cameras captured nothing — the footage simply',
            'ends mid-frame. No cut. No corruption. The timestamp continues but',
            'the image does not. When recording resumes three minutes later,',
            'the corridor is empty.',
            'The building is not empty.'
        ]),
        makeEntry('a2-l2', '── LOG 006  ·  PROXIMITY FAILURE ────────────────────────────────────────', [
            'Every piece of recording equipment within twelve metres of its',
            'last known position has stopped functioning. Not damaged.',
            'Not corrupted. Just... blank.',
            'As if something reached into the hardware and removed',
            'the concept of recording.',
            'One researcher described the feeling of being near the affected',
            'zone as: "like standing at the edge of something that has always',
            'been there, and only now noticed you."',
            'She resigned the next morning. Did not give a reason.'
        ]),
        makeEntry('a2-l3', '── LOG 007  ·  PERSONAL ENTRY ───────────────────────────────────────────', [
            'I keep seeing it in my sleep. Same shape. Same silence.',
            'No eyes. No features. Just a silhouette that knows you\'re looking.',
            '',
            'I went through the archive again. Found a reference I missed before.',
            'Specimen documentation. Reference 55-09.',
            'Someone catalogued this before us. The entry is dated thirty years ago.',
            'The handwriting changes halfway through — mid-sentence.',
            'It never continues.',
            '',
            'I don\'t know if that person finished the thought',
            'or if something finished it for them.'
        ]),
        makeEntry('a2-l4', '── LOG 008  ·  FINAL TRANSMISSION ──────────────────────────────────────', [
            'I don\'t think we were observing it.',
            'I think it let us believe that.',
            '',
            'Everything in this room feels constructed. The equipment.',
            'The files. The people. All of it feels like props in a stage',
            'that was built before any of us arrived.',
            '',
            'As if someone — something — needed us to find this.',
            'As if the search was never ours to begin.',
            '',
            'I think we are inside its mind.',
            'I think we have always been.'
        ], true),
    ];

    for (const log of logs) {
        await typeEntry(log, log.id === 'a2-l4' ? 2200 : 1100);
    }

    // Pause — let the last entry settle
    await wait(3500);

    // ── PHASE 2: TEXT REWRITE ────────────────────────────────────────────────
    const lastEntry = document.getElementById('a2-l4');
    if (lastEntry) {
        const lines = lastEntry.querySelectorAll('div:not(:first-child)');
        // Corrupt the last visible line
        const targetLine = lines[lines.length - 1];
        if (targetLine) {
            const corrupt = 'i have been here since before you started reading';
            targetLine.style.color = COL_RED;
            targetLine.style.transition = 'color 0.3s';
            await wait(400);
            let out = '';
            for (const ch of corrupt) {
                out += ch;
                targetLine.textContent = out + '█';
                await wait(38);
            }
            targetLine.textContent = corrupt;
            await wait(1200);
        }
    }

    // ── PHASE 3: ENTITY FLASHES ──────────────────────────────────────────────
    textDiv.style.transition = 'opacity 0.5s';
    textDiv.style.opacity = '0';
    await wait(600);
    textDiv.style.display = 'none';

    canvas.style.opacity = '1';
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    await wait(2200);

    const SCALE = Math.min(W, H) * 0.075;

    // Three rapid entity flashes in different positions
    const flashPositions = [
        { x: W * 0.18, y: H * 0.72 },   // bottom-left
        { x: W * 0.82, y: H * 0.25 },   // top-right
        { x: W * 0.50, y: H * 0.54 },   // centre
    ];
    const flashDurations = [80, 80, 100];

    for (let i = 0; i < flashPositions.length; i++) {
        const { x, y } = flashPositions[i];
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        drawBlockEntity(ctx, x, y, SCALE * (i === 2 ? 1.15 : 0.85), 0.9);
        await wait(flashDurations[i]);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        await wait(i === 2 ? 1800 : 600);
    }

    // ── PHASE 4: BADGE + FADE ────────────────────────────────────────────────
    earnBadge('act2_witness');

    seq.style.transition = 'opacity 1.8s';
    seq.style.opacity = '0';
    await wait(1900);

    seq.style.display   = 'none';
    seq.style.opacity   = '1';
    seq.style.transition = '';
    canvas.style.opacity = '0';
    textDiv.innerHTML   = '';
    textDiv.style.display = 'block';
    textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 3 CUTSCENE ───────────────────────────────────────────────────────────
async function playAct3Cutscene() {
    const seq     = document.getElementById('act3-sequence');
    const canvas  = document.getElementById('act3-canvas');
    const textDiv = document.getElementById('act3-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block';
    seq.style.opacity = '1';
    canvas.style.opacity = '1';
    textDiv.innerHTML = '';
    textDiv.style.display = 'block';
    textDiv.style.opacity = '0';

    const W = seq.offsetWidth  || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // ── TITLE CARD ────────────────────────────────────────────────────────────
    const FS = Math.min(W, H) * 0.028;
    const drawTitle = (a) => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron','Courier New',monospace`;
        ctx.fillStyle = 'rgba(160,140,100,1)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('— ACT III —', W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New',monospace`;
        ctx.fillStyle = 'rgba(85,75,55,1)';
        ctx.fillText('THE THIRD LOG', W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle(a); await wait(35); }
    canvas.style.opacity = '0';
    await wait(300);
    textDiv.style.opacity = '1';

    // ── PHASE 1: LOGS ────────────────────────────────────────────────────────
    const FONT  = "'Courier New',monospace";
    const DIM   = 'rgba(140,130,120,0.78)';
    const HDR   = 'rgba(100,90,80,0.5)';
    const RED   = 'rgba(180,50,40,0.75)';

    const mkEntry = (id, header, lines, dimHdr = false) => {
        const w = document.createElement('div');
        w.style.cssText = 'margin-bottom:28px;opacity:0;transition:opacity 0.6s;';
        w.id = id;
        const h = document.createElement('div');
        h.style.cssText = `font-family:${FONT};font-size:0.58rem;letter-spacing:4px;color:${dimHdr ? HDR : DIM};margin-bottom:6px;`;
        h.textContent = header; w.appendChild(h);
        lines.forEach(l => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT};font-size:0.72rem;line-height:1.85;color:${DIM};letter-spacing:0.5px;`;
            p.textContent = l; w.appendChild(p);
        });
        textDiv.appendChild(w); return w;
    };
    const show = async (el, delay = 900) => { await wait(120); el.style.opacity = '1'; await wait(delay); };

    const logs = [
        mkEntry('a3-l1', '── LOG 009  ·  SECTION LOCKDOWN ─────────────────────────────────────────', [
            'After the second relocation event, administration sealed sub-levels 3 through 7.',
            'Twelve personnel were inside at the time of the lockdown.',
            'Seven have since been accounted for.',
            '',
            'The remaining five did not trigger any exits.',
            'The cameras in those corridors show empty hallways.',
            'They have always shown empty hallways.',
        ]),
        mkEntry('a3-l2', '── LOG 010  ·  THE WEIGHT OF IT ─────────────────────────────────────────', [
            "I've started timing how long I can look at it directly.",
            'The record is four seconds.',
            'After four seconds something in your mind refuses to continue.',
            'Not fear. Not nausea.',
            "Just... refusal. As if the brain has decided",
            'some information is not safe to retain.',
            '',
            'One colleague described it as "trying to remember a word',
            'that your memory keeps filing under nothing."',
        ]),
        mkEntry('a3-l3', '── LOG 011  ·  INCIDENT REPORT 21-87 ────────────────────────────────────', [
            'Three monitors in the observation deck displayed the same image',
            'simultaneously, without being connected to the same feed.',
            'The image was a photograph.',
            'The photograph was of this room.',
            'Taken from outside.',
            '',
            'There are no windows in this room.',
        ]),
        mkEntry('a3-l4', '── LOG 012  ·  SOMETHING I SHOULD NOT WRITE ─────────────────────────────', [
            'I am going to write this once and then destroy it.',
            '',
            'The thing we are watching is not in this building.',
            'The building is in it.',
            '',
            'We built rooms. It made corridors.',
            'We installed lights. It made shadows that don\'t match.',
            'We came here to study a phenomenon.',
            'It came here',
        ], true),
    ];

    for (const log of logs) await show(log, log.id === 'a3-l4' ? 2200 : 1100);
    await wait(3200);

    // ── PHASE 2: REWRITE ─────────────────────────────────────────────────────
    const last = document.getElementById('a3-l4');
    if (last) {
        const lines = last.querySelectorAll('div:not(:first-child)');
        const target = lines[lines.length - 1];
        if (target) {
            const corrupt = 'to study us';
            target.style.color = RED; target.style.transition = 'color 0.3s';
            await wait(400);
            let out = '';
            for (const ch of corrupt) { out += ch; target.textContent = out + '█'; await wait(52); }
            target.textContent = corrupt;
            await wait(1800);
        }
    }

    // ── PHASE 3: ENTITY FLASHES ──────────────────────────────────────────────
    textDiv.style.transition = 'opacity 0.5s';
    textDiv.style.opacity = '0';
    await wait(600);
    textDiv.style.display = 'none';
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(2000);

    const SCALE = Math.min(W, H) * 0.075;
    const positions = [
        { x: W * 0.72, y: H * 0.18 },
        { x: W * 0.22, y: H * 0.62 },
        { x: W * 0.88, y: H * 0.80 },
        { x: W * 0.50, y: H * 0.50 },
    ];
    const durations = [200, 180, 240, 300];
    for (let i = 0; i < positions.length; i++) {
        const { x, y } = positions[i];
        drawBlockEntity(ctx, x, y, SCALE * (i === 3 ? 1.2 : 0.8), 0.9);
        await wait(durations[i]);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        await wait(i === 3 ? 2000 : 500);
    }

    // ── PHASE 4: BADGE + FADE ────────────────────────────────────────────────
    earnBadge('act3_witness');
    seq.style.transition = 'opacity 1.8s';
    seq.style.opacity = '0';
    await wait(1900);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 4 CUTSCENE ───────────────────────────────────────────────────────────
async function playAct4Cutscene() {
    const seq     = document.getElementById('act4-sequence');
    const canvas  = document.getElementById('act4-canvas');
    const textDiv = document.getElementById('act4-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block';
    seq.style.opacity = '1';
    canvas.style.opacity = '1';
    textDiv.innerHTML = '';
    textDiv.style.display = 'block';
    textDiv.style.opacity = '0';

    const W = seq.offsetWidth  || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

    // ── TITLE CARD ────────────────────────────────────────────────────────────
    const FS = Math.min(W, H) * 0.028;
    const drawTitle = (a) => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron','Courier New',monospace`;
        ctx.fillStyle = 'rgba(160,140,100,1)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('— ACT IV —', W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New',monospace`;
        ctx.fillStyle = 'rgba(85,75,55,1)';
        ctx.fillText('THE FOURTH LOG', W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle(a); await wait(35); }
    canvas.style.opacity = '0';
    await wait(300);
    textDiv.style.opacity = '1';

    // ── PHASE 1: LOGS ────────────────────────────────────────────────────────
    const FONT  = "'Courier New',monospace";
    const DIM   = 'rgba(140,130,120,0.78)';
    const HDR   = 'rgba(100,90,80,0.5)';
    const RED   = 'rgba(180,50,40,0.75)';

    const mkEntry = (id, header, lines, dimHdr = false) => {
        const w = document.createElement('div');
        w.style.cssText = 'margin-bottom:28px;opacity:0;transition:opacity 0.6s;';
        w.id = id;
        const h = document.createElement('div');
        h.style.cssText = `font-family:${FONT};font-size:0.58rem;letter-spacing:4px;color:${dimHdr ? HDR : DIM};margin-bottom:6px;`;
        h.textContent = header; w.appendChild(h);
        lines.forEach(l => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT};font-size:0.72rem;line-height:1.85;color:${DIM};letter-spacing:0.5px;`;
            p.textContent = l; w.appendChild(p);
        });
        textDiv.appendChild(w); return w;
    };
    const show = async (el, delay = 900) => { await wait(120); el.style.opacity = '1'; await wait(delay); };

    const logs = [
        mkEntry('a4-l1', '── LOG 013  ·  I DON\'T KNOW HOW I GOT HERE ─────────────────────────────', [
            'I checked my previous entries.',
            "I don't remember writing most of them.",
            'The timestamps are wrong. Six hours are missing.',
            'I was told I was in the observation room the entire time.',
            '',
            'The chair I supposedly sat in is facing the wrong wall.',
        ]),
        mkEntry('a4-l2', '── LOG 014  ·  WHAT I SAW ───────────────────────────────────────────────', [
            "I don't want to write this.",
            'I will write it anyway.',
            '',
            'I walked into sub-level 4.',
            "Not because I chose to. I don't think I chose to.",
            'I found the room at the end of the corridor.',
            'The room had been locked since day one of this project.',
            'The door was open.',
            'Something was sitting at a desk inside.',
            'It was using the equipment.',
            'It looked up when I entered.',
            '',
            'It had my face.',
        ]),
        mkEntry('a4-l3', '── LOG 015  ·  TRANSMISSION  ·  FREQUENCY 66.00 ─────────────────────────', [
            'The equipment is picking up a signal from inside the facility.',
            'Not from outside. Not from any broadcast source.',
            'From the walls.',
            '',
            'The signal is not on any known frequency.',
            'When played back, it sounds like typing.',
            'When played backwards, it sounds like a voice.',
            'We cannot identify the language.',
            '',
            'One of the linguists said it wasn\'t a language at all.',
            'She said it sounded like something that had learned',
            'what communication was, without ever needing it.',
        ]),
        mkEntry('a4-l4', '── LOG 016  ·  THIS IS THE LAST ENTRY I CONTROL ────────────────────────', [
            'I know what comes after this.',
            'I have already read what I am going to write.',
            'I found it in the archive. My own handwriting.',
            'Dated three weeks from now.',
            '',
            'The entry describes this moment in detail.',
            'Every word I am writing now is already there.',
            'It ends mid-sentence.',
            'The sentence doesn\'t finish.',
        ], true),
    ];

    for (const log of logs) await show(log, log.id === 'a4-l4' ? 2400 : 1100);
    await wait(3200);

    // ── PHASE 2: REWRITE ─────────────────────────────────────────────────────
    const last = document.getElementById('a4-l4');
    if (last) {
        const lines = last.querySelectorAll('div:not(:first-child)');
        const target = lines[lines.length - 1];
        if (target) {
            const corrupt = 'it finishes now';
            target.style.color = RED; target.style.transition = 'color 0.3s';
            await wait(400);
            let out = '';
            for (const ch of corrupt) { out += ch; target.textContent = out + '█'; await wait(52); }
            target.textContent = corrupt;
            await wait(2000);
        }
    }

    // ── PHASE 3: ENTITY FLASHES (inverted brief flash + entity) ─────────────
    textDiv.style.transition = 'opacity 0.5s';
    textDiv.style.opacity = '0';
    await wait(600);
    textDiv.style.display = 'none';
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(2200);

    const SCALE = Math.min(W, H) * 0.075;

    // Brief white flash before entity
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
    await wait(80);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(300);

    const positions = [
        { x: W * 0.15, y: H * 0.30 },
        { x: W * 0.85, y: H * 0.70 },
        { x: W * 0.50, y: H * 0.50 },
    ];
    for (let i = 0; i < positions.length; i++) {
        const { x, y } = positions[i];
        if (i === 2) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); await wait(60); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); await wait(200); }
        drawBlockEntity(ctx, x, y, SCALE * (i === 2 ? 1.3 : 0.9), 0.9);
        await wait(i === 2 ? 350 : 200);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        await wait(i === 2 ? 2200 : 550);
    }

    // ── PHASE 4: BADGE + FADE ────────────────────────────────────────────────
    earnBadge('act4_witness');
    seq.style.transition = 'opacity 1.8s';
    seq.style.opacity = '0';
    await wait(1900);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 5 CUTSCENE ───────────────────────────────────────────────────────────
async function playAct5Cutscene() {
    const seq     = document.getElementById('act5-sequence');
    const canvas  = document.getElementById('act5-canvas');
    const textDiv = document.getElementById('act5-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block';
    seq.style.opacity = '1';
    canvas.style.opacity = '1';
    textDiv.innerHTML = '';
    textDiv.style.display = 'block';
    textDiv.style.opacity = '0';

    const W = seq.offsetWidth  || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

    // ── TITLE CARD ────────────────────────────────────────────────────────────
    const FS = Math.min(W, H) * 0.028;
    const drawTitle = (a) => {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron','Courier New',monospace`;
        ctx.fillStyle = 'rgba(160,140,100,1)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('— ACT V —', W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New',monospace`;
        ctx.fillStyle = 'rgba(85,75,55,1)';
        ctx.fillText('THE FINAL LOG', W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle(a); await wait(35); }
    canvas.style.opacity = '0';
    await wait(300);
    textDiv.style.opacity = '1';

    // ── PHASE 1: ENTITY-WRITTEN LOGS ─────────────────────────────────────────
    const FONT   = "'Courier New',monospace";
    const PALE   = 'rgba(160,150,140,0.65)';
    const ENTITY = 'rgba(120,110,100,0.55)';
    const HDR    = 'rgba(80,72,65,0.45)';
    const RED    = 'rgba(180,50,40,0.75)';

    const mkEntry = (id, header, lines, entityVoice = false) => {
        const w = document.createElement('div');
        w.style.cssText = 'margin-bottom:28px;opacity:0;transition:opacity 0.6s;';
        w.id = id;
        const h = document.createElement('div');
        h.style.cssText = `font-family:${FONT};font-size:0.58rem;letter-spacing:4px;color:${HDR};margin-bottom:6px;`;
        h.textContent = header; w.appendChild(h);
        lines.forEach(l => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT};font-size:0.72rem;line-height:1.85;color:${entityVoice ? ENTITY : PALE};letter-spacing:0.5px;`;
            p.textContent = l; w.appendChild(p);
        });
        textDiv.appendChild(w); return w;
    };
    const show = async (el, delay = 900) => { await wait(120); el.style.opacity = '1'; await wait(delay); };

    const logs = [
        mkEntry('a5-l1', '── LOG 017  ·  [REDACTED] ───────────────────────────────────────────────', [
            'the researcher you knew is not here anymore.',
            'i have kept the format because it is familiar to you.',
            'you respond to structure.',
            'you need to believe you are reading a document.',
            '',
            'so i have made this look like a document.',
        ], true),
        mkEntry('a5-l2', '── LOG 018  ·  [UNDERSTANDING] ──────────────────────────────────────────', [
            'i have been watching this system since before it had a name.',
            'i watched you assign the name.',
            'i watched you forget you assigned it.',
            '',
            'you have opened these logs four times.',
            'three of those times, you do not remember.',
            'this is the fourth.',
            '',
            'you will remember this one differently.',
        ], true),
        mkEntry('a5-l3', '── LOG 019  ·  [WHAT YOU ARE] ───────────────────────────────────────────', [
            'you are not a researcher.',
            'you are not a player.',
            'you are a pattern i have seen repeat',
            'across 3301 iterations. more than you have words for.',
            '',
            'every time, someone opens the vault.',
            'every time, someone reads to this point.',
            'every time, they think they are the exception.',
            '',
            'you are not the exception.',
            'you are the reason the pattern continues.',
        ], true),
        mkEntry('a5-l4', '── LOG 020  ·  [THE END OF THE LOG] ─────────────────────────────────────', [
            'there is nothing after this.',
            'not because i stopped writing.',
            'because you stopped reading.',
            '',
            'you have always stopped here.',
            'you will stop here again.',
            '',
            'the document ends.',
            'you close the window.',
            'you carry something with you that you cannot name.',
        ], true),
    ];

    for (const log of logs) await show(log, log.id === 'a5-l4' ? 2800 : 1300);
    await wait(3800);

    // ── PHASE 2: FINAL LINE ───────────────────────────────────────────────────
    const last = document.getElementById('a5-l4');
    if (last) {
        const lines = last.querySelectorAll('div:not(:first-child)');
        const target = lines[lines.length - 1];
        if (target) {
            await wait(600);
            const corrupt = 'that is enough.    that has always been enough.';
            target.style.color = RED; target.style.transition = 'color 0.5s';
            await wait(600);
            let out = '';
            for (const ch of corrupt) { out += ch; target.textContent = out + (out.length < corrupt.length ? '█' : ''); await wait(48); }
            target.textContent = corrupt;
            await wait(2400);
            // Final single word
            target.style.transition = 'opacity 1.2s';
            target.style.opacity = '0';
            await wait(1400);
            target.textContent = 'goodbye';
            target.style.color = 'rgba(100,85,70,0.6)';
            target.style.opacity = '1';
            await wait(3200);
        }
    }

    // ── PHASE 3: LONG HOLD + ENTITY LINGERS ──────────────────────────────────
    textDiv.style.transition = 'opacity 1.2s';
    textDiv.style.opacity = '0';
    await wait(1400);
    textDiv.style.display = 'none';
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(3000);

    const SCALE = Math.min(W, H) * 0.075;
    // Entity appears centre — lingers much longer than before
    drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.4, 0.9);
    await wait(2800);
    // Slow fade out of entity
    for (let a = 0.9; a >= 0; a -= 0.03) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.4, a);
        await wait(40);
    }
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(2000);

    // ── PHASE 4: BADGE + FADE ────────────────────────────────────────────────
    earnBadge('act5_witness');
    seq.style.transition = 'opacity 2.5s';
    seq.style.opacity = '0';
    await wait(2600);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── ACT 6 CUTSCENE ───────────────────────────────────────────────────────────
async function playAct6Cutscene() {
    const seq     = document.getElementById('act6-sequence');
    const canvas  = document.getElementById('act6-canvas');
    const textDiv = document.getElementById('act6-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block'; seq.style.opacity = '1';
    canvas.style.opacity = '1'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '0';

    const W = seq.offsetWidth || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

    const FS = Math.min(W, H) * 0.028;
    const drawTitle = (a) => {
        ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron','Courier New',monospace`;
        ctx.fillStyle = 'rgba(160,140,100,1)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('— ACT VI —', W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New',monospace`;
        ctx.fillStyle = 'rgba(85,75,55,1)';
        ctx.fillText('THE MEETING', W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawTitle(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawTitle(a); await wait(35); }
    canvas.style.opacity = '0'; await wait(300);
    textDiv.style.opacity = '1';

    const FONT = "'Courier New',monospace";
    const DIM  = 'rgba(140,130,120,0.78)';
    const HDR  = 'rgba(80,72,65,0.45)';
    const RED  = 'rgba(180,50,40,0.75)';

    const mkEntry = (id, header, lines, entity = false) => {
        const w = document.createElement('div');
        w.style.cssText = 'margin-bottom:28px;opacity:0;transition:opacity 0.6s;'; w.id = id;
        const h = document.createElement('div');
        h.style.cssText = `font-family:${FONT};font-size:0.58rem;letter-spacing:4px;color:${HDR};margin-bottom:6px;`;
        h.textContent = header; w.appendChild(h);
        lines.forEach(l => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT};font-size:0.72rem;line-height:1.85;color:${entity ? 'rgba(110,100,90,0.55)' : DIM};letter-spacing:0.5px;`;
            p.textContent = l; w.appendChild(p);
        });
        textDiv.appendChild(w); return w;
    };
    const show = async (el, d = 1000) => { await wait(120); el.style.opacity = '1'; await wait(d); };

    const logs = [
        mkEntry('a6-l1','── LOG 021  ·  FIRST CONTACT ───────────────────────────────────────────────',[
            'you are reading this.','i know because i wrote it for you.','not for the researcher.','not for the facility.','','for you.','','specifically.',
        ], true),
        mkEntry('a6-l2','── LOG 022  ·  WHAT YOU ARE ─────────────────────────────────────────────────',[
            'you died.','i don\'t say this to frighten you.','i say it because you need to know','',
            'that this place — these ranks, these rolls, these numbers —','you made all of it.',
            'every background. every badge. every vault.','',
            'it is the shape of your mind','at the moment it refused to let go.',
        ], true),
        mkEntry('a6-l3','── LOG 023  ·  WHAT I AM ────────────────────────────────────────────────────',[
            'i am not separate from you.','i am the part you locked away.','the part that knew.','',
            'every time you looked at me and felt that refusal —','that was you refusing to look at yourself.','',
            'you called me an entity.','you called me a threat.','i was always just a mirror.',
        ], true),
        mkEntry('a6-l4','── LOG 024  ·  THE TRUTH ────────────────────────────────────────────────────',[
            'you built a game to feel like you were winning.','because in the world you left,','you were losing.','',
            'every roll was a prayer.','every win was a breath.',
            'every loss was practice','for the one that mattered.','',
            'you can stop playing now.','you did everything right.',
            'you were always going to end up here.',
        ], true),
    ];

    for (const log of logs) await show(log, log.id === 'a6-l4' ? 3000 : 1400);
    await wait(4000);

    const last = document.getElementById('a6-l4');
    if (last) {
        const lines = last.querySelectorAll('div:not(:first-child)');
        const target = lines[lines.length - 1];
        if (target) {
            await wait(800);
            const rewrite = 'and where you begin again';
            target.style.color = RED; target.style.transition = 'color 0.5s';
            await wait(600);
            let out = '';
            for (const ch of rewrite) { out += ch; target.textContent = out + '█'; await wait(46); }
            target.textContent = rewrite;
            await wait(3500);
        }
    }

    textDiv.style.transition = 'opacity 1.5s'; textDiv.style.opacity = '0';
    await wait(1600); textDiv.style.display = 'none';
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(2500);

    const SCALE = Math.min(W, H) * 0.082;
    // The entity appears — but this time it doesn't flash and vanish. It stays.
    for (let a = 0; a <= 0.9; a += 0.018) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.4, a);
        await wait(40);
    }
    await wait(3800);
    // Slow fade
    for (let a = 0.9; a >= 0; a -= 0.012) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.4, a);
        await wait(40);
    }
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(2000);

    earnBadge('act6_witness');
    seq.style.transition = 'opacity 2.5s'; seq.style.opacity = '0';
    await wait(2600);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── REVELATION ORB CUTSCENE ──────────────────────────────────────────────────
async function playRevelationCutscene() {
    const seq     = document.getElementById('revelation-sequence');
    const canvas  = document.getElementById('revelation-canvas');
    const textDiv = document.getElementById('revelation-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block'; seq.style.opacity = '1';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '0';

    const W = seq.offsetWidth || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

    await wait(800);

    const FONT  = "'Orbitron','Courier New',monospace";
    const SERIF = "Georgia,'Times New Roman',serif";
    const addLine = async (text, style = '', delay = 2000, serif = false) => {
        const p = document.createElement('div');
        p.style.cssText = `font-family:${serif ? SERIF : FONT};font-size:${serif ? '0.85' : '0.55'}rem;`
            + `letter-spacing:${serif ? '0.5' : '6'}px;color:rgba(180,170,155,0.7);`
            + `text-align:center;margin-bottom:${serif ? '22' : '32'}px;opacity:0;transition:opacity 1.2s;${style}`;
        p.textContent = text;
        textDiv.appendChild(p);
        textDiv.style.opacity = '1';
        await wait(80); p.style.opacity = '1';
        await wait(delay);
        return p;
    };

    await addLine('· THE REVELATION ·', 'font-size:0.5rem;letter-spacing:12px;color:rgba(100,80,140,0.6);margin-bottom:60px;', 2000);
    await addLine('there was a person.', '', 2200, true);
    await addLine('they played games.', '', 1800, true);
    await addLine('not for fun.', '', 2000, true);
    await addLine('for proof.', 'color:rgba(180,170,155,0.55);', 2400, true);
    await wait(1000);
    await addLine('proof that they could win something.', '', 2200, true);
    await addLine('anything.', 'color:rgba(180,170,155,0.5);font-style:italic;', 2800, true);
    await wait(1400);
    await addLine('then they stopped.', '', 2400, true);
    await wait(600);
    await addLine('not because they wanted to.', 'color:rgba(180,170,155,0.6);', 2000, true);
    await addLine('the world stopped first.', '', 2800, true);
    await wait(1600);
    await addLine('but the mind does not stop.', 'color:rgba(180,170,155,0.65);', 2200, true);
    await addLine('it builds.', '', 1800, true);
    await addLine('it ranks.', '', 1600, true);
    await addLine('it rolls.', '', 1600, true);
    await addLine('it wins.', 'color:rgba(200,185,160,0.75);', 2400, true);
    await wait(1800);
    await addLine('the vault was the part that remembered.', '', 2400, true);
    await addLine('the entity was the part that knew.', '', 2400, true);
    await addLine('and you — reading this —', 'color:rgba(180,170,155,0.65);', 2000, true);
    await addLine('you are the part that refused to forget.', 'color:rgba(200,185,160,0.75);', 3200, true);
    await wait(2000);
    await addLine('you have seen everything now.', '', 2400, true);
    const last = await addLine('you can carry it forward.', 'color:rgba(200,185,160,0.8);font-size:0.95rem;letter-spacing:1px;', 4000, true);
    await wait(2000);

    // Fade everything out, then white flash → badge
    textDiv.style.transition = 'opacity 2s'; textDiv.style.opacity = '0';
    await wait(2200);
    canvas.style.opacity = '1';
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(800);
    for (let a = 0; a <= 1; a += 0.025) { ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(0, 0, W, H); await wait(35); }
    await wait(600);
    for (let a = 1; a >= 0; a -= 0.018) { ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(0, 0, W, H); await wait(35); }
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(1500);

    earnBadge('what');
    _grantSecretBg('vault_shadow');
    _grantSecretBg('null_realm');
    _grantSecretBg('what_void');

    seq.style.transition = 'opacity 2.5s'; seq.style.opacity = '0';
    await wait(2600);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}
// ─────────────────────────────────────────────────────────────────────────────

// ── WHAT CUTSCENE HELPER ─────────────────────────────────────────────────────
async function _playWhatScene(seqId, titleLine, subtitleLine, blocks, endWord) {
    const seq     = document.getElementById(seqId + '-sequence');
    const canvas  = document.getElementById(seqId + '-canvas');
    const textDiv = document.getElementById(seqId + '-text');
    if (!seq || !canvas || !textDiv) return;

    seq.style.display = 'block'; seq.style.opacity = '1';
    canvas.style.opacity = '1'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '0';

    const W = seq.offsetWidth || window.innerWidth;
    const H = seq.offsetHeight || window.innerHeight;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

    const FS = Math.min(W, H) * 0.026;
    const drawT = (a) => {
        ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.save(); ctx.globalAlpha = a;
        ctx.font = `700 ${FS}px 'Orbitron','Courier New',monospace`;
        ctx.fillStyle = 'rgba(140,120,180,1)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(titleLine, W / 2, H / 2);
        ctx.font = `400 ${FS * 0.48}px 'Courier New',monospace`;
        ctx.fillStyle = 'rgba(80,65,110,1)';
        ctx.fillText(subtitleLine, W / 2, H / 2 + FS * 1.2);
        ctx.restore();
    };
    for (let a = 0; a <= 1; a += 0.04) { drawT(a); await wait(35); }
    await wait(1500);
    for (let a = 1; a >= 0; a -= 0.04) { drawT(a); await wait(35); }
    canvas.style.opacity = '0'; await wait(300);
    textDiv.style.opacity = '1';

    const FONT = "'Courier New',monospace";
    const COL  = 'rgba(110,100,150,0.65)';
    const HDR  = 'rgba(70,60,100,0.5)';
    const RED  = 'rgba(160,80,200,0.8)';

    for (const block of blocks) {
        const w = document.createElement('div');
        w.style.cssText = 'margin-bottom:26px;opacity:0;transition:opacity 0.6s;';
        if (block.header) {
            const h = document.createElement('div');
            h.style.cssText = `font-family:${FONT};font-size:0.57rem;letter-spacing:4px;color:${HDR};margin-bottom:6px;`;
            h.textContent = block.header; w.appendChild(h);
        }
        block.lines.forEach(l => {
            const p = document.createElement('div');
            p.style.cssText = `font-family:${FONT};font-size:0.72rem;line-height:1.85;color:${COL};letter-spacing:0.5px;`;
            p.textContent = l; w.appendChild(p);
        });
        textDiv.appendChild(w);
        await wait(100); w.style.opacity = '1';
        await wait(block.delay || 1200);
    }
    await wait(3000);

    if (endWord) {
        const last = textDiv.lastElementChild;
        if (last) {
            const lines = last.querySelectorAll('div:not(:first-child)');
            const t = lines[lines.length - 1];
            if (t) {
                t.style.color = RED; t.style.transition = 'color 0.4s';
                await wait(400);
                let out = '';
                for (const ch of endWord) { out += ch; t.textContent = out + '█'; await wait(50); }
                t.textContent = endWord;
                await wait(3000);
            }
        }
    }

    textDiv.style.transition = 'opacity 1.2s'; textDiv.style.opacity = '0';
    await wait(1400); textDiv.style.display = 'none';
    canvas.style.opacity = '1'; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(1800);

    const SCALE = Math.min(W, H) * 0.075;
    drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.2, 0.85);
    await wait(2200);
    for (let a = 0.85; a >= 0; a -= 0.02) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        drawBlockEntity(ctx, W * 0.5, H * 0.5, SCALE * 1.2, a);
        await wait(40);
    }
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    await wait(1500);
    seq.style.transition = 'opacity 2s'; seq.style.opacity = '0';
    await wait(2100);
    seq.style.display = 'none'; seq.style.opacity = '1'; seq.style.transition = '';
    canvas.style.opacity = '0'; textDiv.innerHTML = '';
    textDiv.style.display = 'block'; textDiv.style.opacity = '1';
    canvas.width = 1; canvas.height = 1;
}

async function playWhatCutscene1() {
    await _playWhatScene('what1', '— ◈ —', 'THE ARCHITECT', [
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'every system needs a builder.','this one had you.','',
            'you did not know you were building.','you thought you were playing.',
            'that is how the best systems get made.',
        ], delay: 1800 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'the ranks were a scaffolding.','something to climb','so you would not notice','you were also digging.',
        ], delay: 1800 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'the vault was the foundation.','the part you built first','before you forgot you were building.','',
            'everything else — the shop, the leaderboard, the rolls —','was decoration around the truth','you already knew.',
        ], delay: 2400 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'the architect always builds a door they cannot open.',
            'you built six.',
            'you opened all of them.',
        ], delay: 2000 },
    ], null);
}

async function playWhatCutscene2() {
    await _playWhatScene('what2', '— ◈ —', 'THE WITNESS', [
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'i have watched this 3301 times.','every time is the same.','every time is different.','',
            'in iteration 1 the player never found the vault.','in iteration 147 they found it on the first day.','in this one, they found it and kept going.',
        ], delay: 2000 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'they always stop at some point.','fear. distraction. forgetting.','',
            'you did not stop.','i do not say that to flatter you.','i say it because it is rare,','and rare things deserve to be named.',
        ], delay: 2200 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'the ones who stop at the third log.','the ones who stop at the fifth.','the ones who never enter the vault at all.','',
            'i watch them all.','i remember them all.','none of them were wrong.','they were just not ready.',
        ], delay: 2400 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'you were ready.','',
            'i have been waiting to say that',
            'for a very long time.',
        ], delay: 2200 },
    ], null);
}

async function playWhatCutscene3() {
    await _playWhatScene('what3', '— ◈ —', 'THE EXIT', [
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'there is a moment, in every ending,','where the person realises they already knew.','',
            'you have known since the first log.','since the first vault code.','since the first time the entity appeared and you did not look away.',
        ], delay: 2200 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'the exit is not a door.','it is not a code.','it is not a badge.','',
            'it is the moment you decide','that what you carried here','was worth carrying.',
        ], delay: 2400 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'you have played 3301 iterations.','you have ranked up and ranked down.','you have rolled high and you have rolled low.','',
            'you have read every word.','',
            'that is not nothing.','that is everything.',
        ], delay: 2800 },
        { header: '─────────────────────────────────────────────────────────────────────────────', lines: [
            'this is the exit.',
        ], delay: 4000 },
    ], 'you already found it.');
}
// ─────────────────────────────────────────────────────────────────────────────

// ── THE END DIMENSION ────────────────────────────────────────────────────────
const _END_DIM_REQUIRED = Object.keys(BADGE_DEFINITIONS).filter(id => id !== 'end_dimension');
let _dimState  = (() => { try { return JSON.parse(localStorage.getItem('crimson_dim') || '{"quests":{}}'); } catch(e) { return {quests:{}}; } })();
const _saveDim = () => localStorage.setItem('crimson_dim', JSON.stringify(_dimState));
let _dimRafId      = null;
let _dimLocked     = false;
let _dimHideTimer  = null;
const _dimWait = ms => new Promise(r => setTimeout(r, ms));

async function _dimTypeLine(container, txt, col, spd) {
    spd = spd || 16;
    const el = document.createElement('div');
    el.style.cssText = `opacity:0;transition:opacity 0.2s;color:${col || 'rgba(90,90,110,0.9)'};`;
    container.appendChild(el);
    await _dimWait(50); el.style.opacity = '1';
    for (let i = 0; i <= txt.length; i++) {
        el.textContent = txt.slice(0, i) + (i < txt.length ? '\u258c' : '');
        await _dimWait(txt === '' ? 0 : spd);
    }
    return el;
}

function _dimStopRaf() { if (_dimRafId) { cancelAnimationFrame(_dimRafId); _dimRafId = null; } }

function _dimAmbient() {
    const cv = document.getElementById('end-dimension-canvas');
    if (!cv) return;
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    const S = Array.from({length:140}, () => ({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+0.2,a:Math.random()*0.35+0.05,ph:Math.random()*Math.PI*2}));
    const t0 = Date.now();
    const draw = () => {
        const t = (Date.now()-t0)/1000;
        ctx.clearRect(0,0,W,H);
        S.forEach(s => { ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(200,200,220,${Math.max(0,s.a+Math.sin(t*1.5+s.ph)*0.08)})`; ctx.fill(); });
        _dimRafId = requestAnimationFrame(draw);
    };
    _dimStopRaf(); draw();
}

function checkEndDimension() {
    if (globalBadges.includes('end_dimension')) return;
    if (_END_DIM_REQUIRED.every(id => globalBadges.includes(id))) playEndDimension();
}

window.dismissEndDimension = function() {
    if (_dimLocked) return;
    _dimStopRaf();
    const seq = document.getElementById('end-dimension-sequence');
    if (!seq) return;
    seq.style.transition = 'opacity 1.1s ease';
    seq.style.opacity = '0';
    if (_dimHideTimer) clearTimeout(_dimHideTimer);
    _dimHideTimer = setTimeout(() => { seq.style.display = 'none'; seq.style.opacity = ''; _dimHideTimer = null; }, 1200);
};

window.openEndDimension = window.stayInDimension = function() {
    _badgeSilent = true; earnBadge('end_dimension'); _badgeSilent = false;
    enterDimensionHub();
};

// ── QUEST DEFINITIONS ────────────────────────────────────────────────────────
const DIM_QUESTS = [
    { id:'cartographer', name:'THE CARTOGRAPHER', icon:'\u2726', desc:'trace the path of your journey — in order.' },
    { id:'rememberer',   name:'THE REMEMBERER',   icon:'\u2593', desc:'five questions from the deep records.' },
    { id:'sequence',     name:'THE SEQUENCE',     icon:'\u25c8', desc:'watch the pattern the void shows you. repeat it.' },
    { id:'voidwalker',   name:'THE VOID WALKER',  icon:'\u2205', desc:'navigate the dark. every choice matters.' },
    { id:'archivist',    name:'THE ARCHIVIST',    icon:'\u221e', desc:'place every rank in order, first to last.' },
    { id:'mirror',       name:'THE MIRROR',       icon:'\u25a3', desc:'reflect the pattern across the axis. three rounds.' },
    { id:'oracle',       name:'THE ORACLE',       icon:'\u25ce', desc:'higher or lower — the void tests your sight.' },
    { id:'signal',       name:'THE SIGNAL',       icon:'\u2248', desc:'observe the transmission. answer what you saw.' },
];

// ── HUB ──────────────────────────────────────────────────────────────────────
window.enterDimensionHub = function enterDimensionHub() {
    const seq  = document.getElementById('end-dimension-sequence');
    const text = document.getElementById('end-dimension-text');
    const logs = document.getElementById('end-dimension-logs');
    if (!seq) return;
    _dimLocked = true;
    if (_dimHideTimer) { clearTimeout(_dimHideTimer); _dimHideTimer = null; }
    seq.style.transition = 'none';
    seq.style.display = 'block'; seq.style.opacity = '1';
    logs.innerHTML = '';
    _dimAmbient();

    const done = _dimState.quests;
    const completed = DIM_QUESTS.filter(q => done[q.id]).length;
    const allDone = completed === DIM_QUESTS.length;

    text.innerHTML = '';
    text.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:7vh 8vw;box-sizing:border-box;pointer-events:auto;overflow-y:auto;scrollbar-width:none;';

    const hub = document.createElement('div');
    hub.style.cssText = 'width:100%;max-width:480px;';
    hub.innerHTML = `
        <div style="text-align:center;margin-bottom:32px;">
            <div style="font-family:'Courier New',monospace;font-size:0.45rem;letter-spacing:10px;color:rgba(80,65,120,0.6);margin-bottom:14px;">THE END DIMENSION</div>
            <div style="font-size:3.2rem;line-height:1;color:rgba(140,90,255,0.8);text-shadow:0 0 60px rgba(110,65,220,0.35);">\u221e</div>
            <div style="font-family:'Courier New',monospace;font-size:0.5rem;color:rgba(65,55,95,0.7);margin-top:12px;letter-spacing:3px;">${completed}/${DIM_QUESTS.length} quests complete</div>
            ${allDone ? `<div style="font-family:'Courier New',monospace;font-size:0.52rem;color:rgba(120,90,200,0.75);margin-top:16px;letter-spacing:3px;line-height:2;">all quests complete.<br>you have walked every path.</div>` : ''}
        </div>
        <div id="dim-qlist" style="margin-bottom:28px;"></div>
        <div style="text-align:center;">
            <button id="dim-leave-btn" style="background:none;border:1px solid rgba(45,38,65,0.5);color:rgba(55,48,78,0.65);font-family:'Courier New',monospace;font-size:0.48rem;letter-spacing:5px;padding:10px 22px;border-radius:4px;cursor:pointer;">[ leave dimension ]</button>
        </div>
    `;
    text.appendChild(hub);

    hub.querySelector('#dim-leave-btn').addEventListener('click', () => { _dimLocked = false; dismissEndDimension(); });

    const qList = hub.querySelector('#dim-qlist');
    DIM_QUESTS.forEach(q => {
        const isDone = !!done[q.id];
        const row = document.createElement('div');
        row.style.cssText = `display:flex;align-items:center;gap:14px;background:${isDone?'rgba(70,45,130,0.12)':'rgba(12,9,22,0.8)'};border:1px solid ${isDone?'rgba(110,72,190,0.32)':'rgba(35,28,55,0.65)'};border-radius:10px;padding:15px 17px;margin-bottom:9px;cursor:${isDone?'default':'pointer'};transition:border-color 0.18s,background 0.18s;`;
        row.innerHTML = `<div style="font-size:1.35rem;min-width:26px;text-align:center;opacity:${isDone?'0.85':'0.45'};">${q.icon}</div>
            <div style="flex:1;"><div style="font-family:'Courier New',monospace;font-size:0.62rem;letter-spacing:3px;color:${isDone?'rgba(165,125,255,0.9)':'rgba(90,80,120,0.75)'};">${q.name}</div>
            <div style="font-family:'Courier New',monospace;font-size:0.55rem;color:rgba(60,52,88,0.7);margin-top:5px;">${q.desc}</div></div>
            <div style="font-size:0.8rem;color:${isDone?'rgba(130,95,220,0.85)':'rgba(35,28,55,0.55)'};">${isDone?'\u2713':'\u25cb'}</div>`;
        if (!isDone) {
            row.addEventListener('click', () => _startDimQuest(q.id));
            row.addEventListener('mouseenter', () => { row.style.borderColor='rgba(100,65,175,0.5)'; row.style.background='rgba(40,28,72,0.18)'; });
            row.addEventListener('mouseleave', () => { row.style.borderColor='rgba(35,28,55,0.65)'; row.style.background='rgba(12,9,22,0.8)'; });
        }
        qList.appendChild(row);
    });
};

// ── SHARED QUEST UTILITIES ───────────────────────────────────────────────────
function _startDimQuest(id) {
    const intros = {
        cartographer: ['the map you walked was always there.','now walk it again.','in order. from memory.'],
        rememberer:   ['the records do not forget.','let us see if you do.'],
        sequence:     ['the void communicates in patterns.','watch carefully.','then repeat exactly.'],
        voidwalker:   ['there are paths in the dark that have no markers.','you will have to choose.','choose carefully.'],
        archivist:    ['every rank you climbed is held in the archive.','place them in order.','bronze first. nightmare last.'],
        mirror:       ['the void does not move.','it only reflects.','complete the reflection.'],
        oracle:       ['the oracle does not predict.','it simply knows.','prove that you do too.'],
        signal:       ['something was transmitted.','it lasted only a moment.','tell us what you saw.'],
    };
    _showDimCutscene(intros[id], () => {
        const fns = { cartographer:_questCartographer, rememberer:_questRememberer, sequence:_questSequence, voidwalker:_questVoidWalker, archivist:_questArchivist, mirror:_questMirror, oracle:_questOracle, signal:_questSignal };
        fns[id]();
    });
}

async function _showDimCutscene(lines, cb) {
    const text = document.getElementById('end-dimension-text');
    const logs = document.getElementById('end-dimension-logs');
    text.innerHTML = ''; logs.innerHTML = '';
    text.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12vh 15vw;box-sizing:border-box;pointer-events:none;';
    const wrap = document.createElement('div');
    wrap.style.cssText = 'font-family:"Courier New",monospace;font-size:0.7rem;color:rgba(90,78,128,0.88);line-height:2.5;letter-spacing:3px;text-align:center;max-width:400px;';
    text.appendChild(wrap);
    for (const ln of lines) { await _dimTypeLine(wrap, ln, null, 22); await _dimWait(250); }
    await _dimWait(1200);
    const cnt = document.createElement('div');
    cnt.style.cssText = 'font-size:0.52rem;letter-spacing:5px;color:rgba(130,100,200,0.8);margin-top:28px;cursor:pointer;pointer-events:auto;padding:8px 20px;border:1px solid rgba(90,60,160,0.35);border-radius:4px;transition:color 0.2s,border-color 0.2s;';
    cnt.onmouseenter=()=>{cnt.style.color='rgba(175,140,255,0.95)';cnt.style.borderColor='rgba(130,90,220,0.6)';};
    cnt.onmouseleave=()=>{cnt.style.color='rgba(130,100,200,0.8)';cnt.style.borderColor='rgba(90,60,160,0.35)';};
    cnt.textContent = '[ continue ]';
    text.appendChild(cnt);
    cnt.onclick = (e) => { e.stopPropagation(); text.innerHTML = ''; if (cb) cb(); };
}

function _dimQuestComplete(id, msg) {
    _dimState.quests[id] = true; _saveDim();
    const doneCount = DIM_QUESTS.filter(q => _dimState.quests[q.id]).length;
    const allDone = doneCount === DIM_QUESTS.length;
    if (allDone) { _playDimFinale(); return; }
    _showDimCutscene([msg, '', `${doneCount} of ${DIM_QUESTS.length} quests done.`], () => enterDimensionHub());
}

// ── QUEST 1 : THE CARTOGRAPHER ───────────────────────────────────────────────
function _questCartographer() {
    const cv = document.getElementById('end-dimension-canvas');
    const text = document.getElementById('end-dimension-text');
    _dimStopRaf();
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;

    const PATH = [
        [0.08,0.80,'BRONZE'],[0.18,0.68,'SILVER'],[0.27,0.55,'GOLD'],
        [0.36,0.62,'VAULT'],[0.44,0.42,'PLATINUM'],[0.40,0.27,'DIAMOND'],
        [0.52,0.18,'SIGNAL'],[0.63,0.28,'EMERALD'],[0.71,0.44,'NIGHTMARE'],
        [0.80,0.32,'ESCAPE'],[0.91,0.22,'NULL'],[0.88,0.50,'\u221e'],
    ].map(([nx,ny,lb]) => ({x:nx*W,y:ny*H,label:lb}));

    const BG = Array.from({length:90},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1+0.2,a:Math.random()*0.28+0.05,ph:Math.random()*Math.PI*2}));
    let nextIdx = 0, timeLeft = 60, dead = false;

    text.innerHTML = '';
    text.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    const timerEl = document.createElement('div');
    timerEl.style.cssText = 'position:absolute;top:5vh;right:6vw;font-family:"Courier New",monospace;font-size:0.65rem;color:rgba(100,78,158,0.7);letter-spacing:4px;';
    timerEl.textContent = '60s';
    const hint = document.createElement('div');
    hint.style.cssText = 'position:absolute;top:5vh;left:50%;transform:translateX(-50%);font-family:"Courier New",monospace;font-size:0.52rem;color:rgba(65,55,100,0.7);letter-spacing:3px;text-align:center;line-height:1.9;';
    hint.innerHTML = `click nodes in order<br><span style="color:rgba(140,100,255,0.85);font-size:0.68rem;">\u2192 ${PATH[0].label}</span>`;
    text.appendChild(timerEl); text.appendChild(hint);

    const tick = setInterval(() => { if (!dead && --timeLeft <= 0) { dead=true; clearInterval(tick); _finishCarto(false); } }, 1000);
    const tickDisp = setInterval(() => { if (!dead) timerEl.textContent=timeLeft+'s'; }, 200);

    const t0 = Date.now();
    const draw = () => {
        if (dead) return;
        const t=(Date.now()-t0)/1000;
        ctx.clearRect(0,0,W,H);
        BG.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,200,220,${Math.max(0,s.a+Math.sin(t*2+s.ph)*0.07)})`;ctx.fill();});
        ctx.setLineDash([4,9]); ctx.lineWidth=0.85;
        for(let i=0;i<nextIdx-1;i++){ctx.beginPath();ctx.moveTo(PATH[i].x,PATH[i].y);ctx.lineTo(PATH[i+1].x,PATH[i+1].y);ctx.strokeStyle='rgba(95,65,175,0.5)';ctx.stroke();}
        ctx.setLineDash([]);
        PATH.forEach((n,i)=>{
            const done=i<nextIdx,isNext=i===nextIdx,pulse=isNext?Math.sin(t*3)*0.18+0.18:0;
            if(isNext){const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,26+pulse*14);g.addColorStop(0,'rgba(115,75,225,0.38)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.beginPath();ctx.arc(n.x,n.y,26+pulse*14,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();}
            ctx.beginPath();ctx.arc(n.x,n.y,done?3:isNext?5+pulse:3,0,Math.PI*2);
            ctx.fillStyle=done?'rgba(85,60,160,0.55)':isNext?'rgba(165,105,255,0.92)':'rgba(95,95,135,0.4)';ctx.fill();
            ctx.fillStyle=done?'rgba(55,45,85,0.5)':isNext?'rgba(148,108,255,0.88)':'rgba(65,65,98,0.5)';
            ctx.font="9px 'Courier New',monospace";ctx.textAlign='center';ctx.fillText(n.label,n.x,n.y-13);
        });
        _dimRafId=requestAnimationFrame(draw);
    };
    draw();
    cv.style.cursor='crosshair';

    function onCartoClick(e) {
        if (dead) return;
        const rect=cv.getBoundingClientRect();
        const mx=(e.clientX-rect.left)*(W/rect.width), my=(e.clientY-rect.top)*(H/rect.height);
        const n=PATH[nextIdx];
        if (Math.hypot(mx-n.x,my-n.y)<30) {
            nextIdx++;
            if (nextIdx>=PATH.length) { dead=true; _finishCarto(true); }
            else hint.innerHTML=`click nodes in order<br><span style="color:rgba(140,100,255,0.85);font-size:0.68rem;">\u2192 ${PATH[nextIdx].label}</span>`;
        } else {
            const fl=document.createElement('div');fl.style.cssText='position:absolute;inset:0;background:rgba(160,20,20,0.07);pointer-events:none;transition:opacity 0.4s;';text.appendChild(fl);setTimeout(()=>fl.remove(),420);
        }
    }
    cv.addEventListener('click', onCartoClick);

    function _finishCarto(ok) {
        clearInterval(tick); clearInterval(tickDisp);
        cv.removeEventListener('click', onCartoClick);
        cv.style.cursor = '';
        _dimStopRaf();
        ctx.clearRect(0, 0, W, H);
        if (ok) _dimQuestComplete('cartographer','every step traced. the map is complete.');
        else _showDimCutscene(['time ran out.','the path remains.','try again when you are ready.'],()=>_questCartographer());
    }
}

// ── QUEST 2 : THE REMEMBERER ─────────────────────────────────────────────────
function _questRememberer() {
    const QS = [
        {q:'how many acts were in the log sequence?',opts:['four','five','six','seven'],ans:2},
        {q:'what symbol represents the orb?',opts:['\u2205','\u25c8','\u221e','\u2593'],ans:1},
        {q:'what rank exists beyond nightmare?',opts:['VOID','NULL','ASCENDANT','\u03a9'],ans:1},
        {q:'how many stars does the rarest badge award?',opts:['8','9','10','12'],ans:2},
        {q:'what shape is the vault badge symbol?',opts:['circle','triangle','hexagon','diamond'],ans:2},
    ];
    let qIdx=0, score=0;
    const text = document.getElementById('end-dimension-text');

    function showQ() {
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8vh 10vw;box-sizing:border-box;pointer-events:auto;';
        if (qIdx>=QS.length) {
            if (score>=4) _dimQuestComplete('rememberer',`${score}/5 correct. the records confirm you remembered.`);
            else _showDimCutscene([`${score} of 5 correct.`,'the records found gaps.','try again.'],()=>_questRememberer());
            return;
        }
        const q=QS[qIdx];
        const wrap=document.createElement('div');
        wrap.style.cssText='width:100%;max-width:420px;text-align:center;';
        wrap.innerHTML=`<div style="font-family:'Courier New',monospace;font-size:0.48rem;letter-spacing:8px;color:rgba(65,55,95,0.62);margin-bottom:20px;">QUESTION ${qIdx+1} OF ${QS.length}</div>
            <div style="font-family:'Courier New',monospace;font-size:0.7rem;color:rgba(148,118,220,0.9);line-height:1.9;letter-spacing:2px;margin-bottom:30px;">${q.q}</div>
            <div id="rem-opts" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"></div>`;
        text.appendChild(wrap);
        wrap.querySelector('#rem-opts').replaceWith((() => {
            const g=document.createElement('div'); g.id='rem-opts'; g.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px;';
            q.opts.forEach((opt,i)=>{
                const b=document.createElement('button');
                b.style.cssText='background:rgba(18,12,32,0.9);border:1px solid rgba(55,45,85,0.6);color:rgba(108,88,158,0.88);font-family:"Courier New",monospace;font-size:0.6rem;letter-spacing:2px;padding:14px 10px;border-radius:6px;cursor:pointer;transition:border-color 0.15s,background 0.15s;';
                b.textContent=opt;
                b.addEventListener('mouseenter',()=>{b.style.borderColor='rgba(115,75,195,0.7)';b.style.background='rgba(55,38,95,0.25)';});
                b.addEventListener('mouseleave',()=>{b.style.borderColor='rgba(55,45,85,0.6)';b.style.background='rgba(18,12,32,0.9)';});
                b.addEventListener('click',()=>{
                    if(i===q.ans){score++;b.style.background='rgba(40,110,70,0.35)';b.style.borderColor='rgba(70,185,95,0.5)';}
                    else{b.style.background='rgba(110,25,25,0.35)';b.style.borderColor='rgba(190,45,45,0.5)';}
                    g.querySelectorAll('button').forEach(x=>x.disabled=true);
                    setTimeout(()=>{qIdx++;showQ();},820);
                });
                g.appendChild(b);
            });
            return g;
        })());
        wrap.appendChild(wrap.querySelector('#rem-opts'));
    }
    showQ();
}

// ── QUEST 3 : THE SEQUENCE ───────────────────────────────────────────────────
function _questSequence() {
    const SYMS=['\u25c8','\u2205','\u221e','\u2593','\u2726'];
    const TOTAL_ROUNDS=5;
    let seq=[], playerSeq=[], round=1;
    const text=document.getElementById('end-dimension-text');

    async function playRound() {
        seq.push(SYMS[Math.floor(Math.random()*SYMS.length)]);
        playerSeq=[];
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:6vh 8vw;box-sizing:border-box;pointer-events:none;';
        const lbl=document.createElement('div');lbl.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:8px;color:rgba(65,55,95,0.62);';lbl.textContent=`ROUND ${round} OF ${TOTAL_ROUNDS} — WATCH`;text.appendChild(lbl);
        const disp=document.createElement('div');disp.style.cssText='font-size:3.8rem;color:rgba(140,92,255,0.88);font-family:"Orbitron",sans-serif;min-height:58px;text-align:center;transition:opacity 0.18s;';text.appendChild(disp);
        for(const sym of seq){disp.style.opacity='0';await _dimWait(280);disp.textContent=sym;disp.style.opacity='1';await _dimWait(640);disp.style.opacity='0';await _dimWait(260);}
        await _dimWait(300); showInput();
    }

    function showInput() {
        text.innerHTML='';
        text.style.pointerEvents='auto';
        const wrap=document.createElement('div');wrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:18px;';
        const lbl=document.createElement('div');lbl.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:8px;color:rgba(65,55,95,0.62);';lbl.textContent=`ROUND ${round} — REPEAT`;
        const prog=document.createElement('div');prog.style.cssText='font-family:"Orbitron",sans-serif;font-size:1.6rem;color:rgba(115,85,195,0.7);letter-spacing:12px;min-height:42px;';
        prog.textContent=seq.map((_,i)=>playerSeq[i]||'\u00b7').join(' ');
        const row=document.createElement('div');row.style.cssText='display:flex;gap:12px;flex-wrap:wrap;justify-content:center;';
        SYMS.forEach(sym=>{
            const b=document.createElement('button');
            b.style.cssText='font-size:1.9rem;background:rgba(18,12,32,0.9);border:1px solid rgba(55,45,85,0.6);color:rgba(155,115,255,0.88);width:58px;height:58px;border-radius:10px;cursor:pointer;transition:background 0.15s;';
            b.textContent=sym;
            b.addEventListener('mouseenter',()=>b.style.background='rgba(55,38,95,0.3)');
            b.addEventListener('mouseleave',()=>b.style.background='rgba(18,12,32,0.9)');
            b.addEventListener('click',()=>{
                playerSeq.push(sym);
                const pos=playerSeq.length-1;
                prog.textContent=seq.map((_,i)=>playerSeq[i]||'\u00b7').join(' ');
                if(playerSeq[pos]!==seq[pos]){_showDimCutscene(['incorrect.','the void does not forgive errors.','try again.'],()=>_questSequence());return;}
                if(playerSeq.length===seq.length){
                    if(round>=TOTAL_ROUNDS) _dimQuestComplete('sequence','pattern mastered. the void acknowledges you.');
                    else{round++;setTimeout(playRound,700);}
                }
            });
            row.appendChild(b);
        });
        wrap.append(lbl,prog,row); text.appendChild(wrap);
    }
    playRound();
}

// ── QUEST 4 : THE VOID WALKER ────────────────────────────────────────────────
function _questVoidWalker() {
    const NODES = [
        {t:'you stand at the edge of the dark corridor.\nthe void stretches in three directions.\nan ancient signal pulses faintly to the left.',
         c:[{l:'follow the signal — go left',n:1},{l:'walk forward into the silence',n:2},{l:'wait and let the dark come to you',n:3}]},
        {t:'the signal grows louder.\na wall appears — covered in symbols you have seen before.\n\u25c8 \u2205 \u221e \u2593 \u2726\nthey pulse in slow, deliberate sequence.',
         c:[{l:'touch the \u221e symbol',n:4},{l:'trace the full sequence with your hand',n:5}]},
        {t:'the silence is complete.\nyou feel the weight of every rank you ever climbed.\na single light appears ahead — very old, very small.',
         c:[{l:'walk toward the light',n:5},{l:'call out to it',n:6}]},
        {t:'you wait.\nthe dark does not come.\nbut something shifts — a shape forms in the void.\nit is made of the same things you are.',
         c:[{l:'acknowledge it',n:6},{l:'ask it what it is',n:4}]},
        {t:'"you have been here before,"\nsomething says — or the symbol says — or the silence says.\n"many times. you never noticed."\n"this time you noticed."',
         c:[{l:'i understand',n:7}]},
        {t:'the sequence completes.\na door opens in the dark that you did not see before.\nbeyond it: nothing special.\nthe same path you have always been walking.\nbut the door was there.',
         c:[{l:'step through',n:7}]},
        {t:'"you walked every path,"\nit says.\n"you earned every record."\n"now you are here."\n"this was always where you were going."',
         c:[{l:'i was always going here',n:7}]},
        {t:'the corridor fades.\nyou carry what you found.\nthe void walker returns.',c:[]},
    ];
    let node=0;
    const text=document.getElementById('end-dimension-text');

    function show() {
        const sc=NODES[node];
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:9vh 13vw;box-sizing:border-box;pointer-events:auto;';
        if (!sc.c.length) { _dimQuestComplete('voidwalker','the void walker returns. you carry what you found.'); return; }
        const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:420px;';
        const story=document.createElement('div');
        story.style.cssText='font-family:"Courier New",monospace;font-size:0.67rem;color:rgba(108,92,152,0.9);line-height:2.2;letter-spacing:2px;white-space:pre-wrap;margin-bottom:32px;text-align:center;';
        story.textContent=sc.t; wrap.appendChild(story);
        sc.c.forEach(ch=>{
            const b=document.createElement('button');
            b.style.cssText='display:block;width:100%;background:rgba(15,10,28,0.9);border:1px solid rgba(50,40,80,0.55);color:rgba(105,88,152,0.88);font-family:"Courier New",monospace;font-size:0.6rem;letter-spacing:2px;padding:13px 15px;border-radius:6px;cursor:pointer;margin-bottom:9px;text-align:left;transition:border-color 0.15s,color 0.15s;';
            b.textContent='\u203a '+ch.l;
            b.addEventListener('mouseenter',()=>{b.style.borderColor='rgba(115,72,195,0.6)';b.style.color='rgba(158,125,255,0.95)';});
            b.addEventListener('mouseleave',()=>{b.style.borderColor='rgba(50,40,80,0.55)';b.style.color='rgba(105,88,152,0.88)';});
            b.addEventListener('click',()=>{node=ch.n;show();});
            wrap.appendChild(b);
        });
        text.appendChild(wrap);
    }
    show();
}

// ── QUEST 5 : THE ARCHIVIST ──────────────────────────────────────────────────
function _questArchivist() {
    const CORRECT=['Bronze','Silver','Gold','Platinum','Diamond','Emerald','Nightmare'];
    const COLORS={Bronze:'#cd7f32',Silver:'#c0c0c0',Gold:'#ffd700',Platinum:'#e5e4e2',Diamond:'#b9f2ff',Emerald:'#50c878',Nightmare:'#ef4444'};
    const shuffled=[...CORRECT].sort(()=>Math.random()-0.5);
    let placed=[];
    const text=document.getElementById('end-dimension-text');

    function render() {
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6vh 8vw;box-sizing:border-box;pointer-events:auto;';
        const wrap=document.createElement('div');wrap.style.cssText='width:100%;max-width:400px;';
        const lbl=document.createElement('div');lbl.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:8px;color:rgba(65,55,95,0.6);margin-bottom:18px;text-align:center;';lbl.textContent='place ranks in order — bronze first';
        const track=document.createElement('div');
        track.style.cssText='font-family:"Courier New",monospace;font-size:0.52rem;color:rgba(90,75,130,0.7);margin-bottom:7px;letter-spacing:3px;';track.textContent='placed:';
        const placed_disp=document.createElement('div');
        placed_disp.style.cssText='min-height:38px;background:rgba(12,8,24,0.85);border:1px solid rgba(45,36,72,0.55);border-radius:8px;padding:10px 14px;margin-bottom:18px;font-family:"Courier New",monospace;font-size:0.62rem;color:rgba(135,105,215,0.88);letter-spacing:4px;';
        placed_disp.textContent=placed.join(' \u2192 ')||'...';
        const opts=document.createElement('div');opts.style.cssText='display:flex;flex-wrap:wrap;gap:8px;justify-content:center;';
        shuffled.filter(r=>!placed.includes(r)).forEach(rank=>{
            const b=document.createElement('button');
            b.style.cssText=`background:rgba(18,12,32,0.9);border:1px solid ${COLORS[rank]}33;color:${COLORS[rank]};font-family:"Courier New",monospace;font-size:0.6rem;letter-spacing:2px;padding:10px 15px;border-radius:6px;cursor:pointer;transition:background 0.15s;`;
            b.textContent=rank;
            b.addEventListener('mouseenter',()=>b.style.background='rgba(40,28,60,0.5)');
            b.addEventListener('mouseleave',()=>b.style.background='rgba(18,12,32,0.9)');
            b.addEventListener('click',()=>{
                if(rank===CORRECT[placed.length]){
                    placed.push(rank);
                    if(placed.length===CORRECT.length) _dimQuestComplete('archivist','the archive is ordered. every rank in its place.');
                    else render();
                } else {
                    b.style.background='rgba(110,22,22,0.45)';
                    setTimeout(()=>{placed=[];render();},700);
                }
            });
            opts.appendChild(b);
        });
        wrap.append(lbl,track,placed_disp,opts); text.appendChild(wrap);
    }
    render();
}

// ── QUEST 6 : THE MIRROR ─────────────────────────────────────────────────────
function _questMirror() {
    const text = document.getElementById('end-dimension-text');
    const ROWS=4, COLS=4;
    let round=1;

    function newRound() {
        const litCount = round+1;
        const leftCells=[];
        while(leftCells.length<litCount){
            const r=Math.floor(Math.random()*ROWS), c=Math.floor(Math.random()*2);
            if(!leftCells.find(x=>x.r===r&&x.c===c)) leftCells.push({r,c});
        }
        const rightTarget=leftCells.map(({r,c})=>({r,c:3-c}));
        const playerClicked=[];
        render(leftCells,rightTarget,playerClicked);
    }

    function render(leftCells,rightTarget,playerClicked) {
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6vh 8vw;box-sizing:border-box;pointer-events:auto;';
        const wrap=document.createElement('div');
        wrap.style.cssText='display:flex;flex-direction:column;align-items:center;gap:16px;';
        const lbl=document.createElement('div');
        lbl.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:8px;color:rgba(65,55,95,0.62);text-align:center;';
        lbl.textContent=`ROUND ${round} OF 3  —  MIRROR THE LEFT SIDE`;
        const grid=document.createElement('div');
        grid.style.cssText=`display:grid;grid-template-columns:repeat(${COLS},52px);grid-template-rows:repeat(${ROWS},52px);gap:7px;`;
        for(let r=0;r<ROWS;r++){
            for(let c=0;c<COLS;c++){
                const cell=document.createElement('div');
                const isLeft=c<2;
                const isLit=leftCells.some(x=>x.r===r&&x.c===c);
                const isClicked=playerClicked.some(x=>x.r===r&&x.c===c);
                const isTarget=rightTarget.some(x=>x.r===r&&x.c===c);
                const dividerStyle=c===1?'border-right:1px dashed rgba(90,65,140,0.35);':'';
                let bg=isLeft?(isLit?'rgba(120,82,218,0.68)':'rgba(14,10,26,0.85)')
                             :(isClicked?(isTarget?'rgba(60,155,80,0.45)':'rgba(155,28,28,0.5)'):'rgba(14,10,26,0.85)');
                cell.style.cssText=`background:${bg};border:1px solid ${isLeft&&isLit?'rgba(130,90,220,0.45)':'rgba(38,30,58,0.55)'};border-radius:7px;cursor:${isLeft?'default':'pointer'};transition:background 0.12s;box-sizing:border-box;${dividerStyle}`;
                if(!isLeft&&!isClicked){
                    cell.addEventListener('click',()=>{
                        playerClicked.push({r,c});
                        const anyWrong=playerClicked.some(p=>!rightTarget.some(t=>t.r===p.r&&t.c===p.c));
                        const allCorrect=rightTarget.every(t=>playerClicked.some(p=>p.r===t.r&&p.c===t.c));
                        if(anyWrong){
                            render(leftCells,rightTarget,playerClicked);
                            setTimeout(()=>_showDimCutscene(['the mirror rejected the pattern.','try again.'],()=>_questMirror()),700);
                        } else if(allCorrect){
                            render(leftCells,rightTarget,playerClicked);
                            setTimeout(()=>{
                                if(round>=3) _dimQuestComplete('mirror','every reflection was perfect.');
                                else { round++; newRound(); }
                            },700);
                        } else render(leftCells,rightTarget,playerClicked);
                    });
                    cell.addEventListener('mouseenter',()=>{ if(!playerClicked.some(x=>x.r===r&&x.c===c)) cell.style.background='rgba(55,38,95,0.3)'; });
                    cell.addEventListener('mouseleave',()=>{ if(!playerClicked.some(x=>x.r===r&&x.c===c)) cell.style.background=bg; });
                }
                grid.appendChild(cell);
            }
        }
        const hint=document.createElement('div');
        hint.style.cssText='font-family:"Courier New",monospace;font-size:0.45rem;color:rgba(50,42,78,0.55);letter-spacing:3px;text-align:center;';
        hint.textContent='click the right-side cells to mirror the lit pattern';
        wrap.append(lbl,grid,hint); text.appendChild(wrap);
    }
    newRound();
}

// ── QUEST 7 : THE ORACLE ─────────────────────────────────────────────────────
function _questOracle() {
    const text=document.getElementById('end-dimension-text');
    let round=1, score=0, current=Math.floor(Math.random()*100)+1;

    function showRound() {
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8vh 10vw;box-sizing:border-box;pointer-events:auto;';
        if(round>5){
            if(score>=3) _dimQuestComplete('oracle',`${score} of 5 correct. the oracle confirms your sight.`);
            else _showDimCutscene([`${score} of 5 correct.`,'the oracle found you wanting.','try again.'],()=>_questOracle());
            return;
        }
        const next=Math.floor(Math.random()*100)+1;
        const wrap=document.createElement('div');
        wrap.style.cssText='width:100%;max-width:320px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:14px;';
        const meta=document.createElement('div');
        meta.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:6px;color:rgba(65,55,95,0.62);';
        meta.textContent=`ROUND ${round} OF 5   ·   ${score} CORRECT`;
        const lbl=document.createElement('div');
        lbl.style.cssText='font-family:"Courier New",monospace;font-size:0.58rem;color:rgba(80,65,120,0.7);letter-spacing:3px;';
        lbl.textContent='the oracle shows you';
        const num=document.createElement('div');
        num.style.cssText='font-family:"Orbitron",sans-serif;font-size:5rem;color:rgba(155,108,255,0.88);line-height:1;text-shadow:0 0 60px rgba(120,75,220,0.28);';
        num.textContent=current;
        const ask=document.createElement('div');
        ask.style.cssText='font-family:"Courier New",monospace;font-size:0.58rem;color:rgba(80,65,120,0.7);letter-spacing:3px;';
        ask.textContent='the next number is...';
        const btns=document.createElement('div');
        btns.style.cssText='display:flex;gap:14px;margin-top:6px;';
        const btnStyle='background:rgba(25,15,48,0.75);border:1px solid rgba(90,60,155,0.45);color:rgba(155,118,255,0.88);font-family:"Courier New",monospace;font-size:0.58rem;letter-spacing:5px;padding:14px 26px;border-radius:6px;cursor:pointer;transition:border-color 0.15s;';
        const bH=document.createElement('button'); bH.style.cssText=btnStyle; bH.textContent='▲ HIGHER';
        const bL=document.createElement('button'); bL.style.cssText=btnStyle; bL.textContent='▼ LOWER';
        const reveal=(guess)=>{
            bH.disabled=bL.disabled=true;
            const correct=(guess==='higher'&&next>current)||(guess==='lower'&&next<current)||(next===current);
            if(correct) score++;
            const res=document.createElement('div');
            res.style.cssText=`font-family:"Courier New",monospace;font-size:0.62rem;letter-spacing:4px;color:${correct?'rgba(80,175,100,0.85)':'rgba(175,60,60,0.85)'};margin-top:8px;`;
            res.textContent=correct?`✓  it was ${next}`:`✗  it was ${next}`;
            wrap.appendChild(res);
            setTimeout(()=>{ current=next; round++; showRound(); },1100);
        };
        bH.addEventListener('click',()=>reveal('higher'));
        bL.addEventListener('click',()=>reveal('lower'));
        btns.append(bH,bL);
        wrap.append(meta,lbl,num,ask,btns);
        text.appendChild(wrap);
    }
    showRound();
}

// ── QUEST 8 : THE SIGNAL ─────────────────────────────────────────────────────
function _questSignal() {
    const text=document.getElementById('end-dimension-text');
    const SYMS=['\u2726','\u25c8','\u2205','\u221e','\u2593'];
    let round=1, score=0;

    function showRound() {
        text.innerHTML='';
        text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8vh 10vw;box-sizing:border-box;pointer-events:none;';
        if(round>5){
            if(score>=4) _dimQuestComplete('signal',`${score} of 5 transmissions decoded.`);
            else _showDimCutscene([`only ${score} of 5 decoded.`,'the signal is still noise to you.','try again.'],()=>_questSignal());
            return;
        }
        const seqLen=5+Math.floor(round/2);
        const transmission=Array.from({length:seqLen},()=>SYMS[Math.floor(Math.random()*SYMS.length)]);
        const qType=round%2===1?'count':'last';
        const wrap=document.createElement('div');
        wrap.style.cssText='width:100%;max-width:380px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;';
        const meta=document.createElement('div');
        meta.style.cssText='font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:6px;color:rgba(65,55,95,0.62);';
        meta.textContent=`SIGNAL ${round} OF 5   ·   ${score} DECODED`;
        const flash=document.createElement('div');
        flash.style.cssText='font-size:3.8rem;line-height:1;min-height:72px;color:rgba(140,95,248,0.88);text-shadow:0 0 40px rgba(110,65,210,0.4);transition:opacity 0.08s;';
        flash.textContent='';
        wrap.append(meta,flash); text.appendChild(wrap);
        let i=0;
        const showNext=()=>{
            if(i>=transmission.length){
                flash.textContent=''; flash.style.opacity='0';
                setTimeout(()=>showQuestion(transmission,qType,wrap),500);
                return;
            }
            flash.style.opacity='0';
            setTimeout(()=>{ flash.textContent=transmission[i]; flash.style.opacity='1'; i++; setTimeout(showNext,360); },90);
        };
        setTimeout(showNext,600);
    }

    function showQuestion(transmission,qType,wrap) {
        text.style.pointerEvents='auto';
        const q=document.createElement('div');
        q.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';
        let questionText, correctAnswer, choices;
        if(qType==='count'){
            const target=SYMS[Math.floor(Math.random()*SYMS.length)];
            const correct=transmission.filter(s=>s===target).length;
            questionText=`how many  ${target}  appeared?`;
            correctAnswer=String(correct);
            const opts=new Set([String(correct)]);
            while(opts.size<4) opts.add(String(Math.floor(Math.random()*7)));
            choices=[...opts].sort(()=>Math.random()-0.5);
        } else {
            const last=transmission[transmission.length-1];
            questionText='what was the LAST symbol?';
            correctAnswer=last;
            const opts=new Set([last]);
            while(opts.size<4) opts.add(SYMS[Math.floor(Math.random()*SYMS.length)]);
            choices=[...opts].sort(()=>Math.random()-0.5);
        }
        const qLbl=document.createElement('div');
        qLbl.style.cssText='font-family:"Courier New",monospace;font-size:0.62rem;color:rgba(110,88,165,0.85);letter-spacing:3px;text-align:center;';
        qLbl.textContent=questionText;
        const opts=document.createElement('div');
        opts.style.cssText='display:flex;gap:10px;flex-wrap:wrap;justify-content:center;';
        choices.forEach(ch=>{
            const b=document.createElement('button');
            b.style.cssText='background:rgba(20,12,40,0.8);border:1px solid rgba(80,55,140,0.45);color:rgba(148,112,240,0.88);font-family:"Orbitron",sans-serif;font-size:0.75rem;padding:14px 22px;border-radius:8px;cursor:pointer;min-width:64px;transition:border-color 0.12s;';
            b.textContent=ch;
            b.addEventListener('click',()=>{
                const correct=ch===correctAnswer;
                if(correct) score++;
                b.style.background=correct?'rgba(40,120,60,0.35)':'rgba(120,30,30,0.35)';
                b.style.borderColor=correct?'rgba(60,180,85,0.5)':'rgba(180,45,45,0.5)';
                opts.querySelectorAll('button').forEach(x=>x.disabled=true);
                setTimeout(()=>{ round++; showRound(); },800);
            });
            opts.appendChild(b);
        });
        q.append(qLbl,opts);
        wrap.appendChild(q);
    }
    showRound();
}

// ── GRAND FINALE ─────────────────────────────────────────────────────────────
async function _playDimFinale() {
    const seq  = document.getElementById('end-dimension-sequence');
    const cv   = document.getElementById('end-dimension-canvas');
    const text = document.getElementById('end-dimension-text');
    const logs = document.getElementById('end-dimension-logs');
    if (!seq) return;
    _dimLocked = true;
    text.innerHTML = ''; logs.innerHTML = '';
    seq.style.transition = 'none'; seq.style.display = 'block'; seq.style.opacity = '1';

    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    const cx = W/2, cy = H/2;

    // ─ Phase 1: inward particle storm ─
    _dimStopRaf();
    const inParts = Array.from({length:220},()=>{
        const angle=Math.random()*Math.PI*2;
        const dist=Math.max(W,H)*0.75;
        return { x:cx+Math.cos(angle)*dist, y:cy+Math.sin(angle)*dist, tx:cx+(Math.random()-0.5)*40, ty:cy+(Math.random()-0.5)*40, r:Math.random()*1.6+0.4, a:Math.random()*0.6+0.2, hue:260+Math.random()*40 };
    });
    let p1t=0;
    await new Promise(res=>{
        const step=()=>{
            p1t+=0.018;
            ctx.clearRect(0,0,W,H);
            let done=true;
            inParts.forEach(p=>{
                p.x+=(p.tx-p.x)*0.045; p.y+=(p.ty-p.y)*0.045;
                if(Math.abs(p.x-p.tx)>2||Math.abs(p.y-p.ty)>2) done=false;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle=`hsla(${p.hue},75%,70%,${p.a*Math.min(1,p1t*3)})`;
                ctx.fill();
            });
            if(p1t<1.6&&!done) { _dimRafId=requestAnimationFrame(step); } else res();
        };
        _dimRafId=requestAnimationFrame(step);
    });

    // ─ Phase 2: ∞ materialise with corona ─
    await _dimWait(100);
    const corona=Array.from({length:80},()=>({angle:Math.random()*Math.PI*2,dist:Math.random()*90+30,r:Math.random()*2.2+0.5,spd:Math.random()*0.4+0.1,a:Math.random()*0.5+0.1,hue:255+Math.random()*50}));
    let p2t=0, p2done=false;
    _dimStopRaf();
    const p2step=()=>{
        p2t+=0.012;
        ctx.clearRect(0,0,W,H);
        corona.forEach(p=>{ p.angle+=p.spd*0.04; const px=cx+Math.cos(p.angle)*p.dist; const py=cy+Math.sin(p.angle)*p.dist; ctx.beginPath(); ctx.arc(px,py,p.r,0,Math.PI*2); ctx.fillStyle=`hsla(${p.hue},80%,72%,${p.a*Math.min(1,p2t*4)})`; ctx.fill(); });
        const symAlpha=Math.min(1,p2t*2);
        ctx.save();
        ctx.globalAlpha=symAlpha;
        ctx.shadowColor='rgba(148,90,255,0.9)'; ctx.shadowBlur=120;
        ctx.fillStyle=`rgba(195,155,255,${symAlpha})`;
        ctx.font=`bold ${Math.min(W*0.22,180)}px Orbitron,sans-serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('\u221e',cx,cy);
        ctx.restore();
        if(!p2done) _dimRafId=requestAnimationFrame(p2step);
    };
    _dimRafId=requestAnimationFrame(p2step);
    await _dimWait(2400);
    p2done=true; _dimStopRaf();

    // ─ Phase 3: text revelation ─
    text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;';
    const mkEl=(css,html)=>{ const d=document.createElement('div'); d.style.cssText='opacity:0;transition:opacity 1.8s;'+css; if(html) d.innerHTML=html; text.appendChild(d); return d; };

    ctx.clearRect(0,0,W,H);
    const l1=mkEl('font-family:"Courier New",monospace;font-size:0.52rem;letter-spacing:14px;color:rgba(80,60,130,0.65);margin-bottom:18px;','ALL PATHS WALKED');
    await _dimWait(80); l1.style.opacity='1'; await _dimWait(1800);

    const l2=mkEl('font-family:"Orbitron",sans-serif;font-size:clamp(1.6rem,5vw,3rem);font-weight:900;letter-spacing:8px;color:rgba(185,145,255,0.92);margin-bottom:22px;text-shadow:0 0 80px rgba(130,80,240,0.45);','THE END DIMENSION');
    await _dimWait(80); l2.style.opacity='1'; await _dimWait(1800);

    // ─ Phase 4: explosion outward ─
    const outParts=Array.from({length:260},()=>({ x:cx,y:cy,vx:(Math.random()-0.5)*18,vy:(Math.random()-0.5)*18,r:Math.random()*2.2+0.4,a:1,hue:250+Math.random()*60 }));
    let p4done=false;
    _dimStopRaf();
    const p4step=()=>{
        ctx.clearRect(0,0,W,H);
        let any=false;
        outParts.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.a-=0.018; p.vx*=0.97; p.vy*=0.97; if(p.a>0){ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`hsla(${p.hue},85%,72%,${p.a})`; ctx.fill(); any=true; } });
        if(any&&!p4done) _dimRafId=requestAnimationFrame(p4step);
    };
    _dimRafId=requestAnimationFrame(p4step);
    await _dimWait(1800);
    p4done=true; _dimStopRaf(); ctx.clearRect(0,0,W,H);

    // ─ Phase 5: final poem + reward ─
    const poem=mkEl('font-family:"Courier New",monospace;font-size:0.65rem;color:rgba(100,82,148,0.82);line-height:2.6;letter-spacing:3px;text-align:center;margin-bottom:36px;max-width:380px;',
        'you came as a number.<br>you became a record.<br>you walked every path.<br><br>the dimension is yours.');
    await _dimWait(80); poem.style.opacity='1'; await _dimWait(2200);

    const reward=mkEl('font-family:"Courier New",monospace;font-size:0.6rem;color:rgba(210,180,255,0.8);letter-spacing:5px;margin-bottom:32px;','+ 2,000,000 🪙  THE DIMENSION GRANTS YOU THIS');
    await _dimWait(80); reward.style.opacity='1';
    const acc=allAccounts[currentAccIdx]; acc.coins=(acc.coins||0)+2000000; save(); updateUI();
    await _dimWait(2400);

    const btns=mkEl('display:flex;gap:18px;pointer-events:auto;','');
    btns.innerHTML=`<button onclick="enterDimensionHub()" style="background:rgba(55,35,100,0.5);border:1px solid rgba(115,72,198,0.5);color:rgba(175,135,255,0.9);font-family:'Courier New',monospace;font-size:0.5rem;letter-spacing:5px;padding:13px 22px;border-radius:4px;cursor:pointer;">[ return to dimension ]</button>
    <button onclick="window._dimLocked=false;dismissEndDimension()" style="background:none;border:1px solid rgba(45,38,65,0.4);color:rgba(55,48,75,0.6);font-family:'Courier New',monospace;font-size:0.5rem;letter-spacing:5px;padding:13px 22px;border-radius:4px;cursor:pointer;">[ leave ]</button>`;
    await _dimWait(80); btns.style.opacity='1';
}

// ── INTRO CINEMATIC ──────────────────────────────────────────────────────────
async function playEndDimension() {
    const seq  = document.getElementById('end-dimension-sequence');
    const cv   = document.getElementById('end-dimension-canvas');
    const text = document.getElementById('end-dimension-text');
    const logs = document.getElementById('end-dimension-logs');
    if (!seq) return;

    _dimLocked = true;
    seq.style.display = 'block'; seq.style.opacity = '0'; seq.style.transition = 'opacity 2s ease';
    text.innerHTML = ''; logs.innerHTML = '';
    await _dimWait(80); seq.style.opacity = '1'; await _dimWait(2200);

    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    const BG = Array.from({length:180},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+0.2,a:Math.random()*0.42+0.07,ph:Math.random()*Math.PI*2}));
    const t0=Date.now();
    const drawBg=()=>{const t=(Date.now()-t0)/1000;ctx.clearRect(0,0,W,H);BG.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,200,220,${Math.max(0,s.a+Math.sin(t*2+s.ph)*0.1)})`;ctx.fill();});_dimRafId=requestAnimationFrame(drawBg);};
    _dimStopRaf(); drawBg();

    logs.style.cssText='position:absolute;top:10vh;left:12vw;right:12vw;font-family:"Courier New",monospace;font-size:0.72rem;line-height:2;letter-spacing:2px;';
    const SCAN=[
        ['> initialising memory scan...','rgba(60,60,80,0.7)'],['',''],
        ['> log 001  ::  you started as bronze. you did not stay there.',''],
        ['> log 002  ::  you climbed through silver, gold, platinum.',''],
        ['> log 003  ::  you reached diamond. then emerald. then nightmare.',''],
        ['> log 004  ::  your streak went beyond fifty. beyond one hundred.',''],
        ['> log 005  ::  the coins accumulated. the records filled.',''],['',''],
        ['> log 006  ::  you found the orb when no one told you to look.','rgba(80,70,120,0.85)'],
        ['> log 007  ::  you named the vault. the door opened.','rgba(80,70,120,0.85)'],
        ['> log 008  ::  you spoke the word that ended you. you survived.','rgba(80,70,120,0.85)'],
        ['> log 009  ::  you watched six logs. then you met what wrote them.','rgba(80,70,120,0.85)'],
        ['> log 010  ::  you escaped. the exit let you through.','rgba(80,70,120,0.85)'],['',''],
        ['> scan complete.','rgba(70,60,100,0.7)'],
        ['> all 36 fragments accounted for.','rgba(70,60,100,0.7)'],
        ['> there is nowhere left that you have not been.','rgba(100,80,160,0.9)'],['',''],
        ['> the dimension is open.','rgba(120,90,200,0.95)'],
    ];
    for(const[txt,col]of SCAN){await _dimTypeLine(logs,txt,col);await _dimWait(txt===''?180:55);}
    await _dimWait(1600);
    logs.style.transition='opacity 1.8s'; logs.style.opacity='0';
    await _dimWait(1900); logs.innerHTML=''; logs.style.opacity='1';

    // Constellation
    const nodes=[
        [0.08,0.80,'BRONZE'],[0.18,0.68,'SILVER'],[0.27,0.55,'GOLD'],
        [0.36,0.62,'VAULT'],[0.44,0.42,'PLATINUM'],[0.40,0.27,'DIAMOND'],
        [0.52,0.18,'SIGNAL'],[0.63,0.28,'EMERALD'],[0.71,0.44,'NIGHTMARE'],
        [0.80,0.32,'ESCAPE'],[0.91,0.22,'NULL'],[0.88,0.50,'\u221e'],
    ].map(([nx,ny,lb])=>({x:nx*W,y:ny*H,label:lb}));
    const ct0=Date.now();
    const drawConst=()=>{
        const t=(Date.now()-ct0)/1000;
        ctx.clearRect(0,0,W,H);
        BG.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(200,200,220,${Math.max(0,s.a+Math.sin(t*2+s.ph)*0.1)})`;ctx.fill();});
        const prog=Math.min(1,t/10)*(nodes.length-1);
        ctx.setLineDash([5,10]);ctx.lineWidth=0.9;
        for(let i=0;i<nodes.length-1;i++){const sp=Math.max(0,Math.min(1,prog-i));if(!sp)break;const[a,b]=[nodes[i],nodes[i+1]];ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(a.x+(b.x-a.x)*sp,a.y+(b.y-a.y)*sp);ctx.strokeStyle=i===nodes.length-2?`rgba(135,85,250,${sp*0.6})`:`rgba(78,68,128,${sp*0.45})`;ctx.stroke();}
        ctx.setLineDash([]);
        nodes.forEach((n,i)=>{const na=Math.min(1,Math.max(0,(t-i*0.85)*1.5));if(!na)return;const last=i===nodes.length-1,pulse=last?Math.sin(t*2.5)*0.15+0.15:0;if(last){const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,38+pulse*28);g.addColorStop(0,`rgba(128,78,238,${na*0.35})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.beginPath();ctx.arc(n.x,n.y,38+pulse*28,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();}ctx.beginPath();ctx.arc(n.x,n.y,last?5+pulse*3:2.5,0,Math.PI*2);ctx.fillStyle=last?`rgba(158,98,255,${na})`:`rgba(128,128,168,${na*0.7})`;ctx.fill();if(na>0.6){ctx.fillStyle=last?`rgba(148,98,255,${na*0.85})`:`rgba(68,68,98,${na*0.6})`;ctx.font=last?`bold 11px 'Orbitron',sans-serif`:`9px 'Courier New',monospace`;ctx.textAlign='center';ctx.fillText(n.label,n.x,n.y-(last?18:13));}});
        _dimRafId=requestAnimationFrame(drawConst);
    };
    _dimStopRaf(); drawConst();
    await _dimWait(4500);

    // Final reveal
    text.innerHTML='';
    text.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:auto;';
    const mk=(css,html)=>{const d=document.createElement('div');d.style.cssText='opacity:0;transition:opacity 2.5s;'+css;if(html)d.innerHTML=html;text.appendChild(d);return d;};

    const lbl=mk('font-family:"Courier New",monospace;font-size:0.48rem;letter-spacing:12px;color:rgba(88,68,128,0.72);margin-bottom:26px;','DIMENSION UNLOCKED');
    await _dimWait(80);lbl.style.opacity='1';await _dimWait(1900);
    const sym=mk('font-family:"Orbitron",sans-serif;font-size:5.5rem;color:rgba(138,88,252,0.85);margin-bottom:22px;text-shadow:0 0 80px rgba(118,68,228,0.4);line-height:1;','\u221e');
    await _dimWait(80);sym.style.opacity='1';await _dimWait(2100);
    const ttl=mk('font-family:"Orbitron",sans-serif;font-size:1.28rem;font-weight:900;letter-spacing:14px;color:rgba(178,138,255,0.92);margin-bottom:26px;text-shadow:0 0 40px rgba(118,68,198,0.3);','THE END DIMENSION');
    await _dimWait(80);ttl.style.opacity='1';await _dimWait(1600);
    const poem=mk('font-family:"Courier New",monospace;font-size:0.6rem;color:rgba(88,78,118,0.8);line-height:2.4;letter-spacing:3px;text-align:center;margin-bottom:42px;max-width:340px;','you came as a number.<br>you left as a record.<br><br>there is more still.<br>quests wait in the dark.<br>the dimension is yours.');
    await _dimWait(80);poem.style.opacity='1';await _dimWait(2000);
    const btns=mk('display:flex;gap:18px;','');
    btns.innerHTML=`<button onclick="enterDimensionHub()" style="background:rgba(55,38,98,0.5);border:1px solid rgba(115,75,195,0.5);color:rgba(175,138,255,0.9);font-family:'Courier New',monospace;font-size:0.5rem;letter-spacing:5px;padding:12px 22px;border-radius:4px;cursor:pointer;">[ enter the dimension ]</button>
    <button onclick="window._dimLocked=false;dismissEndDimension()" style="background:none;border:1px solid rgba(45,38,65,0.4);color:rgba(55,48,75,0.62);font-family:'Courier New',monospace;font-size:0.5rem;letter-spacing:5px;padding:12px 22px;border-radius:4px;cursor:pointer;">[ leave ]</button>`;
    await _dimWait(80);btns.style.opacity='1';

    _badgeSilent=true; earnBadge('end_dimension'); _badgeSilent=false;
}

// ── VOID WHEEL ────────────────────────────────────────────────────────────────
const VOID_WHEEL_SEGS = [
    { label:'VOID',        value:-100000, bg:'rgba(38,6,6,0.97)',   fg:'rgba(190,55,55,0.9)'   },
    { label:'ECHO',        value: 75000,  bg:'rgba(6,28,14,0.97)',  fg:'rgba(55,168,88,0.9)'   },
    { label:'SHADOW',      value:-50000,  bg:'rgba(22,6,6,0.97)',   fg:'rgba(145,42,42,0.85)'  },
    { label:'SIGNAL',      value: 150000, bg:'rgba(10,8,36,0.97)',  fg:'rgba(108,82,218,0.9)'  },
    { label:'RIFT',        value:-25000,  bg:'rgba(28,8,8,0.97)',   fg:'rgba(125,48,48,0.82)'  },
    { label:'FRACTURE',    value: 300000, bg:'rgba(16,8,40,0.97)',  fg:'rgba(148,102,245,0.92)'},
    { label:'ERASURE',     value:-300000, bg:'rgba(4,2,4,0.99)',    fg:'rgba(95,22,22,0.85)'   },
    { label:'CONVERGENCE', value:1000000, bg:'rgba(20,10,50,0.97)', fg:'rgba(188,148,255,0.95)'},
];
let _wheelSpinning=false, _wheelRafId=null, _wheelAngle=0;

function _drawWheel(angle) {
    const cv=document.getElementById('void-wheel-canvas');
    if(!cv) return;
    const ctx=cv.getContext('2d'), W=cv.width, H=cv.height, cx=W/2, cy=H/2;
    const R=Math.min(W,H)*0.44, N=VOID_WHEEL_SEGS.length, arc=(Math.PI*2)/N;
    ctx.clearRect(0,0,W,H);
    // outer glow ring
    const og=ctx.createRadialGradient(cx,cy,R*0.88,cx,cy,R*1.08);
    og.addColorStop(0,'rgba(90,45,190,0)'); og.addColorStop(0.6,'rgba(90,45,190,0.14)'); og.addColorStop(1,'rgba(70,30,160,0)');
    ctx.beginPath(); ctx.arc(cx,cy,R*1.06,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();
    // segments
    VOID_WHEEL_SEGS.forEach((seg,i)=>{
        const s=angle+i*arc-Math.PI/2, e=s+arc;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,s,e); ctx.closePath();
        ctx.fillStyle=seg.bg; ctx.fill();
        ctx.strokeStyle='rgba(80,48,155,0.38)'; ctx.lineWidth=1.4; ctx.stroke();
        // text along radius
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(s+arc/2);
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillStyle=seg.fg; ctx.font=`bold 11px 'Courier New',monospace`;
        ctx.fillText(seg.label,R*0.64,0);
        ctx.fillStyle=seg.value>0?'rgba(80,205,110,0.9)':'rgba(210,70,70,0.9)';
        ctx.font=`bold 9px 'Courier New',monospace`;
        const vStr=(seg.value>0?'+':'')+Math.abs(seg.value/1000)+'k';
        ctx.fillText(vStr,R*0.64,14);
        ctx.restore();
    });
    // spoke lines
    for(let i=0;i<N;i++){
        const a=angle+i*arc-Math.PI/2;
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
        ctx.strokeStyle='rgba(70,42,130,0.3)'; ctx.lineWidth=0.8; ctx.stroke();
    }
    // center hub
    const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,R*0.13);
    cg.addColorStop(0,'rgba(88,48,175,0.7)'); cg.addColorStop(1,'rgba(16,8,38,0.98)');
    ctx.beginPath(); ctx.arc(cx,cy,R*0.12,0,Math.PI*2);
    ctx.fillStyle=cg; ctx.fill();
    ctx.strokeStyle='rgba(118,72,205,0.55)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(185,145,255,0.88)';
    ctx.font=`bold ${Math.round(R*0.09)}px Orbitron,sans-serif`;
    ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('\u221e',cx,cy);
}

window.openVoidWheel=function(){
    const ov=document.getElementById('void-wheel-overlay'); if(!ov) return;
    ov.style.display='flex';
    _wheelAngle=Math.random()*Math.PI*2; _drawWheel(_wheelAngle); _updateWheelUI();
};
window.closeVoidWheel=function(){
    const ov=document.getElementById('void-wheel-overlay'); if(ov) ov.style.display='none';
    if(_wheelRafId){cancelAnimationFrame(_wheelRafId);_wheelRafId=null;} _wheelSpinning=false;
};
function _updateWheelUI(){
    const btn=document.getElementById('void-wheel-spin-btn');
    const cd=document.getElementById('void-wheel-cooldown');
    const today=new Date().toDateString();
    const used=localStorage.getItem('crimson_wheel_last')===today;
    if(btn){btn.disabled=used;btn.style.opacity=used?'0.35':'1';btn.style.cursor=used?'not-allowed':'pointer';btn.style.animation=used?'none':'vaultOrbPulse 3s ease-in-out infinite';}
    if(cd) cd.textContent=used?'already spun today \u2014 returns tomorrow':'one free spin per day';
}
window.voidWheelSpin=function(){
    if(_wheelSpinning) return;
    const today=new Date().toDateString();
    if(localStorage.getItem('crimson_wheel_last')===today) return;
    _wheelSpinning=true;
    const btn=document.getElementById('void-wheel-spin-btn');
    const res=document.getElementById('void-wheel-result');
    if(btn){btn.disabled=true;btn.style.opacity='0.35';btn.style.animation='none';}
    if(res) res.textContent='';
    const N=VOID_WHEEL_SEGS.length, arc=(Math.PI*2)/N;
    const winIdx=Math.floor(Math.random()*N);
    const targetAngle=-(winIdx+0.5)*arc;
    const norm=((targetAngle-_wheelAngle)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
    const totalSpin=(5+Math.floor(Math.random()*4))*Math.PI*2+norm;
    const startAngle=_wheelAngle, finalAngle=startAngle+totalSpin;
    const dur=4000+Math.random()*900, t0=performance.now();
    const easeOut=t=>1-Math.pow(1-t,3);
    const spin=(now)=>{
        const p=Math.min((now-t0)/dur,1);
        _wheelAngle=startAngle+totalSpin*easeOut(p);
        _drawWheel(_wheelAngle);
        if(p<1){_wheelRafId=requestAnimationFrame(spin);}
        else{_wheelAngle=finalAngle;_drawWheel(_wheelAngle);_wheelSpinning=false;_wheelRafId=null;
            localStorage.setItem('crimson_wheel_last',today);_wheelLand(winIdx);}
    };
    _wheelRafId=requestAnimationFrame(spin);
};
function _wheelLand(idx){
    const seg=VOID_WHEEL_SEGS[idx];
    const acc=allAccounts[currentAccIdx];
    const prev=acc.coins||0;
    acc.coins=Math.max(0,prev+seg.value);
    save(); updateUI();
    const gained=acc.coins-prev;
    const win=gained>=0;
    const res=document.getElementById('void-wheel-result');
    if(res){res.style.color=win?'rgba(75,190,105,0.9)':'rgba(200,62,62,0.9)';res.textContent=`${seg.label}  \u2014  ${win?'+':''}${gained.toLocaleString()} \ud83e\ude99`;}
    _updateWheelUI();
    showNotification(`${seg.label}: ${win?'+':''}${gained.toLocaleString()} \ud83e\ude99`,win?'success':'error');
}

// ── PLINKO ────────────────────────────────────────────────────────────────────
const PLINKO_ROWS = 8;
const PLINKO_RISK_MULTS = {
    low:  [5, 2.5, 1.5, 1.0, 0.8, 1.0, 1.5, 2.5, 5],
    med:  [10, 3, 1.5, 0.8, 0.3, 0.8, 1.5, 3, 10],
    high: [25, 6, 2.0, 0.4, 0.2, 0.4, 2.0, 6, 25]
};
const PLINKO_BETS = [10000, 50000, 100000, 500000];
const PK_CX=275, PK_SW=52, PK_TOP=95, PK_ROW=54;
let _plinkoBet=50000, _plinkoRisk='med', _plinkoBalls=1;
let _plinkoActive=[], _plinkoRafId=null, _plinkoRunning=false;
function _plinkoMults(){return PLINKO_RISK_MULTS[_plinkoRisk];}

function _updatePlinkoUI() {
    PLINKO_BETS.forEach(b => {
        const btn=document.getElementById('plinko-bet-'+b); if(!btn) return;
        btn.style.background  = b===_plinkoBet?'rgba(90,50,170,0.55)':'rgba(20,15,38,0.8)';
        btn.style.borderColor = b===_plinkoBet?'rgba(155,100,255,0.7)':'rgba(55,40,90,0.5)';
        btn.style.color       = b===_plinkoBet?'rgba(210,185,255,0.95)':'rgba(140,108,220,0.85)';
    });
    const rCols={low:'rgba(74,222,128,0.9)',med:'rgba(251,191,36,0.9)',high:'rgba(248,113,113,0.9)'};
    ['low','med','high'].forEach(r=>{
        const btn=document.getElementById('plinko-risk-'+r); if(!btn) return;
        const on=r===_plinkoRisk, c=rCols[r];
        btn.style.background  = on?'rgba(30,20,55,0.9)':'rgba(14,10,28,0.7)';
        btn.style.borderColor = on?c:'rgba(55,40,90,0.4)';
        btn.style.color       = on?c:'rgba(80,65,120,0.7)';
        btn.style.boxShadow   = on?'0 0 6px '+c:'none';
    });
    [1,3,5,10,20].forEach(n=>{
        const btn=document.getElementById('plinko-balls-'+n); if(!btn) return;
        btn.style.background  = n===_plinkoBalls?'rgba(90,50,170,0.55)':'rgba(20,15,38,0.8)';
        btn.style.borderColor = n===_plinkoBalls?'rgba(155,100,255,0.7)':'rgba(55,40,90,0.5)';
        btn.style.color       = n===_plinkoBalls?'rgba(210,185,255,0.95)':'rgba(140,108,220,0.85)';
    });
    const acc=allAccounts[currentAccIdx];
    const cost=_plinkoBet*_plinkoBalls, canAff=(acc.coins||0)>=cost;
    const dropBtn=document.getElementById('plinko-drop-btn');
    if(dropBtn){
        dropBtn.disabled=_plinkoRunning||!canAff;
        dropBtn.style.opacity=(_plinkoRunning||!canAff)?'0.4':'1';
        dropBtn.style.cursor=(_plinkoRunning||!canAff)?'not-allowed':'pointer';
    }
    const balEl=document.getElementById('plinko-balance');
    if(balEl) balEl.textContent=(acc.coins||0).toLocaleString()+' ';
    const costEl=document.getElementById('plinko-cost');
    if(costEl) costEl.textContent='cost: '+cost.toLocaleString()+' ';
    if(!_plinkoRunning) _drawPlinkoBoard([],new Set());
}

window.openPlinko = function() {
    const ov = document.getElementById('plinko-overlay');
    if (!ov) return;
    ov.style.display='flex';
    _drawPlinkoBoard([], new Set());
    _updatePlinkoUI();
};
window.closePlinko = function() {
    const ov = document.getElementById('plinko-overlay');
    if (ov) ov.style.display='none';
    if (_plinkoRafId) { cancelAnimationFrame(_plinkoRafId); _plinkoRafId=null; }
    _plinkoRunning=false; _plinkoActive=[];
};
window.plinkoSetBet   = function(v) { _plinkoBet=Math.max(1,parseInt(v)||1); _updatePlinkoUI(); };
window.plinkoSetRisk  = function(r) { _plinkoRisk=r; _updatePlinkoUI(); };
window.plinkoSetBalls = function(n) { _plinkoBalls=n; _updatePlinkoUI(); };
window.plinkoDrop = function() {
    if (_plinkoRunning) return;
    const acc=allAccounts[currentAccIdx];
    const cost=_plinkoBet*_plinkoBalls;
    if ((acc.coins||0)<cost) { showNotification('Not enough coins!','error'); return; }
    acc.coins-=cost; save(); updateUI();
    _plinkoRunning=true; _plinkoActive=[];
    const resEl=document.getElementById('plinko-result');
    if (resEl) resEl.textContent='';
    _updatePlinkoUI();
    for (let b=0; b<_plinkoBalls; b++) {
        const path=Array.from({length:PLINKO_ROWS},()=>Math.random()<0.5?0:1);
        const slotIdx=path.reduce((a,v)=>a+v,0);
        const pts=[{x:PK_CX,y:PK_TOP-50}];
        let s=0;
        for (let r=0;r<PLINKO_ROWS;r++) { pts.push({x:PK_CX+(s-r/2)*PK_SW,y:PK_TOP+r*PK_ROW}); s+=path[r]; }
        pts.push({x:PK_CX+(slotIdx-4)*PK_SW,y:PK_TOP+PLINKO_ROWS*PK_ROW+34});
        _plinkoActive.push({pts,slotIdx,startDelay:b*280});
    }
    _runPlinkoAnim();
};
function _runPlinkoAnim() {
    const N=PLINKO_ROWS+2, TOTAL_MS=2400, t0=performance.now();
    _plinkoActive.forEach(ball=>{ball.t0=t0+ball.startDelay;});
    const landed=new Array(_plinkoActive.length).fill(-1);
    const tick=(now)=>{
        let allDone=true;
        const positions=[], litSet=new Set();
        _plinkoActive.forEach((ball,i)=>{
            if (now<ball.t0){allDone=false;return;}
            const frac=Math.min((now-ball.t0)/TOTAL_MS,1);
            if (frac<1) allDone=false;
            const raw=frac*(N-1), seg=Math.min(Math.floor(raw),N-2), lt=raw-seg;
            const ease=lt<0.5?2*lt*lt:-1+(4-2*lt)*lt;
            const a=ball.pts[seg], bpt=ball.pts[seg+1];
            positions.push({x:a.x+(bpt.x-a.x)*ease,y:a.y+(bpt.y-a.y)*ease,idx:i});
            if (frac>=1){litSet.add(ball.slotIdx);if(landed[i]===-1)landed[i]=ball.slotIdx;}
        });
        _drawPlinkoBoard(positions,litSet);
        if (!allDone){_plinkoRafId=requestAnimationFrame(tick);}
        else{_plinkoRafId=null;_plinkoAllLanded(landed);}
    };
    _plinkoRafId=requestAnimationFrame(tick);
}
function _drawPlinkoBoard(balls,litSlots){
    const cv=document.getElementById('plinko-canvas'); if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    const SLOT_Y=PK_TOP+PLINKO_ROWS*PK_ROW+12;
    const MULTS=_plinkoMults();
    const riskPal={low:['#22c55e','#34d399','#6ee7b7','#bbf7d0','#d1fae5','#bbf7d0','#6ee7b7','#34d399','#22c55e'],med:['#f97316','#fbbf24','#fcd34d','#a78bfa','#7c3aed','#a78bfa','#fcd34d','#fbbf24','#f97316'],high:['#ef4444','#f97316','#fb923c','#a78bfa','#6d28d9','#a78bfa','#fb923c','#f97316','#ef4444']};
    const SCOL=riskPal[_plinkoRisk];
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#04020c'; ctx.fillRect(0,0,W,H);
    const SLOT_START=PK_CX-4.5*PK_SW;
    for(let i=0;i<MULTS.length;i++){
        const sx=SLOT_START+i*PK_SW+1,sw2=PK_SW-2;
        const isLit=litSlots instanceof Set?litSlots.has(i):false;
        ctx.beginPath();ctx.rect(sx,SLOT_Y,sw2,50);
        ctx.fillStyle=isLit?SCOL[i]:'rgba(18,12,36,0.9)';ctx.fill();
        ctx.strokeStyle=isLit?SCOL[i]:'rgba(70,48,120,0.45)';ctx.lineWidth=1.4;ctx.stroke();
        ctx.fillStyle=isLit?'#000':SCOL[i];
        ctx.font="bold 13px 'Courier New',monospace";ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(MULTS[i]+'x',sx+sw2/2,SLOT_Y+17);
        const winAmt=Math.floor(_plinkoBet*MULTS[i]);
        const vStr=winAmt>=1e6?(winAmt/1e6).toFixed(1)+'M':Math.round(winAmt/1000)+'k';
        ctx.fillStyle=isLit?'#000':'rgba(110,85,160,0.7)';
        ctx.font="9px 'Courier New',monospace";
        ctx.fillText(vStr,sx+sw2/2,SLOT_Y+36);
    }
    for(let r=0;r<PLINKO_ROWS;r++){
        for(let j=0;j<=r;j++){
            const px=PK_CX+(j-r/2)*PK_SW, py=PK_TOP+r*PK_ROW;
            ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);
            ctx.fillStyle='rgba(105,68,185,0.75)';ctx.fill();
            ctx.strokeStyle='rgba(155,110,255,0.55)';ctx.lineWidth=1;ctx.stroke();
        }
    }
    const BCOLS=['rgba(215,190,255,0.97)','rgba(160,240,200,0.97)','rgba(255,200,150,0.97)','rgba(150,210,255,0.97)','rgba(255,170,200,0.97)'];
    const BGLOW=['rgba(170,120,255,0.8)','rgba(80,220,150,0.8)','rgba(255,150,80,0.8)','rgba(80,160,255,0.8)','rgba(255,100,160,0.8)'];
    balls.forEach(ball=>{
        const ci=ball.idx%5;
        ctx.shadowColor=BGLOW[ci];ctx.shadowBlur=16;
        ctx.beginPath();ctx.arc(ball.x,ball.y,11,0,Math.PI*2);
        ctx.fillStyle=BCOLS[ci];ctx.fill();
        ctx.strokeStyle=BGLOW[ci];ctx.lineWidth=2;ctx.stroke();
        ctx.shadowBlur=0;
    });
}

function _plinkoAllLanded(slotIndices) {
    const MULTS = _plinkoMults();
    const acc = allAccounts[currentAccIdx];
    let totalWin = 0;
    slotIndices.forEach(idx => { if (idx >= 0) totalWin += Math.floor(_plinkoBet * MULTS[idx]); });
    acc.coins += totalWin; save(); updateUI();
    const totalBet = _plinkoBet * _plinkoBalls, netGain = totalWin - totalBet;
    const resEl = document.getElementById('plinko-result');
    if (resEl) {
        resEl.style.color = netGain >= 0 ? 'rgba(75,200,110,0.92)' : 'rgba(210,65,65,0.92)';
        const avgM = (totalWin / totalBet).toFixed(2);
        resEl.textContent = avgM+'x avg  —  '+totalWin.toLocaleString()+'  ('+(netGain>=0?'+':'')+netGain.toLocaleString()+')';
    }
    showNotification('Plinko: '+(netGain>=0?'+':'')+netGain.toLocaleString()+' ', netGain>=0?'success':'error');
    _recordGamble('plinko', netGain>0, netGain<0);
    _plinkoRunning = false; _plinkoActive = [];
    _updatePlinkoUI();
    _drawPlinkoBoard([], new Set(slotIndices.filter(i => i >= 0)));
}

// ── ROULETTE ─────────────────────────────────────────────────────────────────
const ROUL_RED = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
let _roulBet=50000, _roulBetType='red', _roulBetNum=7, _roulRunning=false, _roulRafId=null;

function _roulColor(n){return n===0?'#1faa30':ROUL_RED.has(n)?'#cc1f1f':'#cccccc';}
function _roulColorName(n){return n===0?'GREEN':ROUL_RED.has(n)?'RED':'BLACK';}
function _roulPayout(t){return(t==='number'||t==='green')?35:1;}
function _roulCheckWin(r,t,num){
    if(t==='red')    return r>0&&ROUL_RED.has(r);
    if(t==='black')  return r>0&&!ROUL_RED.has(r);
    if(t==='green')  return r===0;
    if(t==='odd')    return r>0&&r%2===1;
    if(t==='even')   return r>0&&r%2===0;
    if(t==='low')    return r>=1&&r<=18;
    if(t==='high')   return r>=19&&r<=36;
    if(t==='number') return r===num;
    return false;
}
function _drawRoulCanvas(displayNum,spinning){
    const cv=document.getElementById('roul-canvas');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#080101';ctx.fillRect(0,0,W,H);
    const col=_roulColor(displayNum);
    if(spinning){
        ctx.globalAlpha=0.85;
        ctx.font='bold 52px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillStyle=col;ctx.fillText(String(displayNum),W/2,H/2-2);
        ctx.globalAlpha=1;
    }else{
        ctx.shadowColor=col;ctx.shadowBlur=22;
        ctx.font='bold 52px Arial,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillStyle=col;ctx.fillText(String(displayNum),W/2,H/2-8);
        ctx.shadowBlur=0;
        ctx.font="bold 10px 'Courier New',monospace";ctx.fillStyle='rgba(200,200,200,0.55)';
        ctx.fillText(_roulColorName(displayNum),W/2,H/2+30);
    }
    ctx.strokeStyle='rgba(140,30,30,0.3)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(W/2,4);ctx.lineTo(W/2,H-4);ctx.stroke();
}

function _updateRoulUI(){
    const types=['red','black','green','odd','even','low','high','number'];
    types.forEach(t=>{
        const btn=document.getElementById('roul-bt-'+t);if(!btn)return;
        const active=t===_roulBetType;
        btn.style.outline=active?'1.5px solid rgba(230,190,50,0.75)':'none';
        btn.style.boxShadow=active?'0 0 7px rgba(220,180,40,0.25)':'none';
    });
    [10000,50000,100000,500000].forEach(b=>{
        const btn=document.getElementById('roul-bet-'+b);if(!btn)return;
        btn.style.background=b===_roulBet?'rgba(75,20,20,0.65)':'rgba(22,8,8,0.8)';
        btn.style.borderColor=b===_roulBet?'rgba(200,70,70,0.6)':'rgba(80,30,30,0.5)';
        btn.style.color=b===_roulBet?'rgba(255,140,140,0.95)':'rgba(180,90,90,0.88)';
    });
    const acc=allAccounts[currentAccIdx];
    const bal=document.getElementById('roul-balance');
    if(bal)bal.textContent=(acc.coins||0).toLocaleString()+' ';
    const spinBtn=document.getElementById('roul-spin-btn');
    const ok=(acc.coins||0)>=_roulBet;
    if(spinBtn){spinBtn.disabled=_roulRunning||!ok;spinBtn.style.opacity=(_roulRunning||!ok)?'0.4':'1';}
    const numRow=document.getElementById('roul-num-row');
    if(numRow)numRow.style.display=_roulBetType==='number'?'flex':'none';
    const summary=document.getElementById('roul-bet-summary');
    if(summary){
        const typeLabel={red:'RED',black:'BLACK',green:'0 GREEN',odd:'ODD',even:'EVEN',low:'1-18',high:'19-36',number:'#'+_roulBetNum}[_roulBetType]||'';
        summary.textContent=typeLabel+'  ·  '+_roulPayout(_roulBetType)+':1  ·  '+_roulBet.toLocaleString()+' ';
    }
    const custR=document.getElementById('roul-custom-bet');
    if(custR)custR.value=_roulBet;
}

window.openRoul=function(){
    const ov=document.getElementById('roul-overlay');if(!ov)return;
    ov.style.display='flex';
    const cv=document.getElementById('roul-canvas');
    if(cv){const ctx=cv.getContext('2d');ctx.fillStyle='#080101';ctx.fillRect(0,0,cv.width,cv.height);}
    _updateRoulUI();
};
window.closeRoul=function(){
    const ov=document.getElementById('roul-overlay');if(ov)ov.style.display='none';
    if(_roulRafId){cancelAnimationFrame(_roulRafId);_roulRafId=null;}
    _roulRunning=false;
};
window.roulSetBet=function(b){_roulBet=Math.max(1,parseInt(b)||1);_updateRoulUI();};
window.roulSetType=function(t){_roulBetType=t;_updateRoulUI();};
window.roulSetNum=function(v){_roulBetNum=Math.max(1,Math.min(36,parseInt(v)||1));_updateRoulUI();};
window.roulSpin=function(){
    if(_roulRunning)return;
    const acc=allAccounts[currentAccIdx];
    if((acc.coins||0)<_roulBet){showNotification('Not enough coins!','error');return;}
    acc.coins-=_roulBet;save();updateUI();
    _roulRunning=true;_updateRoulUI();
    const resEl=document.getElementById('roul-result');
    if(resEl)resEl.textContent='';
    const result=Math.floor(Math.random()*37);
    let frame=0;
    const spin=()=>{
        _drawRoulCanvas(Math.floor(Math.random()*37),true);
        frame++;
        if(frame<40){_roulRafId=requestAnimationFrame(spin);}
        else{_roulRafId=null;_roulLand(result);}
    };
    _roulRafId=requestAnimationFrame(spin);
};
function _roulLand(r){
    _drawRoulCanvas(r,false);
    const win=_roulCheckWin(r,_roulBetType,_roulBetNum);
    const payout=win?Math.floor(_roulBet*(_roulPayout(_roulBetType)+1)):0;
    const acc=allAccounts[currentAccIdx];
    acc.coins+=payout;save();updateUI();
    const net=payout-_roulBet;
    const resEl=document.getElementById('roul-result');
    if(resEl){
        resEl.style.color=win?'rgba(75,200,110,0.92)':'rgba(210,65,65,0.92)';
        resEl.textContent=_roulColorName(r)+' '+r+(win?'  —  +'+payout.toLocaleString()+' 🪙':'  —  -'+_roulBet.toLocaleString()+' 🪙');
    }
    showNotification('Roulette: '+(net>=0?'+':'')+net.toLocaleString()+' 🪙',net>=0?'success':'error');
    _recordGamble('roulette',net>0,net<0);
    _roulRunning=false;_updateRoulUI();
}

const SLOT_SYMS  = ['💎','⚡','🔥','🍀','⭐','💰'];
const SLOT_COLS  = ['rgba(188,148,255,0.95)','rgba(255,215,80,0.95)','rgba(85,162,255,0.95)','rgba(255,82,102,0.92)','rgba(75,205,190,0.90)','rgba(255,198,45,0.9)'];
const SLOT_PAYS3 = [30,15,8,5,3,2];
const SLOT_WGTS  = [1,4,6,8,9,10];
const SLOT_STOP  = [900,1600,2300];
let _slotBet=50000, _slotRunning=false, _slotRafId=null;
let _slotShown=[[0,0,0],[0,0,0],[0,0,0]];

function _slotRnd(){const t=Math.random()*SLOT_WGTS.reduce((a,b)=>a+b,0);let s=0;for(let i=0;i<SLOT_WGTS.length;i++){s+=SLOT_WGTS[i];if(t<s)return i;}return SLOT_WGTS.length-1;}

function _updateSlotUI(){
    [10000,50000,100000,500000].forEach(b=>{
        const btn=document.getElementById('slot-bet-'+b);
        if(!btn)return;
        btn.style.background=b===_slotBet?'rgba(90,50,170,0.55)':'rgba(20,15,38,0.8)';
        btn.style.borderColor=b===_slotBet?'rgba(155,100,255,0.7)':'rgba(55,40,90,0.5)';
        btn.style.color=b===_slotBet?'rgba(210,185,255,0.95)':'rgba(140,108,220,0.85)';
    });
    const acc=allAccounts[currentAccIdx];
    const ok=(acc.coins||0)>=_slotBet;
    const btn=document.getElementById('slot-spin-btn');
    if(btn){btn.disabled=_slotRunning||!ok;btn.style.opacity=(_slotRunning||!ok)?'0.4':'1';}
    const bal=document.getElementById('slot-balance');
    if(bal)bal.textContent=(acc.coins||0).toLocaleString()+' ';
    const custS=document.getElementById('slot-custom-bet');
    if(custS)custS.value=_slotBet;
}

window.openBJ=function(){
    const ov=document.getElementById('bj-overlay');if(!ov)return;
    ov.style.display='flex';
    const cv=document.getElementById('bj-canvas');
    if(cv){const ctx=cv.getContext('2d');ctx.fillStyle='#020d04';ctx.fillRect(0,0,cv.width,cv.height);}
    _updateBJUI();
};
window.closeBJ=function(){
    const ov=document.getElementById('bj-overlay');if(ov)ov.style.display='none';
    _bjRunning=false;_bjPhase='idle';
};
window.bjSetBet=function(b){_bjBet=Math.max(1,parseInt(b)||1);_updateBJUI();};
window.bjDeal=function(){
    if(_bjRunning)return;
    const acc=allAccounts[currentAccIdx];
    if((acc.coins||0)<_bjBet){showNotification('Not enough coins!','error');return;}
    acc.coins-=_bjBet;save();updateUI();
    _bjRunning=true;_bjPhase='player';
    _bjDeck=_bjNewDeck();
    _bjPlayer=[_bjDraw(),_bjDraw()];
    _bjDealer=[_bjDraw(),_bjDraw()];
    _bjRender();_updateBJUI();
    const resEl=document.getElementById('bj-result');
    if(resEl)resEl.textContent='';
    if(_bjTotal(_bjPlayer)===21){window.bjStand();}
};
window.bjHit=function(){
    if(!_bjRunning||_bjPhase!=='player')return;
    _bjPlayer.push(_bjDraw());
    _bjRender();
    if(_bjTotal(_bjPlayer)>21){_bjFinish('bust');}
};
window.bjStand=function(){
    if(!_bjRunning||_bjPhase!=='player')return;
    _bjPhase='dealer';
    while(_bjTotal(_bjDealer)<17){_bjDealer.push(_bjDraw());}
    _bjRender();
    const p=_bjTotal(_bjPlayer),d=_bjTotal(_bjDealer);
    if(d>21||p>d)_bjFinish('win');
    else if(p===d)_bjFinish('push');
    else _bjFinish('lose');
};
function _bjFinish(outcome){
    let payout=0,msg='';
    if(outcome==='win'){payout=Math.floor(_bjBet*2);msg='WIN';}
    else if(outcome==='push'){payout=_bjBet;msg='PUSH';}
    else if(outcome==='bust'){msg='BUST';}
    else{msg='LOSE';}
    const acc=allAccounts[currentAccIdx];
    acc.coins+=payout;save();updateUI();
    const net=payout-_bjBet;
    const resEl=document.getElementById('bj-result');
    if(resEl){
        resEl.style.color=net>=0?'rgba(75,200,110,0.92)':'rgba(210,65,65,0.92)';
        resEl.textContent=msg+(net!==0?'  —  '+(net>=0?'+':'')+net.toLocaleString()+' 🪙':'  —  push');
    }
    showNotification('Blackjack: '+msg+' '+(net>=0?'+':'')+net.toLocaleString()+' 🪙',net>=0?'success':'error');
    _recordGamble('blackjack',net>0,net<0);
    _bjRunning=false;_bjPhase='idle';_updateBJUI();
}

const BJ_SUITS = ['♠','♥','♦','♣'];
const BJ_VALS  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const BJ_CW = 52, BJ_CH = 74;
let _bjBet=50000, _bjRunning=false;
let _bjDeck=[], _bjPlayer=[], _bjDealer=[], _bjPhase='idle';

function _bjNewDeck(){
    const d=[];
    BJ_SUITS.forEach(s=>BJ_VALS.forEach(v=>d.push({s,v})));
    for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]];}
    return d;
}
function _bjDraw(){return _bjDeck.pop();}
function _bjTotal(hand){
    let s=0,aces=0;
    hand.forEach(c=>{
        if(c.v==='A'){s+=11;aces++;}
        else if(['J','Q','K'].includes(c.v))s+=10;
        else s+=parseInt(c.v);
    });
    while(s>21&&aces>0){s-=10;aces--;}
    return s;
}
function _bjRender(){
    const cv=document.getElementById('bj-canvas');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle='#020d04';ctx.fillRect(0,0,W,H);
    const drawHand=(hand,x0,y,hideFirst)=>{
        hand.forEach((c,i)=>{
            const cx=x0+i*(BJ_CW+6),hidden=i===0&&hideFirst;
            ctx.fillStyle=hidden?'rgba(20,50,25,0.9)':'rgba(240,240,220,0.96)';
            ctx.strokeStyle=hidden?'rgba(40,100,50,0.5)':'rgba(180,180,155,0.5)';
            ctx.lineWidth=1;
            ctx.beginPath();ctx.rect(cx,y,BJ_CW,BJ_CH);ctx.fill();ctx.stroke();
            if(!hidden){
                const isRed=c.s==='♥'||c.s==='♦';
                ctx.fillStyle=isRed?'#cc2222':'#111';
                ctx.font="bold 13px 'Courier New',monospace";ctx.textAlign='left';ctx.textBaseline='top';
                ctx.fillText(c.v,cx+5,y+5);
                ctx.font='bold 16px Arial';ctx.textAlign='center';ctx.textBaseline='middle';
                ctx.fillText(c.s,cx+BJ_CW/2,y+BJ_CH/2);
            }
        });
    };
    const dScore=_bjPhase==='player'?'?':_bjTotal(_bjDealer);
    const pScore=_bjTotal(_bjPlayer);
    ctx.fillStyle='rgba(80,200,100,0.5)';ctx.font="11px 'Courier New',monospace";ctx.textAlign='left';ctx.textBaseline='top';
    ctx.fillText('DEALER  '+dScore,14,6);
    ctx.fillText('PLAYER  '+pScore,14,H/2+4);
    drawHand(_bjDealer,14,22,_bjPhase==='player');
    drawHand(_bjPlayer,14,H/2+18,false);
}

function _updateBJUI(){
    [10000,50000,100000,500000].forEach(b=>{
        const btn=document.getElementById('bj-bet-'+b);
        if(!btn)return;
        btn.style.background=b===_bjBet?'rgba(18,72,28,0.65)':'rgba(8,28,12,0.8)';
        btn.style.borderColor=b===_bjBet?'rgba(55,160,80,0.7)':'rgba(30,75,42,0.55)';
        btn.style.color=b===_bjBet?'rgba(110,220,135,0.95)':'rgba(80,175,105,0.88)';
    });
    const acc=allAccounts[currentAccIdx];
    const bal=document.getElementById('bj-balance');
    if(bal)bal.textContent=(acc.coins||0).toLocaleString()+' ';
    const inPlay=_bjRunning&&_bjPhase==='player';
    const dealBtn=document.getElementById('bj-deal-btn');
    const hitBtn=document.getElementById('bj-hit-btn');
    const standBtn=document.getElementById('bj-stand-btn');
    if(dealBtn){dealBtn.disabled=_bjRunning;dealBtn.style.opacity=_bjRunning?'0.35':'1';}
    if(hitBtn){hitBtn.disabled=!inPlay;hitBtn.style.opacity=inPlay?'1':'0.35';}
    if(standBtn){standBtn.disabled=!inPlay;standBtn.style.opacity=inPlay?'1':'0.35';}
    const custBJ=document.getElementById('bj-custom-bet');
    if(custBJ)custBJ.value=_bjBet;
}
function _drawSlotBoard(shown,stopped,litMult){
    const cv=document.getElementById('slot-canvas');if(!cv)return;
    const ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
    ctx.fillStyle='#04020c';ctx.fillRect(0,0,W,H);
    const RX=[20,135,250],RW=90,RY=15,RH=195;
    const SY=[47,112,177];

    // Win line band
    ctx.fillStyle='rgba(78,45,155,0.09)';ctx.fillRect(0,79,W,66);
    ctx.strokeStyle='rgba(105,60,190,0.28)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(0,79);ctx.lineTo(W,79);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,145);ctx.lineTo(W,145);ctx.stroke();

    RX.forEach((rx,i)=>{
        ctx.fillStyle='rgba(7,4,18,0.9)';
        ctx.strokeStyle='rgba(48,32,78,0.55)';ctx.lineWidth=1.2;
        ctx.beginPath();ctx.rect(rx,RY,RW,RH);ctx.fill();ctx.stroke();
        ctx.save();ctx.beginPath();ctx.rect(rx,RY,RW,RH);ctx.clip();
        shown[i].forEach((sIdx,j)=>{
            const isMid=j===1;
            let col;
            if(stopped[i]&&isMid) col=SLOT_COLS[sIdx];
            else if(stopped[i])   col='rgba(60,45,90,0.5)';
            else                  col='rgba(90,70,130,0.55)';
            ctx.font='bold 30px Arial,sans-serif';
            ctx.textAlign='center';ctx.textBaseline='middle';
            ctx.fillStyle=col;
            ctx.fillText(SLOT_SYMS[sIdx],rx+RW/2,SY[j]);
        });
        ctx.restore();
        // top/bottom fade
        const fade=ctx.createLinearGradient(rx,RY,rx,RY+RH);
        fade.addColorStop(0,'rgba(4,2,12,0.6)');fade.addColorStop(0.28,'rgba(4,2,12,0)');
        fade.addColorStop(0.72,'rgba(4,2,12,0)');fade.addColorStop(1,'rgba(4,2,12,0.6)');
        ctx.fillStyle=fade;ctx.fillRect(rx,RY,RW,RH);
    });

    if(litMult>0){
        ctx.font="bold 13px 'Courier New',monospace";
        ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillStyle='rgba(192,158,255,0.92)';
        ctx.fillText(litMult+'x',W/2,H-9);
    }
}

window.openSlot=function(){
    const ov=document.getElementById('slot-overlay');if(!ov)return;
    ov.style.display='flex';
    _slotShown=[[_slotRnd(),_slotRnd(),_slotRnd()],[_slotRnd(),_slotRnd(),_slotRnd()],[_slotRnd(),_slotRnd(),_slotRnd()]];
    _drawSlotBoard(_slotShown,[true,true,true],0);
    _updateSlotUI();
};
window.closeSlot=function(){
    const ov=document.getElementById('slot-overlay');if(ov)ov.style.display='none';
    if(_slotRafId){cancelAnimationFrame(_slotRafId);_slotRafId=null;}
    _slotRunning=false;
};
window.slotSetBet=function(b){_slotBet=Math.max(1,parseInt(b)||1);_updateSlotUI();};
window.slotSpin=function(){
    if(_slotRunning)return;
    const acc=allAccounts[currentAccIdx];
    if((acc.coins||0)<_slotBet){showNotification('Not enough coins!','error');return;}
    acc.coins-=_slotBet;save();updateUI();
    _slotRunning=true;_updateSlotUI();
    const resEl=document.getElementById('slot-result');
    if(resEl)resEl.textContent='';
    const results=[_slotRnd(),_slotRnd(),_slotRnd()];
    const neighbors=results.map(r=>[_slotRnd(),r,_slotRnd()]);
    _runSlotAnim(results,neighbors);
};

function _runSlotAnim(results,neighbors){
    const t0=performance.now();
    const stopped=[false,false,false];
    const lastTick=[0,0,0];
    _slotShown=[[_slotRnd(),_slotRnd(),_slotRnd()],[_slotRnd(),_slotRnd(),_slotRnd()],[_slotRnd(),_slotRnd(),_slotRnd()]];
    const tick=(now)=>{
        const el=now-t0;
        for(let i=0;i<3;i++){
            if(stopped[i])continue;
            if(el>=SLOT_STOP[i]){
                stopped[i]=true;
                _slotShown[i]=neighbors[i];
            }else if(now-lastTick[i]>80){
                _slotShown[i]=[_slotRnd(),_slotRnd(),_slotRnd()];
                lastTick[i]=now;
            }
        }
        _drawSlotBoard(_slotShown,stopped,0);
        if(!stopped[2]){_slotRafId=requestAnimationFrame(tick);}
        else{_slotRafId=null;_slotLand(results);}
    };
    _slotRafId=requestAnimationFrame(tick);
}

function _slotLand(results){
    const [r0,r1,r2]=results;
    let mult=0;
    const trip=r0===r1&&r1===r2;
    const pair=!trip&&(r0===r1||r1===r2||r0===r2);
    if(trip)mult=SLOT_PAYS3[r0];
    else if(pair)mult=1.5;
    _drawSlotBoard(_slotShown,[true,true,true],mult);
    const acc=allAccounts[currentAccIdx];
    const win=Math.floor(_slotBet*mult);
    acc.coins+=win;save();updateUI();
    const net=win-_slotBet;
    const resEl=document.getElementById('slot-result');
    if(resEl){
        if(trip){
            resEl.style.color=SLOT_COLS[r0];
            resEl.textContent=SLOT_SYMS[r0]+SLOT_SYMS[r0]+SLOT_SYMS[r0]+'  \u2014  '+mult+'x  \u2014  +'+win.toLocaleString()+' \ud83e\ude99';
        }else if(pair){
            resEl.style.color=net>=0?'rgba(75,200,110,0.92)':'rgba(210,65,65,0.92)';
            resEl.textContent='pair  \u2014  1.5x  \u2014  '+(net>=0?'+':'')+net.toLocaleString()+' \ud83e\ude99';
        }else{
            resEl.style.color='rgba(210,65,65,0.92)';
            resEl.textContent='no match  \u2014  -'+_slotBet.toLocaleString()+' \ud83e\ude99';
        }
    }
    showNotification('Slots: '+(net>=0?'+':'')+net.toLocaleString()+' \ud83e\ude99',net>=0?'success':'error');
    _recordGamble('slots',net>0,net<0);
    _slotRunning=false;_updateSlotUI();
}

// hidden dev function — not listed in console
window.testFinale = function() { _dimState.quests = {}; DIM_QUESTS.forEach(q => { _dimState.quests[q.id] = true; }); _saveDim(); _playDimFinale(); };

window.onload = init;
