# Testing the Emerald Cutscene

## Steps to Test:

1. **Refresh the page** (Ctrl+F5 or Cmd+Shift+R)

2. **Open Browser Console**:
   - Press F12
   - Click on "Console" tab

3. **Run this command**:
   ```javascript
   testEmeraldCutscene()
   ```

4. **Expected Result**:
   - The cutscene should start immediately
   - You'll see a green forest background (or gradient if image doesn't load)
   - Text messages will appear and fade away
   - After 10 seconds, screen turns red and shakes
   - White flash
   - Black screen
   - Final "PROMOTED TO EMERALD" reveal

## If You Get Errors:

### Error: "testEmeraldCutscene is not defined"
**Solution**: The script.js file hasn't loaded yet. Wait a moment and try again.

### Error: "Cannot read properties of null"
**Solution**: The HTML elements aren't ready. Make sure the page has fully loaded.

## Alternative Test Method:

If the test function doesn't work, you can trigger it directly:

```javascript
playEmeraldCutscene('Emerald')
```

## To Trigger Naturally in Game:

1. Open Admin Panel (press 'P' key or click Settings → Admin Terminal)
2. Set RP to 2000 or higher
3. Click "APPLY & RESET SETS"
4. The next time you rank up to Emerald, the cutscene will play

## Troubleshooting:

If the cutscene still doesn't show:
1. Check browser console for any red error messages
2. Make sure you've refreshed the page after the latest changes
3. Try opening the page in a different browser
4. Make sure JavaScript is enabled in your browser
