var id = getUrlParam('id','')
console.log(id)
query=db.collection("Images");
query.get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      if(doc.id == id){
        var data=doc.data();
        $('#uploadedimage').append(`

        <div class="gallery">
        <a target="_blank" href="${data['imagelink']}">
          <img src="${data['imagelink']}" alt="" width="600" height="400">
        </a>
        <br>
        File Name : ${ data['name'].substr(0, data['name'].lastIndexOf("."))}<br>
        File Size : ${bytesToSize(data['fileSize'])}<br>
        Dimension : ${data['width']} x ${data['height']}<br>
        File Type : ${ data['name'].substr(data['name'].lastIndexOf(".") + 1, data['name'].length).toLowerCase()}

      </div>`)

        console.log(data["imagelink"]);
        return
      }
     

  
  
      
  });
}).then(function(){
    console.log('end');
});

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }