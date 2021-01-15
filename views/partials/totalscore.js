

<script>
const totalscoreText = document.getElementById('totalscore');
var webscore = totalscoreText.innerText;
const totalscore = JSON.parse(localStorage.getItem('mostRecentScore')) || [];

var total = parseInt(webscore)+parseInt(totalscore);
totalscoreText.innerHTML=total;

</script>

  


