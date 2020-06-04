$(document).ready(function () {
    $('#container').layout({
        //  applyDefaultStyles: true 
        south__size: .40,
        west__size: .38,
        east__size: .23
    });
});

var javascript = document.getElementById("javascript"),
    code = document.getElementById("code"),
    css = document.getElementById("css"),
    html = document.getElementById("html");

var htmlCode = CodeMirror(html, {
    lineNumbers: true,
    value: '<div id="a"></div>',
    mode:  "text/html",
    lineWrapping: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    });
var javascriptCode = CodeMirror(javascript, {
    lineNumbers: true,
    value: "console.log('')\n",
    mode:  "javascript",
    lineWrapping: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
  });
var cssCode = CodeMirror(css, {
    lineNumbers: true,
    value: "*{\n  margin: 0;\n  padding: 0;\n}\n#a{\n  margin-left: 10px;\n  color: red;\n}\n",
    mode:  "css",
    lineWrapping: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
  });

function compile() {
    var compile_code = code.contentWindow.document;
    document.body.onkeyup = function() {
      console.clear();
      compile_code.open();
      compile_code.writeln(
        htmlCode.getValue() +
          "<style>" +
          cssCode.getValue() +
          "</style>" +
          "<script>" +
          javascriptCode.getValue() +
          "</script>"
      );
      compile_code.close();
    };
  }
  compile();

function setting(){
    htmlCode.setOption("theme","base16-dark");
    javascriptCode.setOption("theme","base16-dark");
    cssCode.setOption("theme","base16-dark");
}

function jsLibrary(library){
  var element = htmlCode.getValue();
  if(library!=""){
    htmlCode.setOption("value",`${element}\n<script src="${library}"></script>`);
    var x = document.getElementById("snackbar");
    if(library=='js/jquery-3.5.1.min.js'){
      x.className = "";
    }else{
      var s = library.split("/");
      var s1 = s[1].split(".");
      x.className = "show";
      x.innerHTML = `Import ${s1[0]} css file also`;
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
  }
}

function cssLibrary(library){
  var element = htmlCode.getValue();
  if(library!=""){
    htmlCode.setOption("value",`<link rel="stylesheet" href="${library}">\n${element}`);
    var x = document.getElementById("snackbar");
    var s = library.split("/");
    var s1 = s[1].split(".");
    x.className = "show";
    x.innerHTML = `Import ${s1[0]} js file also`;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
