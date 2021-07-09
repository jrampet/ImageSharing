function createDOM(link){
    var div = document.getElementById('new-link');
       div.setAttribute('href',link)
       div.setAttribute('target','_blank')
    div.hidden = false
    writeimage(link)
}
document.getElementById('new-link').hidden = true
var filename = ''
function addImages(){
    getFileUrl(filename);
  console.log(filename)
}
var fileSize;
function myLink(){
  window.location.href = "Gallery.html"
}
function writeimage(imagelink){
  var timeString = Date().toString
  console.log('write')
    db.collection("Images").add({
        imagelink:imagelink,
        fileSize:fileSize
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#userinfo').html('Images Added');
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
      createDOM(fileurl);
    })
    .catch(function(error) {
      console.log("error encountered",error);
    });
    }
 
  var file = document.getElementById("file-select");
   fileSize = file.size
  file.onchange = function() {
    if(this.files[0].size > 1200000){
       alert("Please select file size lesser than 1 MB!");
       this.value = "";
    };
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
  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
     console.log('Uploaded a blob or file!');
  }).then(function(){
     getFileUrl(filename)
  });
}