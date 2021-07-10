var id = getUrlParam('id','')
console.log(id)
query=db.collection("Images");
query.get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      var data=doc.data();

      console.log(doc.id, " => ", data);
      console.log(data["imagelink"]);
      var img = new Image();
      img.src = data["imagelink"]
      console.log(img.height)
      console.log(img.width)
      if(data["imagelink"]){
        $('#gallery').append(`

      <div class="gallery">
      <a target="_blank" href="image.html?id=${doc.id}">
        <img src="${data['imagelink']}" alt="" width="600" height="400">
      </a>
     
    </div>`);
      }
      
  });
}).then(function(){
    console.log('end');
});