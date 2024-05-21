// Parse incoming flat ISRC
function isrcParser(isrc) {
    let parsedIsrc = {
        country: isrc.slice(0, 2),
        registrant: isrc.slice(2, 5),
        year: Number(isrc.slice(5, 7)),
        designation: Number(isrc.slice(7, 12))
    };
    return parsedIsrc;
};

// Parse ISRC object to flat string
function isrcToString(isrc) {
    if (typeof isrc !== "object" || Array.isArray(isrc) || isrc === null) {
        return console.log("Error; 'isrc' should be an object.")
    };
    let isrcString = isrc.country + isrc.registrant + isrc.year + isrc.designation.toString().padStart(5, "0");
    return isrcString;
}

// Generate new ISRC object
function isrcGenerate(country, registrant, year, existingIsrcs) {
    // Error handling
    if (!Array.isArray(existingIsrcs)) {
        return console.log("Error; 'existingIsrcs' should be an array.")
    };
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
    // Define object
    const newIsrc = {
        country: country,
        registrant: registrant,
        year: year,
        designation: designation,
    };
    // Write ISRC as string
    let newIsrcString = isrcToString(newIsrc);
    // Log in console
    console.log(newIsrc);
    console.log(newIsrcString)
};

// Dummy data
let isrc = "QZZDS2400001";
let existingIsrcs = ["QZZDS2400001","QZZDS2400002","QZZDS2400003"]
let currentYear = Number(new Date().getFullYear().toString().slice(2, 4));

// Run
isrcGenerate("QZ", "ZDS", currentYear, existingIsrcs)