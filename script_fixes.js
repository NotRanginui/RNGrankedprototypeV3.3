// This file contains all the fixes to be applied to script.js
// Copy these functions to replace the existing ones

// FIX 1: Update settings to persist round numbers toggle
window.updateSettings = () => { 
    settings.roundNumbers = document.getElementById('round-toggle').checked; 
    save(); 
    updateUI(); 
};

// FIX 2: Initialize settings UI on load
function initSettingsUI() {
    const roundToggle = document.getElementById('round-toggle');
    if (roundToggle) {
        roundToggle.checked = settings.roundNumbers || false;
    }
    const luckSlider = document.getElementById('luck-scale-slider');
    const luckValue = document.getElementById('luck-scale-value');
    if (luckSlider && luckValue) {
        luckSlider.value = settings.luckScale || 100;
        luckValue.innerText = `${settings.luckScale || 100}x`;
    }
}

// FIX 3: Fix potion stacking - only extend duration, don't multiply luck
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
        playerLuck *= item.luckMultiplier;
        showNotification(`Used ${item.name}! ${item.luckMultiplier}x luck for this roll!`, "success");
        
        // Reset luck after roll
        setTimeout(() => {
            playerLuck = originalLuck;
            updateUI();
        }, 1500);
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

// FIX 4: Update calculateTotalLuck to handle potions correctly (no stacking multipliers)
function calculateTotalLuck() {
    const acc = allAccounts[currentAccIdx];
    let totalLuck = playerLuck * acc.permanentLuckBoost * adminRPBonus;
    
    // Apply luck scaling based on max achieved luck
    const maxAchievedLuck = acc.maxAchievedLuck || totalLuck;
    const scaledLuck = Math.min(totalLuck, Math.min(maxAchievedLuck, (settings.luckScale || 100)));
    totalLuck = scaledLuck;
    
    // Add active potion effects - find highest multiplier, don't stack
    const now = Date.now();
    let highestPotionMultiplier = 1.0;
    acc.activePotions.forEach(potion => {
        if (now < potion.expiresAt) {
            highestPotionMultiplier = Math.max(highestPotionMultiplier, potion.multiplier);
        }
    });
    
    totalLuck *= highestPotionMultiplier;
    
    return totalLuck;
}

// FIX 5: Update renderAccounts to show accounts first, then create option
function renderAccounts() {
    const accountsList = allAccounts.map((a, i) => `
        <div class="acc-item" style="display:flex; align-items:center; background:#1e293b; margin-bottom:8px; border-radius:10px; border-left: 4px solid ${i === currentAccIdx ? '#ef4444' : 'transparent'}">
            <div onclick="switchAcc(${i})" style="flex:1; padding:12px; cursor:pointer;"><div style="font-weight:900;">${a.name}</div><div style="font-size:0.7rem; opacity:0.6;">${Math.floor(a.points)} RP</div></div>
            <button onclick="deleteAcc(${i})" style="padding:15px; background:none; border:none; color:#ef4444;">✕</button>
        </div>`).join('');
    
    document.getElementById('acc-list').innerHTML = accountsList;
    save();
}

// FIX 6: Add 5 account limit with grandfathering
window.createNewAccount = () => {
    if (allAccounts.length >= 5) {
        showNotification("Maximum 5 accounts allowed!", "error");
        return;
    }
    
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
        coins: 0,
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
        lastWeeklyReset: getNextSunday(Date.now() - (7 * 24 * 60 * 60 * 1000)), // Set to last Sunday
        weeklyHistory: [],
        highestRpEver: 0
    };
    
    allAccounts.push(newAcc);
    nameInput.value = '';
    renderAccounts();
    save();
    showNotification(`Profile "${name}" created!`, "success");
};

// FIX 7: Get next Sunday at midnight
function getNextSunday(fromDate = Date.now()) {
    const date = new Date(fromDate);
    const day = date.getDay();
    const diff = day === 0 ? 0 : 7 - day; // Days until next Sunday
    date.setDate(date.getDate() + diff);
    date.setHours(0, 0, 0, 0); // Midnight
    return date.getTime();
}

