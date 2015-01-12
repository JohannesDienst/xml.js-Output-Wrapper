class XmlLintProcessor
{

  _rawLines: Array<string>;
  _parsedLines: Array<string>;
  _xmlIsValid: boolean;
  _xmlFileName: string;

  constructor(xmllintOutput: string, xmlFileName: string)
  {
    this._xmlFileName = xmlFileName;
    this._xmlIsValid = false;
    this._parsedLines = [];
    this._rawLines = xmllintOutput.split(/\r?\n/);
    this.parseLines();
  }

  private parseLines(): void
  {
    var linesLength = this._rawLines.length;
    var lineBuffer = this._rawLines[0];
    var splitVal = '';
    for (var i = 1; i < linesLength; i++)
    {
      var splitVal = this._rawLines[i];
      if (splitVal.indexOf(this._xmlFileName) !== -1)
      {
        this._parsedLines.push(this.escapeHTML(lineBuffer));
        lineBuffer = splitVal;
      }
      else
      {
        lineBuffer += splitVal;
      }
    }

    // last line
    this._parsedLines.push(this.escapeHTML(lineBuffer));

    if ( (this._parsedLines.length > 0) && (this._parsedLines[0].indexOf('validates') !== -1))
    {
      this._xmlIsValid = true;
    }
  }

  private escapeHTML(escapeMe): string
  {
    return escapeMe.replace(/\^/g, '').
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;');
  }

  public isXmlValid(): boolean
  {
    return this._xmlIsValid;
  }

  public getParsedLines(): Array<string>
  {
    return this._parsedLines;
  }
}