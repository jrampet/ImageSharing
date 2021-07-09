

query=db.collection("Images");
query.get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      var data=doc.data();

      console.log(doc.id, " => ", data);
      $('#gallery').append(`

      <div class="gallery">
      <a target="_blank" href="${data['imagelink']}">
        <img src="${data['imagelink']}" alt="" width="600" height="400">
      </a>
     
    </div>`);
  });
}).then(function(){
    console.log('end');
});