function doGet(e) {
  // Retrieve and process any URL parameters, as necessary.
  //In the case below all parameters will be acepted and give the same result, you may want to update here if you want
  if (e.parameter.edit == "form" && e.parameter.entry) {
    return EditEntry(e.parameter.entry);
      LoadPage();    
  } else {
    return LoadPage();
  }
    
}




function LoadPage() {
  var template = HtmlService.createTemplateFromFile('index');
  
  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
    .setTitle('</>メ Scrim Data Tracker')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setFaviconUrl('https://drive.google.com/uc?id=1XdGewIuGNh3_OIScHw0jicjuHuFOvqv3&export=download&format=png')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}