// ======== CONFIGURATION =========
const SPREADSHEET_ID = '1pMDPXkSo7_lWcvQwtwsx55yGetNo-rytOYRqvGR9Us4';
const SHEET_NAME = 'ScrimData';

// Define team members
const TEAM_MEMBERS = [
  '</>メDEVA', '</>メwinter', '</>メYato', '</>メYob-Jak', '</>メzark', '</>メオ',
];

// ======== WEB APP INTERFACE =========
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('CYPHER Scrimmage Data Tracker')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Include CSS and JavaScript files
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ======== DATA OPERATIONS =========
function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Set up headers with new columns
    sheet.appendRow([
      'Date', 'Team Member', 'Role', 'Pokemon', 'Moveset 1', 'Moveset 2',
      'Damage Dealt', 'Damage Received', 'Recovery', 'Result', 'Opponent Team'
    ]);
  }
  return sheet;
}

// Save all player data at once
function saveScrimData(playersData) {
  try {
    const sheet = getSheet();
    const timestamp = new Date().toISOString(); // Common timestamp for all players
    
    // Process each player's data
    const rows = playersData.map(player => [
      timestamp,
      player.member || '', // This will contain either the selected member or the sub name
      player.role || '',
      player.pokemon || '',
      player.moveset1 || '',
      player.moveset2 || '',
      player.damageDealt || 0,
      player.damageReceived || 0,
      player.recovery || 0,
      player.matchResult || '',
      player.opponentTeam || ''
    ]);
    
    // Append all rows at once
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    return true;
  } catch (error) {
    Logger.log("Error saving data: " + error.toString());
    throw error; // Re-throw to inform client
  }
}

// Get team members for dropdown
function getTeamMembers() {
  return TEAM_MEMBERS;
}

// Get roles for dropdown
function getRoles() {
  return ['Attacker', 'All Rounder', 'Defender', 'Speedster', 'Support'];
}

// Get Pokémon based on the selected role
function getPokemonByRole(role) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(role);
    
    if (!sheet) {
      Logger.log("Sheet not found for role: " + role);
      return { pokemonList: [], movesetData: [] };
    }
    
    const data = sheet.getDataRange().getValues();
    
    // Skip header row, extract Pokemon names from column A
    const pokemonList = data.slice(1)
      .map(row => row[0])
      .filter(pokemon => pokemon && pokemon.trim() !== "");
    
    // Extract movesets (columns B-E)
    const movesetData = data.slice(1)
      .map(row => row.slice(1, 5))
      .filter((_, index) => pokemonList[index]); // Only include rows with Pokemon
    
    return { pokemonList, movesetData };
  } catch (error) {
    Logger.log("Error getting Pokemon: " + error.toString());
    return { pokemonList: [], movesetData: [] };
  }
}