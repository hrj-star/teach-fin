
/*

<% users.forEach(function(item,index){ %>
    <li> <%= item.username %> </li>
    <li> <%= item.points %> </li>
    <li> <%= item.dailycheckin %> </li>
<% }) %>


// update records 


  const User=require("./models/users");
            function updateRecord(req, res) {
                    User.findOne({username:user.username},(err,doc)=>{
                     //this will give you the document what you want to update.. then 
                    doc.dailycheckin= user.dailycheckin+10; //so on and so forth
                    
                    // then save that document
                    doc.save(callback);
                    
                    });
                    
                    }



*/
                  
      
        
          function updatedailycheckin(usernames,dailycheckins){
          var dbo = require('database.js');
          
          var myquery = { username: usernames };
          var newvalues = { 
          $set: {
              dailycheckin: dailycheckins+10 
            } };
          dbo.collection("users").updateOne(myquery, 
          newvalues, function(err, res) {
            if (err) throw err;
            
          console.log("Updated ckeckin points ");
            
       
          });


      }
        
    
    




      <!--
      <script src="https://code.jquery.com/jquery-3.2.1.min.js">
      $(function() {
        
              var id =$("#username").val();
              var data = {
                  username: $("#username").val(),
                  points: $("#totalscore").val()
              }
              $.ajax({
                  method: "PUT",
                  url: '/miniage/' + id + "?_method=PUT",
                  dataType: 'json',
                  data: data
              }).success(function(data){
                  updateData.append("<p>Response: Data saved!</p>");
                  console.log("Successful!" + data);
              }).fail(function(data){
                  console.log("Oops not working" + data);
              });
          
      })
  </script>
  
  -->


  /*

        var dbo = require('database.js');
        
        var myquery = { username: usernames };
        var newvalues = { 
        $set: {
            dailycheckin: dailycheckins+10 
          } };
        dbo.collection("users").updateOne(myquery, 
        newvalues, function(err, res) {
          if (err) throw err;
          
        console.log("Updated ckeckin points ");
          
     
        });


    */
                  