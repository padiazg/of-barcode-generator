# OpenFaaS - Barcode generator

Do you need to generate barcodes or qr codes? This function can generate a lot of them.

This is a port of [barcode-generator](https://github.com/padiazg/barcode-generator)

>This project uses [bwip-js](https://github.com/metafloor/bwip-js).  
bwip-js is a translation to native JavaScript of the amazing code provided in [Barcode Writer in Pure PostScript](https://github.com/bwipp/postscriptbarcode). The translated code can run on any modern browser or JavaScript-based server framework.

## Build locally

1. Clone this repository
```bash
$ git clone https://github.com/padiazg/of-barcode-generator.git
```
2. Replace "padiazg/" prefix from Docker Hub in stack.yml with your own account

3. Build/deploy
Create new function, make sure to specify ```barcode``` as the name of your function.
```bash
$ faas-cli new barcode --lang node
```
Now you can build/deploy
```bash
faas-cli build && faas-cli deploy
```

## Use directly from Docker Hub
[of-barcode-generator](https://hub.docker.com/r/padiazg/of-barcode-generator/)
1. Create deploy.yml
```yml
provider:
  name: faas
  gateway: http://127.0.0.1:8080

functions:
  barcode-generator:
    image: padiazg/of-barcode-generator
    environment:
      write_timeout: 10s
      read_timeout: 10s
```
2. Deploy with faas-cli
Deploy your function using faas-cli
```bash
faas-cli deploy
```

## Parameters:
Parameters must be passed in x-www-form-urlencoded format:  
Sample:
```
bcid=qrcode&text=Hello+world+from+OpenFaaS!
```

Examples:  
#### QueryString
```bash
# GET
$ curl -X GET \
    https://padiazg.o6s.io/barcode-generator?bcid=qrcode&text=Hello+from+OpenFaas+Cloud

# POST
$ curl -X POST \
    https://padiazg.o6s.io/barcode-generator?bcid=qrcode&text=Hello+from+OpenFaas+Cloud
```
#### Body
```bash
# Body
$ curl -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "bcid=qrcode&text=hola+mundo!!" \
    https://padiazg.o6s.io/barcode-generator
```

Specific from this project:
* **base64**: Optional, not part of the modules parameters. Tells the function that we want the ouput encoded in base64. Defaults tu ```false```.

Specific from bwip-js
* **bcid**: The requested code. *required*  
Look [here](https://github.com/bwipp/postscriptbarcode/wiki/Symbologies-Reference) a reference of which codes can be generated.  
Search the symbol you are interested in, go into the page (Ex: let´s say ```EAN-13``` as example) and search the ```Encoder:``` value (ean13 in this example). This value is what we need pass as ```bcid```'s value.

* **text**: The value to represent. *required*. Look at the [reference](https://github.com/bwipp/postscriptbarcode/wiki/Symbologies-Reference) to know what's the format for each symbol.

* **scaleX**: The x-axis scaling factor. Must be an integer > 0. Default is 2.

* **scaleY**: The y-axis scaling factor. Must be an integer > 0. Default is scaleX.

* **scale**: Sets both the x-axis and y-axis scaling factors. Must be an integer > 0.

* **rotate**: Allows rotating the image to one of the four orthogonal orientations. A string value. Must be one of:

    + "N" : Normal (not rotated). The default.  
    + "R" : Clockwise (right) 90 degree rotation.  
    + "L" : Counter-clockwise (left) 90 degree rotation.  
    + "I" : Inverted 180 degree rotation.   

* **paddingwidth**: Sets the left and right padding (in points/pixels) around the rendered barcode. Rotates and scales with the image.

* **paddingheight**: Sets the top and bottom padding (in points/pixels) around the rendered barcode. Rotates and scales with the image.

* **monochrome**: Sets the human-readable text to render in monochrome. Boolean true or false. Default is false which renders 256-level gray-scale anti-aliased text.

There are more options specific from BWIPP, and they are documented in the  [BWIPP wiki](https://github.com/bwipp/postscriptbarcode/wiki). You need to consult there to determine what options are available for each barcode type.

## Supported Barcode Types
*  auspost : AusPost 4 State Customer Code    
*  azteccode : Aztec Code    
*  azteccodecompact : Compact Aztec Code    
*  aztecrune : Aztec Runes    
*  bc412 : BC412    
*  channelcode : Channel Code    
*  codablockf : Codablock F    
*  code11 : Code 11    
*  code128 : Code 128    
*  code16k : Code 16K    
*  code2of5 : Code 25    
*  code32 : Italian Pharmacode    
*  code39 : Code 39    
*  code39ext : Code 39 Extended    
*  code49 : Code 49    
*  code93 : Code 93    
*  code93ext : Code 93 Extended    
*  codeone : Code One    
*  coop2of5 : COOP 2 of 5    
*  daft : Custom 4 state symbology    
*  databarexpanded : GS1 DataBar Expanded    
*  databarexpandedcomposite : GS1 DataBar Expanded Composite    
*  databarexpandedstacked : GS1 DataBar Expanded Stacked    
*  databarexpandedstackedcomposite : GS1 DataBar Expanded Stacked Composite    
*  databarlimited : GS1 DataBar Limited    
*  databarlimitedcomposite : GS1 DataBar Limited Composite    
*  databaromni : GS1 DataBar Omnidirectional    
*  databaromnicomposite : GS1 DataBar Omnidirectional Composite    
*  databarstacked : GS1 DataBar Stacked    
*  databarstackedcomposite : GS1 DataBar Stacked Composite    
*  databarstackedomni : GS1 DataBar Stacked Omnidirectional    
*  databarstackedomnicomposite : GS1 DataBar Stacked Omnidirectional Composite    
*  databartruncated : GS1 DataBar Truncated    
*  databartruncatedcomposite : GS1 DataBar Truncated Composite    
*  datalogic2of5 : Datalogic 2 of 5    
*  datamatrix : Data Matrix    
*  datamatrixrectangular : Data Matrix Rectangular    
*  dotcode : DotCode    
*  ean13 : EAN-13    
*  ean13composite : EAN-13 Composite    
*  ean14 : GS1-14    
*  ean2 : EAN-2 (2 digit addon)    
*  ean5 : EAN-5 (5 digit addon)    
*  ean8 : EAN-8    
*  ean8composite : EAN-8 Composite    
*  flattermarken : Flattermarken    
*  gs1-128 : GS1-128    
*  gs1-128composite : GS1-128 Composite    
*  gs1-cc : GS1 Composite 2D Component    
*  gs1datamatrix : GS1 Data Matrix    
*  gs1datamatrixrectangular : GS1 Data Matrix Rectangular    
*  gs1northamericancoupon : GS1 North American Coupon    
*  gs1qrcode : GS1 QR Code    
*  hanxin : Han Xin Code    
*  hibcazteccode : HIBC Aztec Code    
*  hibccodablockf : HIBC Codablock F    
*  hibccode128 : HIBC Code 128    
*  hibccode39 : HIBC Code 39    
*  hibcdatamatrix : HIBC Data Matrix    
*  hibcdatamatrixrectangular : HIBC Data Matrix Rectangular    
*  hibcmicropdf417 : HIBC MicroPDF417    
*  hibcpdf417 : HIBC PDF417    
*  hibcqrcode : HIBC QR Code    
*  iata2of5 : IATA 2 of 5    
*  identcode : Deutsche Post Identcode    
*  industrial2of5 : Industrial 2 of 5    
*  interleaved2of5 : Interleaved 2 of 5 (ITF)    
*  isbn : ISBN    
*  ismn : ISMN    
*  issn : ISSN    
*  itf14 : ITF-14    
*  japanpost : Japan Post 4 State Customer Code    
*  kix : Royal Dutch TPG Post KIX    
*  leitcode : Deutsche Post Leitcode    
*  matrix2of5 : Matrix 2 of 5    
*  maxicode : MaxiCode    
*  micropdf417 : MicroPDF417    
*  microqrcode : Micro QR Code    
*  msi : MSI Modified Plessey    
*  onecode : USPS Intelligent Mail    
*  pdf417 : PDF417    
*  pdf417compact : Compact PDF417    
*  pharmacode : Pharmaceutical Binary Code    
*  pharmacode2 : Two-track Pharmacode    
*  planet : USPS PLANET    
*  plessey : Plessey UK    
*  posicode : PosiCode    
*  postnet : USPS POSTNET    
*  pzn : Pharmazentralnummer (PZN)    
*  qrcode : QR Code    
*  rationalizedCodabar : Codabar    
*  raw : Custom 1D symbology    
*  royalmail : Royal Mail 4 State Customer Code    
*  sscc18 : SSCC-18    
*  symbol : Miscellaneous symbols    
*  telepen : Telepen    
*  telepennumeric : Telepen Numeric    
*  ultracode : Ultracode    
*  upca : UPC-A    
*  upcacomposite : UPC-A Composite    
*  upce : UPC-E    
*  upcecomposite : UPC-E Composite
