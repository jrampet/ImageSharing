var refId;
function createDOM(link){
    var div = document.getElementById('new-link');
       div.setAttribute('href',link)
       div.setAttribute('target','_blank')
        div.hidden = false
}
document.getElementById('new-link').hidden = true
var filename = '';
var fileSize;
var fileExtension=''
var imageWidth;
var imageHeight;

function addImages(){
    getFileUrl(filename);
  console.log(filename)
}
var fileSize;
function myLink(){
  window.location.href = "gallery.html"
}
function writeimage(imagelink){
  var timeString = ""+Date.now()
  console.log('write')
    db.collection("Images").add({
        imagelink:imagelink,
        fileSize:fileSize,
        width: imageWidth,
        height:imageHeight,
        name:fileName,
        timeStamp:timeString
    })
    .then(function(docRef) {
         refId = docRef.id
        console.log("Document written with ID: ", refId);
        $('#userinfo').html('Images Added');
        let pageUrl = "image.html?id="+refId;
        createDOM(pageUrl);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref('Images/'+filename);
    
    //get file url
    storage
    .getDownloadURL()
    .then(function(url) {
      fileurl=url;
      console.log(fileurl);
     writeimage(fileurl)
    })
    .catch(function(error) {
      console.log("error encountered",error);
    });
    }
 
  var file = document.getElementById("file-select");
   fileSize = file.size
  file.onchange = function() {
  let choosenFile = this.files[0]
    if(choosenFile.size > 1200000){
       alert("Please select file size lesser than 1 MB!");
       this.value = "";
    };
    console.log(choosenFile)
    fileName = choosenFile.name
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    console.log(extFile)
    if (extFile != "jpg" && extFile != "jpeg" && extFile != "png"){
      alert("Only jpg/jpeg and png files are allowed!");
      this.value = ""
    }else{
      var img = new Image();
      img.src = window.URL.createObjectURL(choosenFile);
      img.onload = function() 
      {
          imageWidth = this.naturalWidth,
          imageHeight = this.naturalHeight;
       
      };
    }
};

function uploadFile(){

    var div = document.getElementById('new-link');
    div.hidden = true

  // Created a Storage Reference with root dir
  var storageRef = firebase.storage().ref();
  // Get the file from DOM
  var file = document.getElementById("file-select").files[0];
  console.log(file.name);
  
  //dynamically set reference to the file name
  var thisRef = storageRef.child('Images/'+file.name);
      filename=file.name;
      fileSize = file.size
  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
     console.log('Uploaded a blob or file!');
  }).then(function(){
     getFileUrl(filename)
  });
}