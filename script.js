let guesses = 0;
let hint = 5;
const totalguesses = document.getElementById("totalguesses");
const hintin = document.getElementById("hintin");
totalguesses.textContent = `Guess 0/15`;
hintin.textContent = `Hint available in 5 guesses`;
let randomnumber = Math.floor(Math.random()* 250);
let submitted = "";
let foundgenres = [];
let epup= 100000000;
let epdown = 0;
let scoreup = 10;
let scoredown = 1;
let popup = 100000;
let popdown = 0;
let Points = 20;
let boolean = false;
let cluecounter = 1;
const img = document.querySelector("img");

document.getElementById("submitguess").onclick = function updatecounter(){
  if (document.getElementById("search").value.length > 0) {
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("search").value = ``;
    if (typeof globalsearchresult === `undefined`){
      document.getElementById("alertsign").textContent = "Please select a suggested answer.";
      document.getElementById("alertsign").style.left = "-240px";
    }
    if (typeof globalsearchresult[0] === `undefined`){
      document.getElementById("alertsign").textContent = "Please select a suggested answer.";
      document.getElementById("alertsign").style.left = "-240px";
    }
    else {
      console.log("Selected anime is:",globalsearchresult[0].Name)
      let regex = new RegExp(`\\b${globalsearchresult[0].Popularity}\\b`, 'i');
      if (regex.test(submitted)){
        document.getElementById("alertsign").textContent = `You've already tried this anime.`;
        document.getElementById("alertsign").style.left = "-250px";
      }
      else {
        let mysteryanime = data[randomnumber];
        console.log('Mystery anime is:',mysteryanime.Name);
        img.src = `${Number(mysteryanime.Popularity)}.jpg`
        const titles = document.getElementsByClassName("animetitle");
        globalsearchresult[0].English_name == "Unknown" ? titles[16-guesses].textContent = globalsearchresult[0].Name : titles[16-guesses].textContent = globalsearchresult[0].English_name;
        const score = document.getElementsByClassName("score");
        score[16-guesses].textContent = globalsearchresult[0].Score;
        const type = document.getElementsByClassName("type");
        type[16-guesses].textContent = globalsearchresult[0].Type;
        const episodes = document.getElementsByClassName("episodes");
        episodes[16-guesses].textContent = globalsearchresult[0].Episodes;
        const studios = document.getElementsByClassName("studios");
        studios[16-guesses].textContent = globalsearchresult[0].Studios;
        const source = document.getElementsByClassName("Source");
        source[16-guesses].textContent = globalsearchresult[0].Source;
        const ranked = document.getElementsByClassName("ranked");
        ranked[16-guesses].textContent = globalsearchresult[0].Ranked;
        const popularity = document.getElementsByClassName("popularity");
        popularity[16-guesses].textContent = globalsearchresult[0].Popularity;
        if (mysteryanime.Name == globalsearchresult[0].Name){
          titles[16-guesses].style.color = "green";
          titles[0].textContent = globalsearchresult[0].Name;
          titles[0].style.color = "green";
        };
        if (Number(mysteryanime.Score) == Number(globalsearchresult[0].Score)){
          score[16-guesses].style.color = "green";
          score[0].textContent = globalsearchresult[0].Score;
          score[0].style.color = "green";
        }
        else {
          if (Number(mysteryanime.Score) > Number(globalsearchresult[0].Score)){
            score[16-guesses].classList.toggle("uparrow"); 
            if (Number(globalsearchresult[0].Score) > scoredown) {
              scoredown = globalsearchresult[0].Score;
              document.getElementById("scoredown").textContent = scoredown;
              document.getElementById("scorehyphen").textContent = "—";
            }}
          else {
          score[16-guesses].classList.toggle("downarrow");
          if (Number(globalsearchresult[0].Score) < scoreup) {
            scoreup = globalsearchresult[0].Score;
            document.getElementById("scoreup").textContent = scoreup;
            document.getElementById("scorehyphen").textContent = "—";
          }
          //Number(mysteryanime.Score) > Number(globalsearchresult[0].Score) ? score[16-guesses].classList.toggle("uparrow") : score[16-guesses].classList.toggle("downarrow");
        }};
        if (mysteryanime.Type == globalsearchresult[0].Type){
          type[16-guesses].style.color = "green";
          type[0].textContent = globalsearchresult[0].Type;
          type[0].style.color = "green";
        };
        if (Number(mysteryanime.Episodes) == Number(globalsearchresult[0].Episodes)){
          episodes[16-guesses].style.color = "green";
          episodes[0].textContent = globalsearchresult[0].Episodes;
          episodes[0].style.color = "green";
        }
        else {
          if (Number(mysteryanime.Episodes) > Number(globalsearchresult[0].Episodes)){
            episodes[16-guesses].classList.toggle("uparrow"); 
            if (Number(globalsearchresult[0].Episodes) > epdown) {
              epdown = globalsearchresult[0].Episodes;
              if (document.getElementById("epdown")){
              document.getElementById("epdown").textContent = `${epdown}< `;}}}
          else {
          episodes[16-guesses].classList.toggle("downarrow");
          if (Number(globalsearchresult[0].Episodes) < epup) {
            epup = globalsearchresult[0].Episodes;
            if (document.getElementById("epup")){
            document.getElementById("epup").textContent = `<${epup}`;}}
          //Number(mysteryanime.Episodes) > Number(globalsearchresult[0].Episodes) ? episodes[16-guesses].classList.toggle("uparrow") : episodes[16-guesses].classList.toggle("downarrow");
        }};
        if (mysteryanime.Studios == globalsearchresult[0].Studios){
          studios[16-guesses].style.color = "green";
          studios[0].textContent = globalsearchresult[0].Studios;
          studios[0].style.color = "green";
        };
        if (mysteryanime.Source == globalsearchresult[0].Source){
          source[16-guesses].style.color = "green";
          source[0].textContent = globalsearchresult[0].Source;
          source[0].style.color = "green";
        };
        if (Number(mysteryanime.Ranked) == Number(globalsearchresult[0].Ranked)){
          ranked[16-guesses].style.color = "green";
          ranked[0].textContent = globalsearchresult[0].Ranked;
          ranked[0].style.color = "green";
        }
        else {
          Number(mysteryanime.Ranked) > Number(globalsearchresult[0].Ranked) ? ranked[16-guesses].classList.toggle("downarrow") : ranked[16-guesses].classList.toggle("uparrow");
        };
        const seasons = document.getElementsByClassName("season");
        const year = document.getElementsByClassName("year");
        const aired = document.getElementsByClassName("aired");
        let airedmonth = globalsearchresult[0].Aired.slice(0, 3);

        if (globalsearchresult[0].Premiered == "Unknown"){ //aired to premiered converter
          if (airedmonth == "Jan" || airedmonth == "Feb" || airedmonth == "Mar") {
            globalsearchresult[0].Premiered = "Winter ";
          }
          else if (airedmonth == "Apr" || airedmonth == "May" || airedmonth == "Jun") {
            globalsearchresult[0].Premiered = "Spring ";
          }
          else if (airedmonth == "Jul" || airedmonth == "Aug" || airedmonth == "Sep") {
            globalsearchresult[0].Premiered = "Summer ";
          }
          else {
            globalsearchresult[0].Premiered = "Fall ";
          };
          globalsearchresult[0].Aired = globalsearchresult[0].Aired.split(", ")[1];
          globalsearchresult[0].Premiered = globalsearchresult[0].Premiered + globalsearchresult[0].Aired.slice(0,4);
        }
        let spaceindex = globalsearchresult[0].Premiered.indexOf(" ");
        seasons[16-guesses].textContent = globalsearchresult[0].Premiered.slice(0, spaceindex);
        year[16-guesses].textContent = globalsearchresult[0].Premiered.slice(spaceindex + 1);
        let indexofspace = mysteryanime.Premiered.indexOf(" ");
        if (globalsearchresult[0].Premiered.toLowerCase().includes(mysteryanime.Premiered.slice(0, indexofspace).toLowerCase())) {
          seasons[0].textContent = mysteryanime.Premiered.slice(0, indexofspace);
          seasons[16-guesses].style.color = "green";
          seasons[0].style.color = "green";
        };
        if (globalsearchresult[0].Premiered.includes(mysteryanime.Premiered.slice(indexofspace + 1))) {
          year[16-guesses].style.color = "green";
          year[0].textContent = mysteryanime.Premiered.slice(indexofspace + 1);
          year[0].style.color = "green";
        }
        else {
          if (mysteryanime.Premiered == "Unknown") {
            Number(globalsearchresult[0].Premiered.slice(-4)) < Number(mysteryanime.Aired.split(", ")[1].slice(0,4)) ? aired[16-guesses].classList.toggle("uparrow") : aired[16-guesses].classList.toggle("downarrow");
          }
          else {
            Number(globalsearchresult[0].Premiered.slice(-4)) < Number(mysteryanime.Premiered.slice(-4)) ? aired[16-guesses].classList.toggle("uparrow") : aired[16-guesses].classList.toggle("downarrow");
          }
        };
        if (Number(mysteryanime.Popularity) == Number(globalsearchresult[0].Popularity)){
          popularity[16-guesses].style.color = "green";
          popularity[0].textContent = globalsearchresult[0].Popularity;
          popularity[0].style.color = "green";
          img.style.filter = "blur(0px) grayscale(0)";
          img.style.transition = "all 0.3s";
        }
        else {
          if (Number(mysteryanime.Popularity) > Number(globalsearchresult[0].Popularity)){
            popularity[16-guesses].classList.toggle("downarrow"); 
            if (Number(globalsearchresult[0].Popularity) > popdown) {
              popdown = globalsearchresult[0].Popularity;
              document.getElementById("popdown").textContent = `${popdown}< `;}}
          else {
          popularity[16-guesses].classList.toggle("uparrow");
          if (Number(globalsearchresult[0].Popularity) < popup) {
            popup = globalsearchresult[0].Popularity;
            document.getElementById("popup").textContent = `<${popup}`;}
        }};
        const genres = document.getElementsByClassName("genres")
        const mysterygenres = mysteryanime.Genres.split(", ").map(genre => genre.trim());
        let currentgenres = globalsearchresult[0].Genres.split(", ").map(genre => genre.trim());
        let commonGenres = mysterygenres.filter(genre => currentgenres.includes(genre));
        let highlightedgenres = currentgenres.map(genre => commonGenres.includes(genre) ?  `<span style = "color: green;">${genre},</span>` : `${genre},`).join(" ");
        genres[16-guesses].innerHTML = highlightedgenres;
        let uniqueGenres = commonGenres.filter(genre => !foundgenres.includes(genre));
        foundgenres = [...new Set([...foundgenres, ...uniqueGenres])];
        const foundgenresString = foundgenres.join(", ");
        genres[0].textContent = foundgenresString;
        genres[0].style.color = "green"; 
        if (document.getElementById("themesbutton") !== null){
          document.getElementById("themesbutton").onclick = () => {
            document.querySelector("#themes_synopsis h2").textContent = `Themes: ${mysteryanime.Themes}`;
            Points = Points - 0.5;
            document.getElementById("points").textContent = `Points: ${(Points - (guesses - 1)) * 1000}`;
          };
        };
        if (document.getElementById("synopsisbutton") !== null){
          document.getElementById("synopsisbutton").onclick = () => {
            document.querySelector("#themes_synopsis h4").textContent = mysteryanime.Synopsis;
            Points = Points - 3.5;
            document.getElementById("points").textContent = `Points: ${(Points - (guesses - 1)) * 1000}`;
          };
        };
        if (document.getElementById("imgbutton") !== null){
          document.getElementById("imgbutton").onclick = () => {
            img.style.filter = "blur(4px) grayscale(1)";
            img.style.boxShadow = "5px 5px 1px #1a76d2";
            document.querySelector("#cluebox #imgbutton").style.display = "none";
            Points = Points - 1;
            document.getElementById("points").textContent = `Points: ${(Points - (guesses - 1)) * 1000}`;
          };
        };

        guesses++; hint--;
        submitted = submitted + globalsearchresult[0].Popularity + " ";
        const cards = document.getElementsByClassName("guessbox");
        cards[16-guesses].style.display = "inline-table";
        totalguesses.textContent = `Guess ${guesses}/15`;
        hintin.textContent = `Hint available in ${hint} guesses`;
        if (hint == 0){
          hint = 4;
          if (cluecounter == 1 ){
            document.getElementById("cluebox").style.display = "inline-flex";
            cluecounter++;
          }
          else if (cluecounter == 2){
            document.querySelector("#themes_synopsis h4").style.display = "inline";
            document.querySelector("#themes_synopsis h4").style.marginTop = '5px';
            cluecounter++;
          }
          else {
            img.style.display = 'inline';
            img.style.marginLeft = '5px';
            document.querySelector("#cluebox #imgbutton").style.display = "inline";
            document.getElementById("hintin").style.display = 'none';
          }
        };
        document.getElementById("points").textContent = `Points: ${(Points - (guesses - 1)) * 1000}`;

        if (Number(mysteryanime.Popularity) == Number(globalsearchresult[0].Popularity)){
          boolean = true;
          totalguesses.textContent = `Points: ${(Points - (guesses - 1)) * 1000}`;//add class of gradient
          totalguesses.classList.toggle("gradienttext");
          document.getElementById("searchbar_button").style.display = "none";
          document.getElementById("restartbutton").style.display = "block";
          document.getElementById("cluebox").style.display = "inline-flex";
          img.style.display = 'inline';
          img.style.marginLeft = '5px';
          document.getElementById("hintin").style.display = 'none';
          document.querySelector("#themes_synopsis h4").style.display = "inline";
          document.querySelector("#themes_synopsis h2").textContent = `Themes: ${mysteryanime.Themes}`;
          document.querySelector("#themes_synopsis h4").textContent = mysteryanime.Synopsis;
          document.querySelector("#themes_synopsis h4").style.marginTop = '5px';
          img.style.borderRadius = "0px"; 
          img.style.boxShadow = "5px 5px 1px #1a76d2";
          document.querySelector("#cluebox #imgbutton").style.display = "none";
          document.getElementById("restartbutton").onclick = () => {
            location.reload();
        };}
        if (boolean==false && guesses == 15) {
          totalguesses.textContent = 'Points: 0';
          document.getElementById("searchbar_button").style.display = "none";
          document.getElementById("restartbutton").style.display = "block";
          document.getElementById("restartbutton").onclick = () => {
            location.reload();}
          img.style.filter = "blur(0px) grayscale(0)";
          img.style.transition = "all 0.3s";
          img.style.borderRadius = "0px"; 
          img.style.boxShadow = "5px 5px 1px #1a76d2";
          document.querySelector("#cluebox #imgbutton").style.display = "none";
          popularity[0].textContent = mysteryanime.Popularity;
          mysteryanime.English_name == "Unknown" ? titles[0].textContent = mysteryanime.Name : titles[0].textContent = mysteryanime.English_name;
          score[0].textContent = mysteryanime.Score;
          genres[0].textContent = mysteryanime.Genres;
          type[0].textContent = mysteryanime.Type;
          episodes[0].textContent = mysteryanime.Episodes;
          aired[0].textContent = mysteryanime.Premiered;
          studios[0].textContent = mysteryanime.Studios;
          source[0].textContent = mysteryanime.Source;
          ranked[0].textContent = mysteryanime.Ranked;
        }
      };
    }}
  else {
    document.getElementById("alertsign").textContent = "Enter Anime Name.";
    document.getElementById("alertsign").style.left = "-285px";
  }
};

