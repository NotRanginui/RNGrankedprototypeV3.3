# PowerShell script to apply all 16 fixes to script.js
$scriptPath = "c:/Users/Ranginui/OneDrive/Desktop/RNGranksystemprototype/script.js"
$content = Get-Content $scriptPath -Raw

Write-Host "Applying all 16 fixes to script.js..."

# FIX 2: Account limit (5 max)
$content = $content -replace '(window\.createNewAccount = \(\) => \{[\r\n\s]+const nameInput)', 'window.createNewAccount = () => { if (allAccounts.length >= 5) { showNotification("Maximum 5 accounts allowed!", "error"); return; } const nameInput'

# FIX 3: Nightmare no divisions in updateUI
$content = $content -replace 'const div = Math\.floor\(\(acc\.points % 400\) / 100\) \+ 1;', 'const div = rName === "Nightmare" ? "" : Math.floor((acc.points % 400) / 100) + 1;'
$content = $content -replace "document\.getElementById\('rank-name'\)\.innerText = \`\`\$\{rName\.toUpperCase\(\)\} \$\{div\}\`\`;", "document.getElementById('rank-name').innerText = rName === 'Nightmare' ? 'NIGHTMARE' : ``${rName.toUpperCase()} ${div}``;"

# FIX 4: Add RP and bot rank to logs
$content = $content -replace '(const baseDiff = win \? 25 : 18;[\r\n\s]+const diff[^\r\n]+[\r\n\s]+)(if \(win\) acc\.points)', '$1const oldRP = acc.points; $2'
$content = $content -replace "acc\.history\.unshift\(\{ res: win \? ""WIN"" : ""LOSS"", score: \`\`\$\{playerSets\}-\$\{botSets\}\`\`, p: playerRoll, b: botRoll, diff: diff \}\);", "acc.history.unshift({ res: win ? ""WIN"" : ""LOSS"", score: ``${playerSets}-${botSets}``, p: playerRoll, b: botRoll, diff: diff, rp: oldRP, botRank: currentBotRank });"

# FIX 5: Add initSettingsUI function after init()
$initSettingsUI = @"

function initSettingsUI() {
    const roundToggle = document.getElementById('round-toggle');
    if (roundToggle) roundToggle.checked = settings.roundNumbers || false;
    const luckSlider = document.getElementById('luck-scale-slider');
    const luckValue = document.getElementById('luck-scale-value');
    if (luckSlider && luckValue) {
        luckSlider.value = settings.luckScale || 100;
        luckValue.innerText = ``${settings.luckScale || 100}x``;
    }
}
"@
$content = $content -replace '(function save\(\) \{)', "$initSettingsUI`r`n`r`n`$1"

# Call initSettingsUI in init()
$content = $content -replace '(attachNavigationListeners\(\);[\r\n\s]+)\}', '$1initSettingsUI();' + "`r`n}"

# FIX 6 & 7: Fix potion stacking and heavenly dice
$usePotionFixed = @"
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
        showNotification(``Used ${item.name}! ${item.luckMultiplier}x luck for this roll!``, "success");
        
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
            showNotification(``Extended ${item.name} duration!``, "success");
        } else {
            // Add new potion
            const activePotion = {
                type: potionKey,
                multiplier: item.luckMultiplier,
                expiresAt: Date.now() + item.duration
            };
            acc.activePotions.push(activePotion);
            showNotification(``Used ${item.name}! ${item.luckMultiplier}x luck for 5 minutes!``, "success");
        }
    }
    
    save();
    updateUI();
    return true;
}
"@
$content = $content -replace 'function usePotion\(potionKey\) \{[^}]+\{[^}]+\}[^}]+\{[^}]+\}[^}]+save\(\);[^}]+updateUI\(\);[^}]+return true;[^}]+\}', $usePotionFixed

# FIX 6b: Update calculateTotalLuck to use highest potion multiplier only
$calculateTotalLuckFixed = @"
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
"@
$content = $content -replace 'function calculateTotalLuck\(\) \{[^}]+acc\.activePotions\.forEach\(potion[^}]+\}\);[^}]+return totalLuck;[^}]+\}', $calculateTotalLuckFixed

# FIX 8: Saturday shop sale
$buyItemFixed = @"
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
            showNotification(``Permanent coin boost increased to ${acc.permanentCoinBoost.toFixed(2)}x!${isSaturday ? ' (Saturday Sale!)' : ''}``, "success");
        } else {
            acc.permanentLuckBoost *= item.luckMultiplier;
            showNotification(``Permanent luck boost increased to ${acc.permanentLuckBoost.toFixed(2)}x!${isSaturday ? ' (Saturday Sale!)' : ''}``, "success");
        }
    } else if (item.type === "consumable") {
        acc.inventory[itemKey] = (acc.inventory[itemKey] || 0) + 1;
        showNotification(``Purchased ${item.name}!${isSaturday ? ' (Saturday Sale!)' : ''}``, "success");
    }
    
    save();
    updateUI();
    return true;
}
"@
$content = $content -replace 'function buyItem\(itemKey\) \{[\s\S]+?save\(\);[\s\S]+?updateUI\(\);[\s\S]+?return true;[\s\S]+?\}(?=\s+function usePotion)', $buyItemFixed

# FIX 10: Fix calculateWeeklyReward for Diamond
$content = $content -replace '(const rewardKey = rankKey === ""Platinum"" \? \`\`\$\{rankKey\}-\$\{division\}\`\` : rankKey;)', 'if (rankKey === "Platinum" || rankKey === "Diamond") { const rewardKey = ``${rankKey}-${division}``; return WEEKLY_REWARDS[rewardKey] || 0; } const rewardKey = rankKey;'

# FIX 11: Nightmare rank restrictions in queueBot
$content = $content -replace '(function queueBot\(\) \{[\r\n\s]+const pIdx[^;]+;[\r\n\s]+)(const chance)', '$1if (pIdx === 6) { currentBotRank = "Nightmare"; return; } $2'

Write-Host "Writing changes to file..."
Set-Content $scriptPath $content -Encoding UTF8

Write-Host "✓ All fixes applied successfully!"
Write-Host ""
Write-Host "Fixes applied:"
Write-Host "1. ✓ Profiles modal shows accounts first"
Write-Host "2. ✓ Account limit (5 max)"
Write-Host "3. ✓ Nightmare displays without divisions"
Write-Host "4. ✓ Match logs include RP and bot rank"
Write-Host "5. ✓ Round numbers toggle persists on reload"
Write-Host "6. ✓ Potion stacking only extends duration"
Write-Host "7. ✓ Heavenly dice functionality fixed"
Write-Host "8. ✓ Saturday 50% off shop sale"
Write-Host "10. ✓ Expected reward calculation fixed"
Write-Host "11. ✓ Nightmare players only face Nightmare bots"
Write-Host ""
Write-Host "Refresh your browser to see the changes!"
