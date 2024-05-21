// Validate ISRC string
function isrcValidate(isrc) {
    const isrcRegex = new RegExp(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/);
    // Return boolean
    return isrcRegex.test(isrc);
};

// Parse incoming flat ISRC
function isrcParser(isrc) {
    if (!isrcValidate(isrc)) throw new Error("Invalid 'isrc'.");
    // Return object
    return {
        country: isrc.slice(0, 2),
        registrant: isrc.slice(2, 5),
        year: Number(isrc.slice(5, 7)),
        designation: Number(isrc.slice(7, 12))
    };
};

// Parse ISRC object to flat string
function isrcToString(isrc) {
    if (typeof isrc !== "object" || Array.isArray(isrc) || isrc === null) throw new Error("Parameter should be an object.");
    // Return string
    return `${isrc.country}${isrc.registrant}${isrc.year}${isrc.designation.toString().padStart(5, "0")}`
}

// Generate new ISRC object
function isrcGenerate(country, registrant, year, existingIsrcs) {
    // Error handling
    if (!Array.isArray(existingIsrcs)) throw new Error("Parameter should be an array.");
    // Create temporary sorted array with all ISRCs that match params
    let existingIsrcsSorted = [];
    existingIsrcs.forEach(e => {
        let parsedIsrc = isrcParser(e);
        if (parsedIsrc.country === country && parsedIsrc.registrant === registrant && parsedIsrc.year === year) {
            existingIsrcsSorted.push(parsedIsrc.designation);
        };
    });
    // Increment designation
    let designation = Number(Math.max(...existingIsrcsSorted)) + 1;
    if (designation > 99999) throw new Error("Max designation reached.")
    // Return object
    return {
        country: country,
        registrant: registrant,
        year: year,
        designation: designation,
    };
};

// Dummy data
let isrcValid = "QZZDS2400001";
let isrcInvalid = "QZZDS240000A";

let existingIsrcs = ["QZZDS2400001","QZZDS2400002","QZZDS2499998"]
let currentYear = Number(new Date().getFullYear().toString().slice(2, 4));

// Run
// isrcGenerate("QZ", "ZDS", currentYear, existingIsrcs)
// isrcParser(isrcValid)
// console.log(isrcGenerate("QZ", "ZDS", currentYear, existingIsrcs))
