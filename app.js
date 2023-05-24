//Take in name to use for image input and amount to collect 1)
//Search for images associated with name 2)
//Collect urls into temp txt file 3)
//Filter images found on url with ML model 4)
//Showcase images to download (Allow user to select which images not to download) 5)
//Use the pictures the user decided not to download as training data for ML model 6)
//Download filtered images into directed folder 7)


//1 & 2
function ImgSearch(search, amount){
   return null
}

//3
function urlCollect(){
   urls = []
   //for loop to iterate over every element and store the url in a Matrix ["url": image] -> [key: value]
   
   
   ImgSearch()
   return null
}

//4
function filter(urls){
   //Apply ML algorithm towards dataset and return leftovers
   filteredURLS = []
   return null
}

//5
function disply(urls, amount){
   //iterate over dataset to display value of filterdURLS on designated div on HTML page
   return null
}

//5 1/2 & 6
function removeIMG(filteredURLS){
//remove key and values that were selected on the front end from original set
// and add to a new set to display
   newURLS = []
   return null
}

//7
function download(location){
   //intall in designated folder
   return null
}







function imageDownload(search, amount){

   let searchCopy = "";
   //in order to have a proper google search, a "+" is needed in place of all spaces
   //within the search text string
   for (let s = 0; s < search.length(); s++){
      if(search[s] == " "){
         searchCopy[s] = "+";
      }else
         searchCopy[s] = search[s];
   }

 //use chrome api to get the current tab
 //if user is already on the tab that they want to download from,
 //allow them to simpy search without having to input tab url
    if (search != Null){
      let url = `google.com/search?tbm=isch&q=${searchCopy}`;
    }else{
      let url = gettab();
    }

 //use amount to specify how many downloads are to be done
 //create for loop to iterate
    
 //use chrome api to download image using the current url
 
    //chrome.downloads.download(
    //options : search
 //)
}

//use chrome api to get the current tab
async function getab(){
    let queryoptions = {active: true, currentWindow: true};
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].url
}

imageDownload(search, amount);

//possibly query every images url on the page and then iterate
//through each url


//Remover Search bar and display new download form
function formExpand(search){
   return
}



//Image Download Test Prev 1.0
//!Verify webpage-url and build integration

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Select the HTML form and listen for form submissions
const downloadForm = document.querySelector('#og-search');
downloadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the URL submitted in the form
  const webpageUrl = document.querySelector('#webpage-url').value;

  // Validate the URL
  try {
    const urlObj = new URL(webpageUrl);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      throw new Error('Invalid protocol');
    }
  } catch (error) {
    console.error(`Invalid URL: ${error}`);
    return;
  }

  // Directory to save downloaded images
  const imagesDir = './downloaded-images';

  // Create the images directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // Download the webpage HTML using the request module
  request(webpageUrl, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      // Load the HTML into a Cheerio object
      const $ = cheerio.load(html);

      // Select all <img> elements on the page
      $('img').each((i, img) => {
        // Get the image URL and filename
        const imageUrl = $(img).attr('src');
        const imageName = path.basename(imageUrl);

        // Download the image using the request module
        request(imageUrl)
          .pipe(fs.createWriteStream(path.join(imagesDir, imageName)))
          .on('close', () => {
            console.log(`Image ${imageName} downloaded successfully.`);
          });
      });
    } else {
      console.error(`Error downloading webpage: ${error}`);
    }
  });
});
