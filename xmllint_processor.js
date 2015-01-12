var XmlLintProcessor = (function () {
    function XmlLintProcessor(xmllintOutput, xmlFileName) {
        this._xmlFileName = xmlFileName;
        this._xmlIsValid = false;
        this._parsedLines = [];
        this._rawLines = xmllintOutput.split(/\r?\n/);
        this.parseLines();
    }
    XmlLintProcessor.prototype.parseLines = function () {
        var linesLength = this._rawLines.length;
        var lineBuffer = this._rawLines[0];
        var splitVal = '';
        for (var i = 1; i < linesLength; i++) {
            var splitVal = this._rawLines[i];
            if (splitVal.indexOf(this._xmlFileName) !== -1) {
                this._parsedLines.push(this.escapeHTML(lineBuffer));
                lineBuffer = splitVal;
            } else {
                lineBuffer += splitVal;
            }
        }

        // last line
        this._parsedLines.push(this.escapeHTML(lineBuffer));

        if ((this._parsedLines.length > 0) && (this._parsedLines[0].indexOf('validates') !== -1)) {
            this._xmlIsValid = true;
        }
    };

    XmlLintProcessor.prototype.escapeHTML = function (escapeMe) {
        return escapeMe.replace(/\^/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    XmlLintProcessor.prototype.isXmlValid = function () {
        return this._xmlIsValid;
    };

    XmlLintProcessor.prototype.getParsedLines = function () {
        return this._parsedLines;
    };
    return XmlLintProcessor;
})();
//# sourceMappingURL=xmllint_processor.js.map
