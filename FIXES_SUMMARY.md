# Comprehensive Fixes Applied to Crimson RNG

## Issues Fixed:

### 1. ✅ Round Numbers Toggle Persistence
- **Issue**: Toggle doesn't persist on reload
- **Fix**: Initialize UI from saved settings on load

### 2. ✅ Heavenly Dice Functionality
- **Issue**: Heavenly dice not working
- **Fix**: Corrected single-use potion logic to properly multiply luck temporarily

### 3. ✅ Potion Stacking
- **Issue**: Multiple potions stack multipliers
- **Fix**: Changed to only extend duration, use highest multiplier (no stacking)

### 4. ✅ Profile Modal
- **Issue**: Shows create form first
- **Fix**: Shows existing accounts list first, create option available

### 5. ✅ Account Limit
- **Issue**: No limit on accounts
- **Fix**: Maximum 5 accounts (existing accounts grandfathered)

### 6. ✅ Nightmare Divisions
- **Issue**: Nightmare has divisions
- **Fix**: Nightmare displays without division number

### 7. ✅ Nightmare Luck Scaling
- **Issue**: Luck doesn't scale in Nightmare
- **Fix**: Progressive luck multiplier based on RP in Nightmare rank

### 8. ✅ Nightmare Rank Restriction
- **Issue**: Can play lower ranks in Nightmare
- **Fix**: Force Nightmare players to only face Nightmare bots

### 9. ✅ Match Logs Enhancement
- **Issue**: Logs missing RP and bot rank
- **Fix**: Added current RP and bot rank to each match log entry

### 10. ✅ Stats Display
- **Issue**: Incorrect rank displayed
- **Fix**: Corrected rank calculation in stats modal

### 11. ✅ Weekly Reset Timing
- **Issue**: Different reset times per account
- **Fix**: All accounts reset on Sunday at midnight

### 12. ✅ Expected Reward Calculation
- **Issue**: Shows 50k for all ranks
- **Fix**: Correctly calculates based on current rank and division

### 13. ✅ Saturday Shop Sale
- **Issue**: No special pricing
- **Fix**: All items 50% off on Saturdays

### 14. ✅ 100 Streak Cutscene
- **Issue**: No special cutscene for 100 streak
- **Fix**: Added epic cutscene similar to Nightmare promotion

### 15. ✅ Dynamic Nightmare Difficulty
- **Issue**: Static bot difficulty
- **Fix**: Bot luck scales with player's Nightmare RP

### 16. ✅ Luck Scaling System
- **Issue**: Scaling slider doesn't work properly
- **Fix**: Corrected scaling calculation and UI updates

## Implementation Notes:

- All fixes maintain backward compatibility
- Existing save data is preserved
- Accounts with >5 profiles keep them but can't create more
- Sunday reset uses timezone-aware midnight calculation
- Nightmare rank now shows as "NIGHTMARE" without division numbers
- Progressive luck in Nightmare: base 2.0x + (RP-2400)/100 * 0.1x
- Bot difficulty in Nightmare scales from 80x to 300x based on player RP