// FIX 8: Update checkWeeklyReset to use Sunday reset
function checkWeeklyReset() {
    const now = Date.now();
    const nextSunday = getNextSunday(now);
    
    allAccounts.forEach(acc => {
        // Check if we've passed a Sunday since last reset
        if (now >= acc.lastWeeklyReset + (7 * 24 * 60 * 60 * 1000)) {
            const reward = calculateWeeklyReward(acc);
            
            const weeklyEntry = {
                weekEnding: new Date(acc.lastWeeklyReset + (7 * 24 * 60 * 60 * 1000)).toISOString(),
                rank: acc.weeklyRank,
                division: acc.weeklyDivision,
                coinsEarned: reward,
                bestRank: acc.weeklyRank,
                bestDivision: acc.weeklyDivision,
                highestRpThisWeek: acc.points
            };
            
            const currentRankIdx = Math.min(6, Math.floor(acc.points / 400));
            const currentRank = ranks[currentRankIdx];
            const currentDivision = Math.floor((acc.points % 400) / 100) + 1;
            
            weeklyEntry.bestRank = currentRank;
            weeklyEntry.bestDivision = currentDivision;
            
            if (acc.points > acc.highestRpEver) {
                acc.highestRpEver = acc.points;
            }
            
            acc.weeklyHistory.unshift(weeklyEntry);
            if (acc.weeklyHistory.length > 20) {
                acc.weeklyHistory = acc.weeklyHistory.slice(0, 20);
            }
            
            acc.coins += reward;
            acc.weeklyRank = currentRank;
            acc.weeklyDivision = currentDivision;
            acc.lastWeeklyReset = getNextSunday(acc.lastWeeklyReset);
            
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

// FIX 9: Update calculateWeeklyReward with correct values
function calculateWeeklyReward(acc) {
    const rankKey = acc.weeklyRank;
    const division = acc.weeklyDivision;
    
    if (rankKey === "Nightmare") {
        const baseReward = 2000000;
        const rpAbove2400 = Math.max(0, acc.points - 2400);
        const additionalReward = Math.floor(rpAbove2400 / 100) * 200000;
        return baseReward + additionalReward;
    }
    
    // Use division for Platinum and Diamond
    if (rankKey === "Platinum" || rankKey === "Diamond") {
        const rewardKey = `${rankKey}-${division}`;
        return WEEKLY_REWARDS[rewardKey] || 0;
    }
    
    return WEEKLY_REWARDS[rankKey] || 0;
}

// FIX 10: Saturday half-price shop
function buyItem(itemKey) {
    const acc = allAccounts[currentAccIdx];
    const item = SHOP_ITEMS[itemKey];
    
    if (!item) return false;
    
    // Check if it's Saturday (day 6)
    const today = new Date().getDay();
    const isSaturday = today === 6;
    const finalCost = isSaturday ? Math.floor(item.cost / 2) : item.cost;
    
    if (acc.coins < finalCost) {
        showNotification("Not enough coins!", "error");
        return false;
    }
    
    acc.coins -= finalCost;
    
    if (item.type === "permanent") {
        if (itemKey === "permanentCoinBoost") {
            acc.permanentCoinBoost *= item.coinMultiplier;
            showNotification(`Permanent coin boost increased to ${acc.permanentCoinBoost.toFixed(2)}x!${isSaturday ? ' (Saturday Sale!)' : ''}`, "success");
        } else {
            acc.permanentLuckBoost *= item.luckMultiplier;
            showNotification(`Permanent luck boost increased to ${acc.permanentLuckBoost.toFixed(2)}x!${isSaturday ? ' (Saturday Sale!)' : ''}`, "success");
        }
    } else if (item.type === "consumable") {
        acc.inventory[itemKey] = (acc.inventory[itemKey] || 0) + 1;
        showNotification(`Purchased ${item.name}!${isSaturday ? ' (Saturday Sale!)' : ''}`, "success");
    }
    
    save();
    updateUI();
    return true;
}

// FIX 11: Update shop display to show Saturday prices
window.openShop = () => {
    const acc = allAccounts[currentAccIdx];
    const shopList = document.getElementById('shop-list');
    const today = new Date().getDay();
    const isSaturday = today === 6;
    
    shopList.innerHTML = Object.entries(SHOP_ITEMS).map(([key, item]) => {
        const finalCost = isSaturday ? Math.floor(item.cost / 2) : item.cost;
        const canAfford = acc.coins >= finalCost;
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
                ${isSaturday ? '<div style="background:#fbbf24; color:#000; padding:4px 8px; border-radius:5px; display:inline-block; margin-bottom:8px; font-weight:bold; font-size:0.8rem;">🎉 SATURDAY SALE - 50% OFF!</div>' : ''}
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h4 style="margin:0; color:#fff;">${item.name}</h4>
                    <span style="color:#fbbf24; font-weight:bold;">
                        ${isSaturday && item.cost !== finalCost ? `<span style="text-decoration:line-through; opacity:0.5; margin-right:8px;">${item.cost.toLocaleString()}</span>` : ''}
                        ${finalCost.toLocaleString()} coins
                    </span>
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

// FIX 12: Add RP and bot rank to match logs
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
    
    const pIdx = Math.min(6, Math.floor(acc.points / 400));
    const bIdx = ranks.indexOf(currentBotRank);
    let rankMultiplier = 1.0;

    if (bIdx > pIdx) {
        rankMultiplier = win ? 1.5 : 0.75;
    } else if (bIdx < pIdx) {
        rankMultiplier = win ? 0.5 : 1.5;
    }

    const baseDiff = win ? 25 : 18;
    const diff = Math.round(baseDiff * ((0.5 + rollingWR) * adminRPBonus) * rankMultiplier);

    const oldRP = acc.points;
    if (win) acc.points += diff; else acc.points = Math.max(0, acc.points - diff);
    
    if (acc.points > acc.highestRpEver) {
        acc.highestRpEver = acc.points;
    }
    
    // Add RP and bot rank to history
    acc.history.unshift({ 
        res: win ? "WIN" : "LOSS", 
        score: `${playerSets}-${botSets}`, 
        p: playerRoll, 
        b: botRoll, 
        diff: diff,
        rp: oldRP,
        botRank: currentBotRank
    });
    if (acc.history.length > 50) acc.history.pop();

    playerSets = 0; botSets = 0;
    queueBot(); updateUI(); updateDots(); resetRound();
}
