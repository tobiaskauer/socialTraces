

$(document).ready(function() {
  //assign unique classes to every word on the page
  let wordCount = 0 //global word count, used in trace ids
  
  $(".traceable").contents().each(function() {
    scanChildrenForText(this)
    function scanChildrenForText(node) {

      if(node.nodeType === 3 ) {//target all text only nodes
        let words = $(node).text().split(" ").filter(word => word.trim()) //filter empty strings, linebreaks, etc
        
        $(node).replaceWith(function() {
          let str = ""
          words.forEach((word,i) => {
            str += `<span class="trace-${wordCount}">${word}</span>`
            str += i < words.length ? " " : ""
            wordCount++
          })
          return str
        })

      } else {
        //if node has not just text in it (e.g. is a <h2> or <ul>, scan for childen recursively) 
        $(node).contents().each(function() {  
          scanChildrenForText(this) 
        })
        
      }
    }
  })


  


  //Get trace records from API and transform them into styling
  $.ajax({
    type: "GET",
    url: 'http://localhost:8080/api/trace/',
    //data: {traces: idArray},
    success: function(response) {createTraceStyles(response)},
    dataType: "json"
  });
})

const createTraceStyles = (traces) => {
  let styleStrings = traces.map(trace => {
    
    let str = `.trace-${trace.source} {  -webkit-filter:`
    //str += trace.hover ? `border-top: ${trace.hover}px solid red;`  : ""
    str += trace.hover ? `drop-shadow( 0px 0px 10px rgba(0, 0, 255, 1))`  : ""
    str += trace.click ? `drop-shadow( 0px 0px 20px rgba(255, 0, 0, 1))`  : ""
    //str += trace.click ? `border-bottom: ${trace.click}px solid green;`  : ""
    str += "}"
    return str
  })

  console.log()


var styleTag = $('<style>'+styleStrings.join("\n")+'</style>')
$('html > head').append(styleTag);
}


// POC getting span ids from selection and/or clicking
function getSelectionHtml() {
  var html = "";
  if (typeof window.getSelection != "undefined") {
      var sel = window.getSelection();
      if (sel.rangeCount) {
          var container = document.createElement("div");
          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
              container.appendChild(sel.getRangeAt(i).cloneContents());
          }
          html = container.innerHTML;
      }
  } else if (typeof document.selection != "undefined") {
      if (document.selection.type == "Text") {
          html = document.selection.createRange().htmlText;
      }
  }
  return html;
}



const mouse = {
  down: false,
  move: false,
}

document.addEventListener('mousedown', (e) => {
  let traceId = getTraceId(e.target.className)
  if(traceId) idBuffer.push(({source: traceId, event: 'click'}))
})

document.addEventListener('mouseover', (e) => {
  let traceId = getTraceId(e.target.className)
  if(traceId) idBuffer.push(({source: traceId, event: 'hover'}))
 
})

document.addEventListener('mouseup', function(){
  var selectedHTML = getSelectionHtml();
  if( selectedHTML ) {
    var matchedIds = [...selectedHTML.matchAll(/unique\d*/g)]
    var ids = matchedIds.map(match => match[0])
    console.log(ids) //select
  } else {
    
  }
 

  //problem: does not work for single selected words

});

let idBuffer = []
setInterval(() => {
    sendAPI(idBuffer)
},5000)
window.addEventListener("beforeunload", function (e) {
  sendAPI(idBuffer)
})


const getTraceId = (string) => {
  if(!string) return false
  let classNames = string.split(" ").filter(className => className.startsWith("trace-"))
  if(classNames.length  == 0) return false
  let id = classNames[0].split("trace-")[1]
  return id
}

const sendAPI = (idArray) => {
  if(idArray.length > 0) {
    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/api/trace/',
      data: {traces: idArray},
      //success: function(data,status) {console.log(data,status)},
      dataType: "json"
    });
    idBuffer.length = 0
  }
}