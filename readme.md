# ISRC Parser

Contains functions for reading and parsing ISRCs (International Standard Recording Code).

1. isrcParser(isrc) - converts flat isrc string to js object
2. isrcToString(isrc) - converts js object to flat isrc string; reverses isrcParser(isrc)
3. isrcGenerate(country, registrant, year, existingIsrcs) - generates new js object with auto-incremented isrc designator
4. isrcValidate(isrc) - returns true if parameter passes regex
