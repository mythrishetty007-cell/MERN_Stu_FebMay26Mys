// Assignment 3
function mergeSettings(savedSettingsJSON, defaultSettings) {
    let savedSettings = JSON.parse(savedSettingsJSON);
    let merged = {};
    for (let key in defaultSettings) {
        merged[key] = defaultSettings[key];
    }
    for (let key in savedSettings) {
        merged[key] = savedSettings[key];
    }
    let mergedJSON = JSON.stringify(merged);
    return {
        mergedObject: merged,
        mergedJSON: JSON.stringify(merged)
    };
}
let defaultSettings = {
    a:1,b:2,c:3
};
let savedSettingsJSON = `{"b":10,"c":20}`;
let result = mergeSettings(savedSettingsJSON,defaultSettings);
console.log(result);