function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"' && insideQuotes) {
          if (nextChar === '"') {
              // Handle escaped double quotes
              currentField += '"';
              i++; // Skip the next character
          } else {
              insideQuotes = false;
          }
      } else if (char === '"' && !insideQuotes) {
          insideQuotes = true;
      } else if (char === ',' && !insideQuotes) {
          currentRow.push(currentField);
          currentField = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
          if (currentField || currentRow.length) {
              currentRow.push(currentField);
              rows.push(currentRow);
              currentRow = [];
              currentField = '';
          }
      } else {
          currentField += char;
      }
  }
  if (currentField || currentRow.length) {
      currentRow.push(currentField);
      rows.push(currentRow);
  }
  const headers = rows[0];
  return rows.slice(1).map(row => {
      return headers.reduce((acc, header, index) => {
          acc[header.trim()] = row[index]?.trim();
          return acc;
      }, {});
  });
}

// Fetch and parse csvfile.csv 
fetch('Database.csv') // Ensure the file is in the same directory or adjust the path
  .then(response => response.text())
  .then(csvText => {
    window.data = parseCSV(csvText); // Parse the CSV text
    //console.log(data); // Log the parsed data
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

const searchAnime = (query) => {
  query = query.toLowerCase();
  const results = data.filter(anime =>
    anime.Name.toLowerCase().includes(query) || anime.English_name.toLowerCase().includes(query)
  );
  return results;
};

const namesearch = document.getElementById("search")
namesearch.addEventListener('keyup', e=> {
  let currentvalue = e.target.value.toLowerCase();
  const searchResults = searchAnime(currentvalue);
  document.getElementById("alertsign").textContent = ""
  //this filters the anime for search
  displayResults(searchResults.slice(0, 8));
  window.globalsearchresult = searchResults
})

function displayResults(results) {
  const resultsContainer = document.getElementById("suggestions");
  // Clear any previous results
  resultsContainer.innerHTML = "";
  // Handle case where no results are found
  if (results.length === 0) {
      resultsContainer.innerHTML = "<div>No results found</div>";
      return;
  }
  // Create and append result items
  results.forEach(result => {
      const resultItem = document.createElement("div");
      if (result.English_name == "Unknown"){
        resultItem.textContent = `${result.Name}`;
      }
      else {
        resultItem.textContent = `${result.English_name}`;
      } // Display the result text
      resultItem.addEventListener("click", () => {
        result.English_name == "Unknown" ? document.getElementById("search").value = `${result.Name}` : document.getElementById("search").value = `${result.English_name}`;
        globalsearchresult = [result];});
      resultsContainer.appendChild(resultItem); // Add to the container
  });
}

document.getElementById("search").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && globalsearchresult.length > 0) { // When Enter is pressed, copy the top result into the search box
      globalsearchresult[0].English_name == "Unknown" ? selectResult(globalsearchresult[0].Name) : selectResult(globalsearchresult[0].English_name);
  }
});
function selectResult(selectedName) {
  document.getElementById("search").value = selectedName;
}
