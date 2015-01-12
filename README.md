# xml.js-Output-Wrapper
TypeScript/JavaScript wrapper for the output of xml.js. Makes it machine-processible by parsing every error into an array entry.

## Usage
```javascript
// xmlData and schemaData are Strings
var Module = {
  xml: xmlData,
  schema: schemaData,
  arguments: ["--noout", "--schema", schemaFileName, xmlFileName]
};
 
//and call function
var xmllint = validateXML(Module);

// Parameter xmlFileName must match Module.arguments[3]
var lintProcessor = new XmlLintProcessor(xmllint, xmlFileName);

// Is XML valid?
lintProcessor.isXmlValid();

// Get parsed lines as array
lintProcessor.getParsedLines();
```

## Credits
xmllint by @syssgx
xml.js by @kripken.

##Licence
MIT-Licence
